// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

function get(slug: string, headers: Record<string, string>) {
  return GET(
    new Request(`http://localhost/api/place-photos?slug=${slug}`, { headers }),
  );
}

const reason = async (res: Response) => (await res.json()).reason;

/** Places API fake: one photo for every place, with full credit. */
function googleWithOnePhoto() {
  return vi.fn(async (input: RequestInfo | URL) =>
    String(input).includes("/media?")
      ? Response.json({
          photoUri: "https://lh3.googleusercontent.com/place-photos/x",
        })
      : Response.json({
          photos: [
            {
              name: "places/ChIJu9zfvHohQYYRtsAoRMayiJQ/photos/A1",
              widthPx: 4032,
              heightPx: 3024,
              authorAttributions: [{ displayName: "GOAT Fence Company" }],
              googleMapsUri: "https://www.google.com/maps/photo/A1",
            },
          ],
        }),
  );
}

describe("GET /api/place-photos", () => {
  beforeEach(() => {
    vi.stubEnv("LEADS_DATABASE_URL", "");
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("rejects a slug that isn't a prospect", async () => {
    const res = await get("not-a-company", { "x-real-ip": "10.0.0.1" });
    expect(res.status).toBe(400);
  });

  it("tells the page to skip the gallery when there's no key, and is never cached", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await get("goat-fence-company", { "x-real-ip": "10.0.0.2" });
    expect(await res.json()).toEqual({ ok: false, reason: "no-key" });
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns Google photos for the prospect's place", async () => {
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-key");
    const fetchMock = googleWithOnePhoto();
    vi.stubGlobal("fetch", fetchMock);
    const body = await (
      await get("goat-fence-company", { "x-real-ip": "10.0.0.3" })
    ).json();
    expect(body.ok).toBe(true);
    expect(body.photos).toHaveLength(1);
    expect(body.photos[0]).toMatchObject({
      src: "https://lh3.googleusercontent.com/place-photos/x",
      owner: true,
      authors: [{ name: "GOAT Fence Company" }],
      mapsUri: "https://www.google.com/maps/photo/A1",
    });
    expect(String(fetchMock.mock.calls[0][0])).toContain(
      "/places/ChIJu9zfvHohQYYRtsAoRMayiJQ",
    );
  });

  it("stops one visitor after eight page loads a day; another visitor is unaffected", async () => {
    vi.stubGlobal("fetch", vi.fn());
    for (let i = 0; i < 8; i++) {
      expect(
        await reason(await get("n2-fencing", { "x-real-ip": "10.0.0.4" })),
      ).toBe("no-key");
    }
    expect(
      await (await get("n2-fencing", { "x-real-ip": "10.0.0.4" })).json(),
    ).toEqual({
      ok: false,
      reason: "limit",
    });
    expect(
      await reason(await get("n2-fencing", { "x-real-ip": "10.0.0.5" })),
    ).toBe("no-key");
  });

  it("can't be dodged by sending made-up forwarding headers", async () => {
    vi.stubGlobal("fetch", vi.fn());
    for (let i = 0; i < 8; i++) {
      await get("n2-fencing", {
        "x-real-ip": "10.0.0.6",
        "x-forwarded-for": `1.1.1.${i}`,
        "cf-connecting-ip": `2.2.2.${i}`,
      });
    }
    const res = await get("n2-fencing", {
      "x-real-ip": "10.0.0.6",
      "x-forwarded-for": "1.1.1.99",
      "cf-connecting-ip": "2.2.2.99",
    });
    expect(await reason(res)).toBe("limit");
  });

  it("counts one IPv6 /64 as one visitor", async () => {
    vi.stubGlobal("fetch", vi.fn());
    for (let i = 0; i < 8; i++) {
      await get("n2-fencing", { "x-real-ip": `2001:db8:1:2::${i + 1}` });
    }
    expect(
      await reason(
        await get("n2-fencing", { "x-real-ip": "2001:db8:1:2::ff" }),
      ),
    ).toBe("limit");
  });

  it("lets Kyle's marked devices past the per-visitor limit", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const owner = { "x-real-ip": "10.0.0.7", cookie: "a=1; bl_owner=1" };
    for (let i = 0; i < 12; i++) {
      expect(await reason(await get("n2-fencing", owner))).toBe("no-key");
    }
  });

  it("still counts Kyle's devices against the monthly cap", async () => {
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-key");
    vi.stubEnv("PLACE_PHOTOS_MONTHLY_CAP", "2");
    vi.stubGlobal("fetch", googleWithOnePhoto());
    vi.resetModules();
    const { GET: fresh } = await import("./route");
    const owner = { "x-real-ip": "10.0.0.8", cookie: "bl_owner=1" };
    const call = () =>
      fresh(
        new Request(
          "http://localhost/api/place-photos?slug=goat-fence-company",
          {
            headers: owner,
          },
        ),
      );
    expect((await (await call()).json()).ok).toBe(true);
    expect((await (await call()).json()).ok).toBe(true);
    expect(await (await call()).json()).toEqual({ ok: false, reason: "cap" });
  });
});

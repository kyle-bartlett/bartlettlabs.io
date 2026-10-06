// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

function get(slug: string, ip: string) {
  return GET(
    new Request(`http://localhost/api/place-photos?slug=${slug}`, {
      headers: { "x-forwarded-for": ip },
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
  });

  it("rejects a slug that isn't a prospect", async () => {
    const res = await get("not-a-company", "10.0.0.1");
    expect(res.status).toBe(400);
  });

  it("tells the page to keep its stock photos when there's no key, and is never cached", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const res = await get("goat-fence-company", "10.0.0.2");
    expect(await res.json()).toEqual({ ok: false, reason: "no-key" });
    expect(res.headers.get("cache-control")).toBe("no-store");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns Google photos for the prospect's place", async () => {
    vi.stubEnv("GOOGLE_PLACES_API_KEY", "test-key");
    const fetchMock = vi.fn(async (input: RequestInfo | URL) =>
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
              },
            ],
          }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const body = await (await get("goat-fence-company", "10.0.0.3")).json();
    expect(body.ok).toBe(true);
    expect(body.photos).toHaveLength(1);
    expect(body.photos[0]).toMatchObject({
      src: "https://lh3.googleusercontent.com/place-photos/x",
      owner: true,
    });
    expect(String(fetchMock.mock.calls[0][0])).toContain(
      "/places/ChIJu9zfvHohQYYRtsAoRMayiJQ",
    );
  });

  it("stops one visitor after a dozen page loads a day", async () => {
    vi.stubGlobal("fetch", vi.fn());
    for (let i = 0; i < 12; i++) {
      const body = await (await get("n2-fencing", "10.0.0.4")).json();
      expect(body.reason).toBe("no-key");
    }
    const body = await (await get("n2-fencing", "10.0.0.4")).json();
    expect(body).toEqual({ ok: false, reason: "limit" });
    // Another visitor is unaffected.
    expect((await (await get("n2-fencing", "10.0.0.5")).json()).reason).toBe(
      "no-key",
    );
  });
});

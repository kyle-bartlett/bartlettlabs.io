// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { getProspect, prospects } from "@/app/for/prospects";
import {
  choosePhotos,
  isBusinessAuthor,
  memoryPhotoUsage,
  PHOTO_SLOTS,
  placeIdFromMapsUrl,
  placePhotos,
  type GooglePhoto,
  type PhotoDeps,
} from "@/lib/place-photos";

const aags = getProspect("aags-solutions")!;
const westgate = getProspect("westgate-fencing")!;
const n2 = getProspect("n2-fencing")!;

function photo(
  i: number,
  author: string,
  w = 4032,
  h = 3024,
  extra: Partial<GooglePhoto> = {},
): GooglePhoto {
  return {
    name: `places/${aags.placeId}/photos/P${i}`,
    widthPx: w,
    heightPx: h,
    authorAttributions: [
      {
        displayName: author,
        uri: `//maps.google.com/maps/contrib/${i}`,
        photoUri: `//lh3.googleusercontent.com/a-/avatar${i}`,
      },
    ],
    googleMapsUri: `https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sP${i}`,
    ...extra,
  };
}

/** A Places API fake: details returns `photos`, media returns a googleusercontent URL per name. */
function fakeGoogle(
  photos: GooglePhoto[],
  opts: {
    detailsStatus?: number;
    media?: (name: string) => Response | Promise<Response>;
  } = {},
) {
  const calls: string[] = [];
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    calls.push(url);
    if (url.includes("/media?")) {
      const name = url.split("/v1/")[1].split("/media")[0];
      if (opts.media) return opts.media(name);
      return Response.json({
        name: `${name}/media`,
        photoUri: `https://lh3.googleusercontent.com/place-photos/${name.split("/").pop()}=s800`,
      });
    }
    return Response.json(
      opts.detailsStatus ? { error: { message: "denied" } } : { photos },
      { status: opts.detailsStatus ?? 200 },
    );
  });
  return { fetchMock, calls };
}

function deps(
  fetchMock: ReturnType<typeof vi.fn>,
  over: Partial<PhotoDeps> = {},
): PhotoDeps & { reserved: number[] } {
  const reserved: number[] = [];
  return {
    apiKey: "test-key",
    fetch: fetchMock as unknown as typeof fetch,
    usage: {
      reserve: async (n) => {
        reserved.push(n);
        return n;
      },
    },
    monthlyCap: 900,
    reserved,
    ...over,
  };
}

const mediaCalls = (calls: string[]) =>
  calls.filter((c) => c.includes("/media?"));

afterEach(() => vi.restoreAllMocks());

describe("place IDs", () => {
  it("every prospect's placeId is the one in its Google Maps URL", () => {
    for (const p of prospects) {
      expect(placeIdFromMapsUrl(p.googleProfile)).toBe(p.placeId);
    }
    expect(new Set(prospects.map((p) => p.placeId)).size).toBe(
      prospects.length,
    );
  });

  it("returns null for a URL without a place ID", () => {
    expect(
      placeIdFromMapsUrl("https://www.google.com/maps/place/Somewhere"),
    ).toBeNull();
    expect(placeIdFromMapsUrl("")).toBeNull();
  });
});

describe("owner photos", () => {
  it("knows the business under its other names", () => {
    const brian = getProspect("brian-the-fence-guy")!;
    expect(isBusinessAuthor("Brianthefenceguy", [brian.name])).toBe(true);
    expect(isBusinessAuthor("Westgate Construction", [westgate.name])).toBe(
      true,
    );
    expect(isBusinessAuthor("N2 FENCING", [n2.name])).toBe(true);
    expect(isBusinessAuthor("AAGS Solutions LLC", [aags.shortName])).toBe(true);
  });

  it("doesn't mistake a customer for the business", () => {
    const brian = getProspect("brian-the-fence-guy")!;
    expect(isBusinessAuthor("Joel Bowman", [brian.name])).toBe(false);
    expect(isBusinessAuthor("Brian Smith", [brian.name])).toBe(false);
    expect(isBusinessAuthor("Fence Company", [westgate.name])).toBe(false);
    expect(isBusinessAuthor("", [westgate.name])).toBe(false);
  });
});

describe("choosePhotos", () => {
  it("puts the company's own uploads first, landscape before portrait", () => {
    const chosen = choosePhotos(
      [
        photo(0, "Customer One"),
        photo(1, "AAGS Solutions LLC", 3024, 4032),
        photo(2, "AAGS Solutions LLC"),
        photo(3, "Customer Two", 3024, 4032),
        photo(4, "AAGS Solutions LLC"),
      ],
      aags,
    );
    expect(chosen.map((p) => p.name?.split("/").pop())).toEqual([
      "P2",
      "P4",
      "P1",
      "P0",
      "P3",
    ]);
  });

  it("drops small images, banners, hand-listed graphics and odd names", () => {
    const chosen = choosePhotos(
      [
        photo(0, "N2 FENCING", 1440, 810), // n2's promo graphic size
        photo(1, "N2 FENCING", 360, 480), // too small
        photo(2, "N2 FENCING", 3000, 900), // banner
        photo(3, "N2 FENCING", 4032, 3024, { name: "../../evil" }),
        photo(4, "N2 FENCING", 960, 766),
      ],
      n2,
    );
    expect(chosen.map((p) => p.widthPx)).toEqual([960]);
  });

  it(`never returns more than ${PHOTO_SLOTS}`, () => {
    const many = Array.from({ length: 10 }, (_, i) => photo(i, "Someone"));
    expect(choosePhotos(many, aags)).toHaveLength(PHOTO_SLOTS);
  });
});

describe("placePhotos", () => {
  it("returns each photo with its author credit and Google Maps link", async () => {
    const { fetchMock, calls } = fakeGoogle([
      photo(0, "AAGS Solutions LLC"),
      photo(1, "Ryan Hajdik"),
    ]);
    const d = deps(fetchMock);
    const r = await placePhotos(aags, d);

    expect(r).toEqual({
      ok: true,
      photos: [
        {
          src: "https://lh3.googleusercontent.com/place-photos/P0=s800",
          width: 4032,
          height: 3024,
          owner: true,
          author: {
            name: "AAGS Solutions LLC",
            uri: "https://maps.google.com/maps/contrib/0",
            avatar: "https://lh3.googleusercontent.com/a-/avatar0",
          },
          mapsUri: "https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sP0",
        },
        expect.objectContaining({
          owner: false,
          author: expect.objectContaining({ name: "Ryan Hajdik" }),
        }),
      ],
    });
    expect(d.reserved).toEqual([2]);
    // Details asks only for photos, which keeps it on the free IDs Only SKU.
    const [detailsUrl, init] = fetchMock.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(detailsUrl).toBe(
      `https://places.googleapis.com/v1/places/${aags.placeId}`,
    );
    expect(init.headers).toMatchObject({
      "X-Goog-Api-Key": "test-key",
      "X-Goog-FieldMask": "photos",
    });
    expect(mediaCalls(calls)[0]).toContain(
      "maxWidthPx=800&skipHttpRedirect=true",
    );
  });

  it("does nothing without an API key", async () => {
    const { fetchMock } = fakeGoogle([photo(0, "x")]);
    const r = await placePhotos(aags, deps(fetchMock, { apiKey: undefined }));
    expect(r).toEqual({ ok: false, reason: "no-key" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("falls back when Google rejects the key", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { fetchMock, calls } = fakeGoogle([], { detailsStatus: 403 });
    const d = deps(fetchMock);
    expect(await placePhotos(aags, d)).toEqual({ ok: false, reason: "error" });
    expect(mediaCalls(calls)).toHaveLength(0);
    expect(d.reserved).toEqual([]);
  });

  it("falls back when Google times out", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = vi.fn(async () => {
      throw new DOMException("timed out", "TimeoutError");
    });
    expect(await placePhotos(aags, deps(fetchMock))).toEqual({
      ok: false,
      reason: "error",
    });
  });

  it("returns fewer photos when the profile has fewer", async () => {
    const { fetchMock, calls } = fakeGoogle([
      photo(0, "AAGS Solutions LLC"),
      photo(1, "AAGS Solutions LLC"),
      photo(2, "AAGS Solutions LLC"),
    ]);
    const r = await placePhotos(aags, deps(fetchMock));
    expect(r.ok && r.photos).toHaveLength(3);
    expect(mediaCalls(calls)).toHaveLength(3);
  });

  it("returns no photos for a profile without any", async () => {
    const { fetchMock, calls } = fakeGoogle([]);
    expect(await placePhotos(aags, deps(fetchMock))).toEqual({
      ok: true,
      photos: [],
    });
    expect(mediaCalls(calls)).toHaveLength(0);
  });

  it("makes no paid photo requests once the monthly cap is reached", async () => {
    const many = Array.from({ length: 9 }, (_, i) => photo(i, "Someone"));
    const { fetchMock, calls } = fakeGoogle(many);
    const r = await placePhotos(
      aags,
      deps(fetchMock, { usage: { reserve: async () => 0 } }),
    );
    expect(r).toEqual({ ok: false, reason: "cap" });
    expect(mediaCalls(calls)).toHaveLength(0);
  });

  it("only requests what's left under the cap", async () => {
    const many = Array.from({ length: 9 }, (_, i) => photo(i, "Someone"));
    const { fetchMock, calls } = fakeGoogle(many);
    const usage = memoryPhotoUsage();
    await usage.reserve(898, 900);
    const r = await placePhotos(aags, deps(fetchMock, { usage }));
    expect(r.ok && r.photos).toHaveLength(2);
    expect(mediaCalls(calls)).toHaveLength(2);
    expect(await usage.reserve(1, 900)).toBe(0);
  });

  it("drops a photo whose request fails or whose URL isn't Google's", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { fetchMock } = fakeGoogle(
      [photo(0, "a"), photo(1, "b"), photo(2, "c")],
      {
        media: (name) => {
          if (name.endsWith("P0")) return new Response("no", { status: 500 });
          if (name.endsWith("P1"))
            return Response.json({ photoUri: "https://evil.example/x.jpg" });
          return Response.json({
            photoUri: "https://lh3.googleusercontent.com/place-photos/ok",
          });
        },
      },
    );
    const r = await placePhotos(aags, deps(fetchMock));
    expect(r.ok && r.photos.map((p) => p.author?.name)).toEqual(["c"]);
  });

  it("falls back when every photo request fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { fetchMock } = fakeGoogle([photo(0, "a")], {
      media: () => new Response("quota", { status: 429 }),
    });
    expect(await placePhotos(aags, deps(fetchMock))).toEqual({
      ok: false,
      reason: "error",
    });
  });

  it("falls back when the usage counter can't be read", async () => {
    const { fetchMock, calls } = fakeGoogle([photo(0, "a")]);
    const r = await placePhotos(
      aags,
      deps(fetchMock, {
        usage: {
          reserve: async () => {
            throw new Error("db down");
          },
        },
      }),
    );
    expect(r).toEqual({ ok: false, reason: "error" });
    expect(mediaCalls(calls)).toHaveLength(0);
  });
});

describe("memoryPhotoUsage", () => {
  it("grants up to the cap, then nothing", async () => {
    const usage = memoryPhotoUsage();
    expect(await usage.reserve(7, 10)).toBe(7);
    expect(await usage.reserve(7, 10)).toBe(3);
    expect(await usage.reserve(1, 10)).toBe(0);
  });

  it("starts over in a new month", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-31T12:00:00Z"));
    const usage = memoryPhotoUsage();
    expect(await usage.reserve(10, 10)).toBe(10);
    expect(await usage.reserve(1, 10)).toBe(0);
    vi.setSystemTime(new Date("2026-11-01T12:00:00Z"));
    expect(await usage.reserve(1, 10)).toBe(1);
    vi.useRealTimers();
  });
});

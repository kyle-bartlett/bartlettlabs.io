import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ShownPhoto } from "@/lib/place-photos";
import { ProspectPage } from "./ProspectPage";
import { getProspect } from "./prospects";

const goat = getProspect("goat-fence-company")!;

function googlePhoto(i: number): ShownPhoto {
  return {
    src: `https://lh3.googleusercontent.com/place-photos/p${i}`,
    width: 4032,
    height: 3024,
    owner: true,
    authors: [
      {
        name: `Author ${i}`,
        uri: `https://maps.google.com/maps/contrib/${i}`,
        avatar: `https://lh3.googleusercontent.com/a-/avatar${i}`,
      },
    ],
    mapsUri: `https://www.google.com/maps/photo${i}`,
  };
}

/** jsdom never loads images; this one loads every src except those in `broken`. */
function fakeImages(broken: string[] = []) {
  vi.stubGlobal(
    "Image",
    class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      set src(value: string) {
        setTimeout(() =>
          broken.includes(value) ? this.onerror?.() : this.onload?.(),
        );
      }
    },
  );
}

const serviceImages = () =>
  screen
    .getAllByRole("img")
    .filter((img) => img.closest(".prospect-service-image"))
    .map((img) => img.getAttribute("src"));

const upgradeImages = (container: HTMLElement) =>
  [...container.querySelectorAll(".owner-upgrade-grid article")].map((a) =>
    (a as HTMLElement).style.getPropertyValue("--upgrade-image"),
  );

const galleryHeading = () =>
  screen.queryByRole("heading", { name: "Photos from your Google profile" });

const galleryTiles = (container: HTMLElement) => [
  ...container.querySelectorAll(".owner-photo-grid figure"),
];

describe("ProspectPage Google photos", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/for/goat-fence-company");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows no gallery when the photo request fails", async () => {
    const fetchMock = vi.fn(async () => {
      throw new TypeError("network");
    });
    vi.stubGlobal("fetch", fetchMock);
    render(<ProspectPage prospect={goat} />);
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/place-photos?slug=goat-fence-company",
        expect.anything(),
      ),
    );
    expect(serviceImages()).toEqual(goat.serviceImages);
    expect(galleryHeading()).not.toBeInTheDocument();
    expect(screen.queryByText("Google Maps")).not.toBeInTheDocument();
  });

  it("shows no gallery when the cap or the visitor limit is reached", async () => {
    for (const reason of ["cap", "limit"]) {
      vi.stubGlobal(
        "fetch",
        vi.fn(async () => Response.json({ ok: false, reason })),
      );
      const { unmount } = render(<ProspectPage prospect={goat} />);
      await new Promise((r) => setTimeout(r, 20));
      expect(galleryHeading()).not.toBeInTheDocument();
      unmount();
    }
  });

  it("keeps every service and upgrade card on its stock image, and puts the Google photos in their own gallery", async () => {
    const photos = [0, 1, 2, 3].map(googlePhoto);
    fakeImages();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ ok: true, photos })),
    );
    const { container } = render(<ProspectPage prospect={goat} />);

    await waitFor(() => expect(galleryHeading()).toBeInTheDocument());
    expect(galleryTiles(container)).toHaveLength(4);
    expect(serviceImages()).toEqual(goat.serviceImages);
    expect(upgradeImages(container)).toEqual(
      goat.upgrades.map((u) => `url("${u.image}")`),
    );
    // No Google photo sits under a service or upgrade label.
    expect(
      container.querySelector(
        ".prospect-service-grid .photo-credit, .owner-upgrade-grid .photo-credit",
      ),
    ).toBeNull();
    // The gallery comes before the upgrade plan, inside the owner section.
    const gallery = container.querySelector(".owner-photos")!;
    expect(gallery.closest("#owner-plan")).not.toBeNull();
  });

  it("credits each photo in full: every author, the photo on Google Maps, and an alt naming the author", async () => {
    const long =
      "Westgate Construction and Fence Company of Greater Northwest Houston Texas LLC";
    const two: ShownPhoto = {
      ...googlePhoto(1),
      authors: [
        {
          name: long,
          uri: "https://maps.google.com/maps/contrib/9",
          avatar: null,
        },
        { name: "Second Author", uri: null, avatar: null },
      ],
    };
    fakeImages();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({ ok: true, photos: [googlePhoto(0), two] }),
      ),
    );
    const { container } = render(<ProspectPage prospect={goat} />);
    await waitFor(() => expect(galleryTiles(container)).toHaveLength(2));
    const [first, second] = galleryTiles(container) as HTMLElement[];

    expect(
      within(first).getByRole("img", {
        name: "Photo by Author 0 on Google Maps",
      }),
    ).toHaveAttribute("src", googlePhoto(0).src);
    expect(
      within(first).getByRole("link", { name: "Author 0" }),
    ).toHaveAttribute("href", "https://maps.google.com/maps/contrib/0");
    const maps = within(first).getByRole("link", { name: "Google Maps" });
    expect(maps).toHaveAttribute("href", googlePhoto(0).mapsUri);
    expect(maps).toHaveAttribute("translate", "no");

    expect(
      within(second).getByRole("img", {
        name: `Photo by ${long} and Second Author on Google Maps`,
      }),
    ).toBeInTheDocument();
    // The long name is all there, not cut short.
    expect(within(second).getByRole("link", { name: long })).toHaveAttribute(
      "href",
      "https://maps.google.com/maps/contrib/9",
    );
    expect(within(second).getByText("Second Author")).toBeInTheDocument();
    expect(
      within(second).getByRole("link", { name: "Google Maps" }),
    ).toHaveAttribute("href", googlePhoto(1).mapsUri);
  });

  it("leaves out a photo that never loads", async () => {
    const photos = [0, 1, 2].map(googlePhoto);
    fakeImages([photos[1].src]);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ ok: true, photos })),
    );
    const { container } = render(<ProspectPage prospect={goat} />);
    await waitFor(() => expect(galleryTiles(container)).toHaveLength(2));
    expect(
      galleryTiles(container).map((f) =>
        f.querySelector("img")!.getAttribute("src"),
      ),
    ).toEqual([photos[0].src, photos[2].src]);
  });

  it("drops a tile whose photo link expires after it was shown, and the gallery once all are gone", async () => {
    const photos = [0, 1].map(googlePhoto);
    fakeImages();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ ok: true, photos })),
    );
    const { container } = render(<ProspectPage prospect={goat} />);
    await waitFor(() => expect(galleryTiles(container)).toHaveLength(2));

    fireEvent.error(
      screen.getByRole("img", { name: "Photo by Author 0 on Google Maps" }),
    );
    await waitFor(() => expect(galleryTiles(container)).toHaveLength(1));
    expect(
      screen.queryByRole("link", { name: "Author 0" }),
    ).not.toBeInTheDocument();

    fireEvent.error(
      screen.getByRole("img", { name: "Photo by Author 1 on Google Maps" }),
    );
    await waitFor(() => expect(galleryHeading()).not.toBeInTheDocument());
  });

  it("hides a broken avatar but keeps the author's name", async () => {
    fakeImages();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ ok: true, photos: [googlePhoto(0)] })),
    );
    const { container } = render(<ProspectPage prospect={goat} />);
    await waitFor(() => expect(galleryTiles(container)).toHaveLength(1));
    const avatar = container.querySelector(
      ".photo-credit img",
    ) as HTMLImageElement;
    fireEvent.error(avatar);
    expect(avatar.hidden).toBe(true);
    expect(screen.getByRole("link", { name: "Author 0" })).toBeInTheDocument();
  });
});

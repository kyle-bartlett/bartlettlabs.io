import { render, screen, waitFor, within } from "@testing-library/react";
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
    author: {
      name: `Author ${i}`,
      uri: `https://maps.google.com/maps/contrib/${i}`,
      avatar: `https://lh3.googleusercontent.com/a-/avatar${i}`,
    },
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
    .filter((img) => !img.closest(".photo-credit"))
    .map((img) => img.getAttribute("src"));

describe("ProspectPage Google photos", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/for/goat-fence-company");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("keeps the stock images when the photo request fails", async () => {
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
    expect(screen.queryByText("Google Maps")).not.toBeInTheDocument();
  });

  it("keeps the stock images when the cap is reached", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ ok: false, reason: "cap" })),
    );
    render(<ProspectPage prospect={goat} />);
    await new Promise((r) => setTimeout(r, 20));
    expect(serviceImages()).toEqual(goat.serviceImages);
  });

  it("swaps in each loaded Google photo with its credit, and keeps stock where Google ran short or an image broke", async () => {
    const photos = [0, 1, 2, 3, 4].map(googlePhoto);
    fakeImages([photos[1].src]);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => Response.json({ ok: true, photos })),
    );
    const { container } = render(<ProspectPage prospect={goat} />);

    await waitFor(() => expect(serviceImages()[0]).toBe(photos[0].src));
    await waitFor(() =>
      expect(screen.getAllByText("Google Maps")).toHaveLength(4),
    );
    expect(serviceImages()).toEqual([
      photos[0].src,
      goat.serviceImages[1], // this photo failed to load
      photos[2].src,
      photos[3].src,
    ]);

    const firstCard = container.querySelector(".prospect-service-image")!;
    const author = within(firstCard as HTMLElement).getByRole("link", {
      name: "Author 0",
    });
    expect(author).toHaveAttribute("href", photos[0].author!.uri);
    const maps = within(firstCard as HTMLElement).getByRole("link", {
      name: "Google Maps",
    });
    expect(maps).toHaveAttribute("href", photos[0].mapsUri);
    expect(maps).toHaveAttribute("translate", "no");

    // Upgrade 1 gets the fifth photo; upgrades 2 and 3 keep their stock images.
    const upgrades = container.querySelectorAll(".owner-upgrade-grid article");
    expect(
      (upgrades[0] as HTMLElement).style.getPropertyValue("--upgrade-image"),
    ).toBe(`url("${photos[4].src}")`);
    expect(
      (upgrades[1] as HTMLElement).style.getPropertyValue("--upgrade-image"),
    ).toBe(`url("${goat.upgrades[1].image}")`);
    expect(upgrades[0].querySelector(".photo-credit")).not.toBeNull();
    expect(upgrades[1].querySelector(".photo-credit")).toBeNull();

    expect(
      screen.getByText(
        "Photos from GOAT Fence Company's Google Business Profile",
      ),
    ).toBeInTheDocument();
  });
});

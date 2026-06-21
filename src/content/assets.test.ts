import { workItems } from "./work";
import { founderPhotoAssets, workScreenshotAssets } from "./assets";

describe("asset manifest", () => {
  it("defines the two founder portrait slots used by the live pages", () => {
    expect(Object.keys(founderPhotoAssets)).toEqual(["homeHero", "aboutPage"]);

    expect(founderPhotoAssets.homeHero.publicPath).toBe(
      "/images/founder/kyle-home-portrait.jpg",
    );
    expect(founderPhotoAssets.aboutPage.publicPath).toBe(
      "/images/founder/kyle-home-portrait.jpg",
    );

    expect(founderPhotoAssets.homeHero.aspectRatio).toBe("4:5");
    expect(founderPhotoAssets.aboutPage.aspectRatio).toBe("4:5");
    expect(founderPhotoAssets.homeHero.fit).toBe("contain");
    expect(founderPhotoAssets.aboutPage.fit).toBe("cover");
  });

  it("defines one primary screenshot slot for every work card", () => {
    expect(Object.keys(workScreenshotAssets)).toEqual(
      workItems.map((item) => item.id),
    );

    for (const item of workItems) {
      const asset = workScreenshotAssets[item.id as keyof typeof workScreenshotAssets];

      expect(asset.publicPath).toBe(`/images/work/${item.id}-primary.jpg`);
      expect(asset.aspectRatio).toBe("16:10");
      expect(asset.minWidth).toBeGreaterThanOrEqual(1600);
      expect(asset.minHeight).toBeGreaterThanOrEqual(1000);
    }
  });
});

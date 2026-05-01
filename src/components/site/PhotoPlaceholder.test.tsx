import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { founderPhotoAssets } from "@/content/assets";
import { renderWithProviders } from "@/test/render";

const { hasPublicAsset } = vi.hoisted(() => ({
  hasPublicAsset: vi.fn(() => false),
}));

vi.mock("@/lib/asset-files", () => ({
  hasPublicAsset,
}));

import { PhotoPlaceholder } from "./PhotoPlaceholder";

describe("PhotoPlaceholder", () => {
  beforeEach(() => {
    hasPublicAsset.mockReset();
    hasPublicAsset.mockReturnValue(false);
  });

  it("shows placeholder copy when the portrait file is not available yet", () => {
    renderWithProviders(
      <PhotoPlaceholder
        eyebrow="Founder Photo"
        title="Homepage portrait slot"
        description="Add a strong founder portrait here once final photography is ready."
        asset={founderPhotoAssets.homeHero}
      />,
    );

    expect(screen.getByText("Portrait to be added")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders the real portrait automatically once the file exists", () => {
    hasPublicAsset.mockReturnValue(true);

    renderWithProviders(
      <PhotoPlaceholder
        eyebrow="Founder Photo"
        title="Homepage portrait slot"
        description="Add a strong founder portrait here once final photography is ready."
        asset={founderPhotoAssets.homeHero}
      />,
    );

    expect(
      screen.getByRole("img", { name: founderPhotoAssets.homeHero.alt }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Portrait to be added")).not.toBeInTheDocument();
  });

  it("respects contain assets so portraits can render without cropping", () => {
    hasPublicAsset.mockReturnValue(true);

    renderWithProviders(
      <PhotoPlaceholder
        eyebrow="Founder Photo"
        title="Homepage portrait slot"
        description="Add a strong founder portrait here once final photography is ready."
        asset={{ ...founderPhotoAssets.homeHero, fit: "contain" }}
      />,
    );

    const portrait = screen.getByRole("img", { name: founderPhotoAssets.homeHero.alt });

    expect(portrait).toHaveClass("object-contain");
    expect(portrait).toHaveClass("object-top");
    expect(portrait).not.toHaveClass("object-cover");
  });
});

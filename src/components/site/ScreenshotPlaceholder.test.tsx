import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { workScreenshotAssets } from "@/content/assets";
import { renderWithProviders } from "@/test/render";

const { hasPublicAsset } = vi.hoisted(() => ({
  hasPublicAsset: vi.fn(() => false),
}));

vi.mock("@/lib/asset-files", () => ({
  hasPublicAsset,
}));

import { ScreenshotPlaceholder } from "./ScreenshotPlaceholder";

describe("ScreenshotPlaceholder", () => {
  const asset = workScreenshotAssets["santiagos-auto-repair"];

  beforeEach(() => {
    hasPublicAsset.mockReset();
    hasPublicAsset.mockReturnValue(false);
  });

  it("shows placeholder guidance when the screenshot file is not available yet", () => {
    renderWithProviders(
      <ScreenshotPlaceholder
        label="Homepage and service-page screenshots coming soon"
        asset={asset}
      />,
    );

    expect(screen.getByText("Demo preview slot")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders the live screenshot automatically once the file exists", () => {
    hasPublicAsset.mockReturnValue(true);

    renderWithProviders(
      <ScreenshotPlaceholder
        label="Homepage and service-page screenshots coming soon"
        asset={asset}
      />,
    );

    expect(screen.getByRole("img", { name: asset.alt })).toBeInTheDocument();
    expect(screen.queryByText("Demo preview slot")).not.toBeInTheDocument();
  });
});

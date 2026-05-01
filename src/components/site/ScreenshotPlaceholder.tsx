import Image from "next/image";
import type { VisualAsset } from "@/content/assets";
import { hasPublicAsset } from "@/lib/asset-files";

type ScreenshotPlaceholderProps = {
  label: string;
  asset?: VisualAsset;
};

export function ScreenshotPlaceholder({
  label,
  asset,
}: ScreenshotPlaceholderProps) {
  if (asset && hasPublicAsset(asset.publicPath)) {
    return (
      <div className="site-panel min-h-[20rem] p-3">
        <div className="relative h-full min-h-[17rem] overflow-hidden rounded-[1.25rem] bg-[rgba(247,242,233,0.78)]">
          <Image
            src={asset.publicPath}
            alt={asset.alt}
            fill
            sizes="(min-width: 1024px) 40rem, 100vw"
            className="object-contain object-top"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="placeholder-panel min-h-[20rem]">
      <span className="eyebrow">Screenshot Placeholder</span>
      <div className="space-y-4">
        <h2 className="placeholder-title">Demo preview slot</h2>
        <p className="placeholder-copy">{label}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-3">
        <span className="proof-badge">Screenshot coming</span>
        <span className="proof-badge">Designed for real asset swap-in</span>
      </div>
    </div>
  );
}

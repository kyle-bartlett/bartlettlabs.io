import Image from "next/image";
import type { VisualAsset } from "@/content/assets";
import { hasPublicAsset } from "@/lib/asset-files";

type PhotoPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  asset?: VisualAsset;
};

export function PhotoPlaceholder({
  eyebrow,
  title,
  description,
  asset,
}: PhotoPlaceholderProps) {
  if (asset && hasPublicAsset(asset.publicPath)) {
    const fitClass =
      asset.fit === "contain" ? "object-contain object-top" : "object-cover object-top";

    return (
      <div className="site-panel min-h-[24rem] w-[28rem] max-w-full overflow-hidden p-3">
        <div className="relative h-full min-h-[21rem] overflow-hidden rounded-[1.4rem] bg-[rgba(247,242,233,0.78)]">
          <Image
            src={asset.publicPath}
            alt={asset.alt}
            fill
            sizes="(min-width: 1024px) 32rem, 100vw"
            className={fitClass}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="placeholder-panel min-h-[24rem]">
      <span className="eyebrow">{eyebrow}</span>
      <div className="space-y-4">
        <h2 className="placeholder-title">{title}</h2>
        <p className="placeholder-copy">{description}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-3">
        <span className="proof-badge">Portrait to be added</span>
        <span className="proof-badge">Founder-led brand</span>
      </div>
    </div>
  );
}

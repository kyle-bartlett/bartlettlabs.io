import fs from "node:fs";
import path from "node:path";

const publicAssetCache = new Map<string, boolean>();

export function getPublicAssetAbsolutePath(publicPath: string) {
  return path.join(process.cwd(), "public", publicPath.replace(/^\/+/, ""));
}

export function hasPublicAsset(publicPath: string) {
  const cached = publicAssetCache.get(publicPath);

  if (cached !== undefined) {
    return cached;
  }

  const exists = fs.existsSync(getPublicAssetAbsolutePath(publicPath));
  publicAssetCache.set(publicPath, exists);

  return exists;
}

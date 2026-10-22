import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  compress: true,
  poweredByHeader: true,
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    // Security: every next/image source is a local file under /public/images,
    // so keep the optimizer (it serves resized webp/avif) but only for that
    // path. No remotePatterns: remote URLs stay rejected.
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
  async redirects() {
    return [
      // Clean short URL for the Alignable Crosby ad.
      { source: "/crosby", destination: "/crosby-ai", permanent: true },
      // Old /pricing URL: pricing lives on the homepage.
      { source: "/pricing", destination: "/#pricing", permanent: true },
    ];
  },
  // experimental: {
  //   optimizeCss: true, // Requires critters — enable after npm i critters
  // },
};

export default nextConfig;

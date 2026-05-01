import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // experimental: {
  //   optimizeCss: true, // Requires critters — enable after npm i critters
  // },
};

export default nextConfig;

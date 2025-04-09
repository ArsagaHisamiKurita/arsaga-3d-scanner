import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  basePath: '/wp-content/newyear-dev-2025',
  assetPrefix: 'https://www.arsaga.jp/wp-content/newyear-dev-2025'
};

export default nextConfig;

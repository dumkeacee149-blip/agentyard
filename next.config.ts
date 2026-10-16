import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: __dirname },
  // Weekly issues are markdown files read at build time.
  outputFileTracingIncludes: { "/**": ["./data/**/*"] },
};

export default nextConfig;

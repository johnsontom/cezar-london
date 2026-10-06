import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The parent directory contains unrelated lockfiles; keep tracing local.
  outputFileTracingRoot: projectRoot,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [64, 96, 128, 200, 256, 320, 420],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Pinned explicitly so "@/" always resolves to ./src, independent of where
  // the bundler decides the workspace root sits.
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": path.join(projectRoot, "src"),
    };
    return config;
  },
};

export default nextConfig;

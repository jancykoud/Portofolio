import type { NextConfig } from "next";
import { EN_SEGMENTS } from "./lib/i18n/routing";

const isDev = process.env.NODE_ENV !== "production";

// The theme bootstrap script is inline (it must run before first paint), hence 'unsafe-inline'.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // English public slugs differ from the internal French folders.
    const enInternal = Object.entries(EN_SEGMENTS)
      .filter(([fr, en]) => fr !== en)
      .flatMap(([fr, en]) => [
        { source: `/en/${fr}`, destination: `/en/${en}`, permanent: true },
        { source: `/en/${fr}/:path*`, destination: `/en/${en}/:path*`, permanent: true },
      ]);
    return [
      // Legacy URLs of the previous site
      { source: "/work", destination: "/projets", permanent: true },
      { source: "/resume", destination: "/a-propos", permanent: true },
      { source: "/learning", destination: "/a-propos#formation", permanent: true },
      { source: "/fun", destination: "/a-propos", permanent: true },
      // The internal /fr prefix is never public
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path((?!opengraph-image).*)", destination: "/:path", permanent: true },
      ...enInternal,
    ];
  },
  async rewrites() {
    const enRewrites = Object.entries(EN_SEGMENTS)
      .filter(([fr, en]) => fr !== en)
      .flatMap(([fr, en]) => [
        { source: `/en/${en}`, destination: `/en/${fr}` },
        { source: `/en/${en}/:path*`, destination: `/en/${fr}/:path*` },
      ]);
    return {
      beforeFiles: [],
      // Checked after static files and routes (/api, sitemap, public assets) but before dynamic routes.
      afterFiles: [...enRewrites, { source: "/", destination: "/fr" }, { source: "/:path((?!en(?:/|$)|fr/opengraph-image).*)", destination: "/fr/:path" }],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;

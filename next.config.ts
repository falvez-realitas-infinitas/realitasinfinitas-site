import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const devLanOrigins =
  process.env.ALLOW_DEV_ORIGINS?.split(",")
    .map((host) => host.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  // Dev-only: allows loading /_next assets when you open the site by LAN IP (phone / another machine).
  // Example: ALLOW_DEV_ORIGINS=192.168.1.61 npm run dev
  ...(process.env.NODE_ENV !== "production"
    ? {
        allowedDevOrigins: [
          "localhost",
          "127.0.0.1",
          ...devLanOrigins,
        ],
      }
    : {}),
};

export default withNextIntl(nextConfig);

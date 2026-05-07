import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Realitas Infinitas",
    short_name: "Realitas",
    description:
      "Realitas Infinitas builds intelligent software and products for complex operational environments.",
    start_url: "/en",
    display: "standalone",
    background_color: "#f8f4ef",
    theme_color: "#592A19",
    lang: "en",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

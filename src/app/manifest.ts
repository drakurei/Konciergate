import type { MetadataRoute } from "next";
import { asset } from "@/lib/utils";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Konciergate",
    short_name: "Konciergate",
    description: "L'Europe comme vos clients la méritent.",
    start_url: asset("/"),
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: asset("/icon.svg"), sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: asset("/apple-icon"), sizes: "180x180", type: "image/png" },
    ],
  };
}

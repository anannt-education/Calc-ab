import type { MetadataRoute } from "next";
import { publicSitemapUrls } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicSitemapUrls();
}

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://farzamaskary.ir";
  return [
    { url: base, lastModified: new Date() },
    { url: base + "/projects", lastModified: new Date() },
    { url: base + "/order", lastModified: new Date() },
    { url: base + "/contact", lastModified: new Date() },
  ];
}

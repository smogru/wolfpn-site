import type { MetadataRoute } from "next";
import { seoPages } from "../lib/seo-pages";
import { SITE_URL } from "../lib/site";

const UPDATED_AT = new Date("2026-08-14T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...seoPages
      .filter((page) => !page.noIndex)
      .map((page) => ({
        url: `${SITE_URL}/${page.slug}`,
        lastModified: UPDATED_AT,
        changeFrequency: page.group === "Документы" ? "yearly" as const : "monthly" as const,
        priority: page.group === "Выбор VPN" ? 0.9 : page.group === "Устройства" || page.group === "Сценарии" ? 0.8 : 0.7,
      })),
  ];
}


import type { MetadataRoute } from "next";
import { CATEGORIES, entries } from "@/lib/data";
import { getIssues } from "@/lib/weekly";
import { abs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const issues = getIssues();
  const latest = issues[0]?.date ?? new Date().toISOString().slice(0, 10);
  return [
    { url: abs("/"), lastModified: latest, changeFrequency: "daily", priority: 1 },
    { url: abs("/weekly"), lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/sponsor"), changeFrequency: "monthly", priority: 0.4 },
    { url: abs("/submit"), changeFrequency: "monthly", priority: 0.4 },
    ...CATEGORIES.map((c) => ({ url: abs(`/category/${c.slug}`), lastModified: latest, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...issues.map((i) => ({ url: abs(`/weekly/${i.slug}`), lastModified: i.date, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...entries.map((e) => ({ url: abs(`/directory/${e.slug}`), lastModified: e.addedAt, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}

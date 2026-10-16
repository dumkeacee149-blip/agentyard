import { CATEGORIES, entries } from "@/lib/data";
import { SITE, abs } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      name: SITE.name,
      description: SITE.description,
      home: abs("/"),
      license: "Entry metadata may be reused with attribution and a link back.",
      count: entries.length,
      categories: CATEGORIES,
      entries: entries.map((e) => ({ ...e, page: abs(`/directory/${e.slug}`) })),
    },
    { headers: { "access-control-allow-origin": "*", "cache-control": "public, max-age=3600" } },
  );
}

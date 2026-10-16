import { getIssues, renderMarkdown } from "@/lib/weekly";
import { SITE, abs } from "@/lib/site";

export const dynamic = "force-static";

const x = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getIssues().map((i) => `
    <item>
      <title>${x(`Weekly #${i.number}: ${i.title}`)}</title>
      <link>${abs(`/weekly/${i.slug}`)}</link>
      <guid isPermaLink="true">${abs(`/weekly/${i.slug}`)}</guid>
      <pubDate>${new Date(`${i.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${x(i.summary)}</description>
      <content:encoded><![CDATA[${renderMarkdown(i.body)}]]></content:encoded>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${x(SITE.name)} Weekly</title>
    <link>${abs("/weekly")}</link>
    <atom:link href="${abs("/weekly/rss.xml")}" rel="self" type="application/rss+xml"/>
    <description>${x(SITE.description)}</description>
    <language>en</language>${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}

import { CATEGORIES, entries } from "@/lib/data";
import { getIssues } from "@/lib/weekly";
import { SITE, abs } from "@/lib/site";

export const dynamic = "force-static";

// Lists only resources that actually exist on this site (idea borrowed from AIHOT's llms.txt, MIT; no code copied).
export function GET() {
  const L: string[] = [];
  L.push(`# ${SITE.name}`, "", `> ${SITE.description}`, "");
  L.push(`${SITE.name} lists ${entries.length} real, link-checked projects: ${entries.filter((e) => e.type === "mcp-server").length} MCP servers and ${entries.filter((e) => e.type === "agent-tool").length} agent tools (coding agents, frameworks, infrastructure, skills). Descriptions are original summaries; GitHub star counts are approximate snapshots.`, "");
  L.push("## Machine-readable", "", `- [All entries as JSON](${abs("/api/entries.json")}): every entry with name, type, category, description, url, repoUrl, githubStars, tags, worksWith, addedAt`, `- [Weekly digest RSS](${abs("/weekly/rss.xml")}): full-text weekly issues`, `- [Sitemap](${abs("/sitemap.xml")})`, "");
  L.push("## Categories", "");
  for (const c of CATEGORIES) L.push(`- [${c.name}](${abs(`/category/${c.slug}`)}): ${c.blurb}`);
  L.push("", "## Weekly digest", "");
  for (const i of getIssues()) L.push(`- [Weekly #${i.number}: ${i.title}](${abs(`/weekly/${i.slug}`)}) (${i.date}): ${i.summary}`);
  L.push("", "## Entries", "");
  for (const e of entries) L.push(`- [${e.name}](${abs(`/directory/${e.slug}`)}): ${e.description}`);
  L.push("", "## Pages", "", `- [Submit a tool](${abs("/submit")})`, `- [Sponsor](${abs("/sponsor")}): featured listing and newsletter slots`, "");
  return new Response(L.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}

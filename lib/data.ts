import entriesJson from "@/data/entries.json";

export type EntryType = "mcp-server" | "agent-tool";

export interface Entry {
  slug: string;
  name: string;
  type: EntryType;
  category: string;
  description: string;
  url: string;
  repoUrl: string | null;
  githubStars: number | null;
  tags: string[];
  worksWith: string[];
  addedAt: string; // YYYY-MM-DD
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  type: EntryType | "both";
}

export const CATEGORIES: Category[] = [
  { slug: "coding-agents", name: "Coding Agents", blurb: "Terminal, IDE and cloud agents that write and ship code.", type: "agent-tool" },
  { slug: "agent-frameworks", name: "Agent Frameworks", blurb: "Libraries and SDKs for building your own agents.", type: "agent-tool" },
  { slug: "agent-infra", name: "Agent Infrastructure", blurb: "Sandboxes, browsers, memory, gateways and observability for agents.", type: "agent-tool" },
  { slug: "workflows", name: "Skills & Workflows", blurb: "Skills, methodologies, standards and plugin packs that make agents better.", type: "agent-tool" },
  { slug: "mcp-tooling", name: "MCP SDKs & Registries", blurb: "Build, test, host and discover MCP servers.", type: "both" },
  { slug: "dev-tools", name: "Developer & Code", blurb: "MCP servers for repos, docs, files and code understanding.", type: "mcp-server" },
  { slug: "browser", name: "Browser Automation", blurb: "MCP servers that let agents drive and inspect browsers.", type: "mcp-server" },
  { slug: "search", name: "Search & Web Data", blurb: "Web search, scraping and research MCP servers.", type: "mcp-server" },
  { slug: "databases", name: "Databases", blurb: "MCP servers for Postgres, MongoDB, Redis, Elasticsearch and more.", type: "mcp-server" },
  { slug: "cloud", name: "Cloud & DevOps", blurb: "MCP servers for AWS, Azure, Cloudflare, Vercel and Terraform.", type: "mcp-server" },
  { slug: "productivity", name: "Productivity & Docs", blurb: "Notion, Jira, Slack, Google Workspace, automation and documents.", type: "mcp-server" },
  { slug: "design", name: "Design & Creative", blurb: "Figma, UI components, 3D and game-engine MCP servers.", type: "mcp-server" },
  { slug: "memory", name: "Memory & Reasoning", blurb: "Persistent memory, knowledge graphs and structured thinking.", type: "mcp-server" },
  { slug: "observability", name: "Observability", blurb: "Errors, analytics and dashboards inside your agent.", type: "mcp-server" },
  { slug: "business", name: "Payments & Business", blurb: "Payments, billing and business operations for agents.", type: "mcp-server" },
];

export const AGENT_LABELS: Record<string, string> = {
  "any-mcp": "Any MCP client",
  "claude-code": "Claude Code",
  codex: "Codex",
  cursor: "Cursor",
  vscode: "VS Code",
  windsurf: "Windsurf",
  "gemini-cli": "Gemini CLI",
  opencode: "OpenCode",
  openclaw: "OpenClaw",
  hermes: "Hermes",
};

export const TYPE_LABELS: Record<EntryType, string> = {
  "mcp-server": "MCP server",
  "agent-tool": "Agent tool",
};

/** Editorial picks shown in the "Featured" strip (not paid). */
export const EDITOR_PICKS = ["context7", "playwright-mcp", "github-mcp-server", "claude-code", "openclaw", "fastmcp"];

/** Paid placements. Add an object here when a sponsor books a week; remove it when it ends. */
export interface Sponsor { name: string; url: string; blurb: string; until: string; slug?: string }
export const SPONSORS: Sponsor[] = [];

export const entries: Entry[] = (entriesJson as Entry[]).slice().sort((a, b) => (b.githubStars ?? 0) - (a.githubStars ?? 0));

export const getEntry = (slug: string) => entries.find((e) => e.slug === slug);
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const entriesInCategory = (slug: string) => entries.filter((e) => e.category === slug);
export const activeSponsors = () => {
  const today = new Date().toISOString().slice(0, 10);
  return SPONSORS.filter((s) => s.until >= today);
};

export function newThisWeek(limit = 8): Entry[] {
  const latest = entries.reduce((m, e) => (e.addedAt > m ? e.addedAt : m), "0000-00-00");
  const cutoff = new Date(new Date(latest).getTime() - 7 * 864e5).toISOString().slice(0, 10);
  return entries
    .filter((e) => e.addedAt >= cutoff)
    .sort((a, b) => (b.addedAt === a.addedAt ? (b.githubStars ?? 0) - (a.githubStars ?? 0) : b.addedAt.localeCompare(a.addedAt)))
    .slice(0, limit);
}

export function related(entry: Entry, limit = 6): Entry[] {
  return entries
    .filter((e) => e.slug !== entry.slug)
    .map((e) => ({ e, score: (e.category === entry.category ? 3 : 0) + e.tags.filter((t) => entry.tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (b.e.githubStars ?? 0) - (a.e.githubStars ?? 0))
    .slice(0, limit)
    .map((x) => x.e);
}

export const formatStars = (n: number | null) =>
  n == null ? null : n >= 1000 ? `${(n / 1000).toFixed(n >= 100000 ? 0 : 1).replace(/\.0$/, "")}k` : String(n);

export const hostOf = (url: string) => {
  try { return new URL(url).host.replace(/^www\./, ""); } catch { return url; }
};

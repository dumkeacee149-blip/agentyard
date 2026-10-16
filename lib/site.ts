export const SITE = {
  name: "AgentYard",
  tagline: "The tool shed for AI agents.",
  description:
    "A curated directory of MCP servers, coding agents and agent tools for Claude Code, Codex, Cursor, Gemini CLI, OpenClaw, Hermes and more, plus a weekly digest of what shipped.",
  submitIssueUrl: process.env.NEXT_PUBLIC_SUBMIT_URL || "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
};

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prod) return `https://${prod}`;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
export const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const SPONSOR_URL = process.env.NEXT_PUBLIC_SPONSOR_URL || "";

export const PRICING = [
  {
    id: "featured",
    name: "Featured listing",
    price: "$199",
    per: "/ week",
    blurb: "Top-of-homepage sponsored card plus a highlighted badge on your directory page.",
    bullets: ["Pinned sponsor card on the homepage", "Highlighted on your category page", "Marked “Sponsored”, always disclosed", "Do-follow link to your site"],
  },
  {
    id: "newsletter",
    name: "Newsletter slot",
    price: "$99",
    per: "/ issue",
    blurb: "One sponsor block at the top of the weekly digest, on the web archive, RSS and email.",
    bullets: ["Single sponsor per issue", "Appears in web archive + RSS + email", "60-word copy + link", "Booked first come, first served"],
  },
] as const;

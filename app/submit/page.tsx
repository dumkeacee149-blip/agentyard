import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Submit an MCP server or agent tool",
  description: "Suggest an MCP server, coding agent or agent tool for the directory. Free listings for real, working projects.",
  alternates: { canonical: "/submit" },
};

const TEMPLATE = `{
  "slug": "my-tool",
  "name": "My Tool",
  "type": "mcp-server",          // or "agent-tool"
  "category": "dev-tools",       // see README for category slugs
  "description": "One or two sentences, plain English.",
  "url": "https://example.com",
  "repoUrl": "https://github.com/me/my-tool",
  "tags": ["postgres", "official"],
  "worksWith": ["any-mcp", "claude-code", "codex", "cursor"]
}`;

export default function SubmitPage() {
  const issue = SITE.submitIssueUrl;
  const mail = SITE.contactEmail;
  return (
    <div className="mx-auto max-w-3xl px-4 pt-12">
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Submit a tool</h1>
      <p className="mt-3 text-zinc-400">Free listings for real, working MCP servers and agent tools. We check every link before it goes live. Paid placement is separate and never affects whether you get listed.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {issue && <a href={issue} target="_blank" rel="noopener" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500">Open a GitHub issue ↗</a>}
        {mail && <a href={`mailto:${mail}?subject=${encodeURIComponent(`Submit to ${SITE.name}`)}`} className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-500">Email us</a>}
        {!issue && !mail && <p className="rounded-lg border border-dashed border-zinc-700 px-4 py-2 text-sm text-zinc-500">Public submissions (GitHub issues) open shortly. Bookmark this page.</p>}
      </div>
      <h2 className="mt-12 text-lg font-semibold text-white">What to include</h2>
      <p className="mt-2 text-sm text-zinc-400">Paste this, filled in. It is exactly the shape of an entry in our data file, so an agent can merge it in seconds.</p>
      <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 text-xs leading-6 text-zinc-300">{TEMPLATE}</pre>
      <h2 className="mt-10 text-lg font-semibold text-white">Listing rules</h2>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-zinc-400">
        <li>Must be publicly available and working, with a real homepage or repo.</li>
        <li>Descriptions are rewritten in our own words, no marketing superlatives.</li>
        <li>Forks and thin wrappers are listed only if they add something meaningful.</li>
      </ul>
    </div>
  );
}

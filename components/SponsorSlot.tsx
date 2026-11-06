import Link from "next/link";
import { activeSponsors } from "@/lib/data";

export function SponsorSlot() {
  const sponsors = activeSponsors();
  if (sponsors.length) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {sponsors.map((s) => (
          <a
            key={s.name}
            href={s.url}
            rel="sponsored noopener"
            target="_blank"
            className="rounded-xl border border-brand-500/40 bg-surface-1 p-5 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          >
            <span className="caption-3 tracking-wider text-brand-400">Sponsored</span>
            <h3 className="title-2 mt-1 text-white">{s.name}</h3>
            <p className="body-6 mt-1 text-zinc-400">{s.blurb}</p>
          </a>
        ))}
      </div>
    );
  }
  return (
    <Link
      href="/sponsor"
      className="flex flex-col items-start justify-between gap-3 rounded-xl border border-dashed border-brand-500/40 bg-surface-1 p-5 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brand-400 md:flex-row md:items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
    >
      <div>
        <span className="caption-3 tracking-wider text-brand-400">Sponsor slot · available</span>
        <p className="body-6 mt-1 text-zinc-300">
          Put your MCP server or agent product in front of people who build with Claude Code, Codex, Cursor and
          friends.
        </p>
      </div>
      <span className="button-sm shrink-0 rounded-lg bg-brand-600 px-3 py-2 text-white">From $99</span>
    </Link>
  );
}

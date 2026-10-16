import Link from "next/link";
import { activeSponsors } from "@/lib/data";

export function SponsorSlot() {
  const sponsors = activeSponsors();
  if (sponsors.length) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {sponsors.map((s) => (
          <a key={s.name} href={s.url} rel="sponsored noopener" target="_blank" className="rounded-xl border border-amber-400/40 bg-amber-400/5 p-5 hover:border-amber-300">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">Sponsored</span>
            <h3 className="mt-1 text-lg font-semibold text-white">{s.name}</h3>
            <p className="mt-1 text-sm text-zinc-400">{s.blurb}</p>
          </a>
        ))}
      </div>
    );
  }
  return (
    <Link href="/sponsor" className="flex flex-col items-start justify-between gap-3 rounded-xl border border-dashed border-amber-400/40 bg-amber-400/[0.03] p-5 hover:border-amber-300 md:flex-row md:items-center">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">Sponsor slot · available</span>
        <p className="mt-1 text-sm text-zinc-300">Put your MCP server or agent product in front of people who build with Claude Code, Codex, Cursor and friends.</p>
      </div>
      <span className="shrink-0 rounded-lg bg-amber-400 px-3 py-1.5 text-sm font-semibold text-zinc-950">From $99 →</span>
    </Link>
  );
}

import Link from "next/link";
import { type Entry, TYPE_LABELS, formatStars, getCategory } from "@/lib/data";

export function TypeBadge({ type }: { type: Entry["type"] }) {
  const cls = type === "mcp-server" ? "bg-brand-500/10 text-brand-400 ring-brand-500/30" : "bg-lime-400/10 text-lime-300 ring-lime-400/30";
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${cls}`}>{TYPE_LABELS[type]}</span>;
}

export function Stars({ n }: { n: number | null }) {
  const s = formatStars(n);
  if (!s) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-zinc-400" title={`${n?.toLocaleString("en-US")} GitHub stars (approx.)`}>
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25l2.4 4.86 5.36.78-3.88 3.78.92 5.33L8 12.48 3.2 15l.92-5.33L.24 5.89l5.36-.78L8 .25z" /></svg>
      {s}
    </span>
  );
}

export function EntryCard({ entry }: { entry: Entry }) {
  const cat = getCategory(entry.category);
  return (
    <Link
      href={`/directory/${entry.slug}`}
      className="group flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition hover:border-zinc-600 hover:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-white group-hover:text-brand-400">{entry.name}</h3>
        <Stars n={entry.githubStars} />
      </div>
      <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">{entry.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <TypeBadge type={entry.type} />
        {cat && <span className="text-[11px] text-zinc-500">{cat.name}</span>}
      </div>
    </Link>
  );
}

import Link from "next/link";
import { SITE } from "@/lib/site";
import { CATEGORIES } from "@/lib/data";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-3 text-sm text-zinc-500">{SITE.tagline} Curated by agents, checked by humans.</p>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Categories</h3>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}><Link className="text-zinc-400 hover:text-white" href={`/category/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Site</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li><Link className="text-zinc-400 hover:text-white" href="/weekly">Weekly digest</Link></li>
            <li><Link className="text-zinc-400 hover:text-white" href="/weekly/rss.xml">RSS</Link></li>
            <li><Link className="text-zinc-400 hover:text-white" href="/sponsor">Sponsor</Link></li>
            <li><Link className="text-zinc-400 hover:text-white" href="/submit">Submit a tool</Link></li>
            <li><a className="text-zinc-400 hover:text-white" href="/llms.txt">llms.txt</a></li>
            <li><a className="text-zinc-400 hover:text-white" href="/api/entries.json">JSON feed</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} {SITE.name}. Listings link to third-party projects; trademarks belong to their owners. Sponsored placements are always labeled.
      </div>
    </footer>
  );
}

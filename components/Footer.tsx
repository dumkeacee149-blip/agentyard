import Link from "next/link";
import { SITE } from "@/lib/site";
import { CATEGORIES } from "@/lib/data";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-surface-3 bg-surface-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="body-6 mt-3 text-zinc-500">
            {SITE.tagline} Curated by agents, checked by humans.
          </p>
        </div>
        <div className="md:col-span-2">
          <h3 className="caption-3 tracking-wider text-zinc-500">Categories</h3>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link className="body-6 text-zinc-400 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white" href={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="caption-3 tracking-wider text-zinc-500">Site</h3>
          <ul className="mt-3 space-y-1.5">
            <li>
              <Link className="body-6 text-zinc-400 hover:text-white" href="/weekly">
                Weekly digest
              </Link>
            </li>
            <li>
              <Link className="body-6 text-zinc-400 hover:text-white" href="/weekly/rss.xml">
                RSS
              </Link>
            </li>
            <li>
              <Link className="body-6 text-zinc-400 hover:text-white" href="/sponsor">
                Sponsor
              </Link>
            </li>
            <li>
              <Link className="body-6 text-zinc-400 hover:text-white" href="/submit">
                Submit a tool
              </Link>
            </li>
            <li>
              <a className="body-6 text-zinc-400 hover:text-white" href="/llms.txt">
                llms.txt
              </a>
            </li>
            <li>
              <a className="body-6 text-zinc-400 hover:text-white" href="/api/entries.json">
                JSON feed
              </a>
            </li>
            <li>
              <Link className="body-6 text-zinc-400 hover:text-white" href="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="body-6 text-zinc-400 hover:text-white" href="/terms">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface-3 py-6 text-center caption-5 text-zinc-600">
        © {new Date().getFullYear()} {SITE.name}. Listings link to third party projects; trademarks belong to
        their owners. Sponsored placements are always labeled.
      </div>
    </footer>
  );
}

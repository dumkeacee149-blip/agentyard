import Link from "next/link";
import { CATEGORIES, EDITOR_PICKS, entries, getEntry, newThisWeek } from "@/lib/data";
import { getIssues } from "@/lib/weekly";
import { SITE, abs } from "@/lib/site";
import { Directory } from "@/components/Directory";
import { EntryCard } from "@/components/EntryCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SponsorSlot } from "@/components/SponsorSlot";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  const mcp = entries.filter((e) => e.type === "mcp-server").length;
  const tools = entries.length - mcp;
  const fresh = newThisWeek(6);
  const picks = EDITOR_PICKS.map(getEntry).filter((e) => e !== undefined);
  const latest = getIssues()[0];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${SITE.name} directory`,
          url: abs("/"),
          mainEntity: { "@type": "ItemList", numberOfItems: entries.length,
            itemListElement: entries.slice(0, 30).map((e, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/directory/${e.slug}`), name: e.name })) },
        }}
      />
      <section className="relative overflow-hidden border-b border-zinc-900">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 md:pt-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-400" /> {entries.length} tools · {mcp} MCP servers · {tools} agent tools
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {SITE.tagline.replace(/\.$/, "")}<span className="text-brand-500">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-zinc-400">
            MCP servers, coding agents and agent tooling for <span className="text-zinc-200">Claude Code, Codex, Cursor, Gemini CLI, OpenClaw, Hermes</span> and every other agent you run. Hand-checked links, a weekly digest of what shipped.
          </p>
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-start md:flex-wrap">
            <NewsletterForm />
            <Link href="#directory" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white md:self-start">Browse the directory ↓</Link>
            <Link href="/submit" className="rounded-lg border border-brand-500/40 bg-brand-500/10 px-4 py-2 text-sm text-brand-300 hover:border-brand-400 hover:text-brand-200 md:self-start">Submit a tool →</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section className="mt-10"><SponsorSlot /></section>

        <section className="mt-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold text-white">New this week</h2>
            {latest && <Link href={`/weekly/${latest.slug}`} className="text-sm text-brand-400 hover:underline">Read Weekly #{latest.number} →</Link>}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{fresh.map((e) => <EntryCard key={e.slug} entry={e} />)}</div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-white">Editor’s picks</h2>
          <p className="mt-1 text-sm text-zinc-500">Unpaid. The ones we install first on a fresh machine.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{picks.map((e) => <EntryCard key={e!.slug} entry={e!} />)}</div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-white">Browse by category</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`} className="rounded-xl border border-zinc-800 p-4 hover:border-zinc-600 hover:bg-zinc-900/60">
                <div className="flex items-center justify-between"><h3 className="text-sm font-medium text-white">{c.name}</h3><span className="text-xs text-zinc-500">{entries.filter((e) => e.category === c.slug).length}</span></div>
                <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="directory" className="mt-16 scroll-mt-20">
          <h2 className="mb-4 text-xl font-semibold text-white">The directory</h2>
          <Directory entries={entries} categories={CATEGORIES} />
        </section>
      </div>
    </>
  );
}

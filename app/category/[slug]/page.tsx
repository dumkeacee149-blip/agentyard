import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, entriesInCategory, getCategory } from "@/lib/data";
import { EntryCard } from "@/components/EntryCard";
import { SponsorSlot } from "@/components/SponsorSlot";
import { JsonLd } from "@/components/JsonLd";
import { abs } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  const n = entriesInCategory(c.slug).length;
  const title = `${c.name}: ${n} best ${c.type === "mcp-server" ? "MCP servers" : "tools"} for AI agents`;
  return { title, description: `${c.blurb} ${n} curated, link-checked entries.`, alternates: { canonical: `/category/${c.slug}` }, openGraph: { title, url: abs(`/category/${c.slug}`) } };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  const list = entriesInCategory(c.slug);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: abs("/") }, { "@type": "ListItem", position: 2, name: c.name, item: abs(`/category/${c.slug}`) }] },
        { "@type": "ItemList", name: c.name, numberOfItems: list.length, itemListElement: list.map((e, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/directory/${e.slug}`), name: e.name })) },
      ] }} />
      <nav className="text-xs text-zinc-500"><Link href="/" className="hover:text-white">Home</Link> / <span className="text-zinc-300">{c.name}</span></nav>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{c.name}</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">{c.blurb} <span className="text-zinc-500">{list.length} entries, sorted by GitHub stars.</span></p>
      <div className="mt-8"><SponsorSlot /></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((e) => <EntryCard key={e.slug} entry={e} />)}</div>
      <div className="mt-12 flex flex-wrap gap-2">
        {CATEGORIES.filter((x) => x.slug !== c.slug).map((x) => (
          <Link key={x.slug} href={`/category/${x.slug}`} className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400 hover:border-zinc-600 hover:text-white">{x.name}</Link>
        ))}
      </div>
    </div>
  );
}

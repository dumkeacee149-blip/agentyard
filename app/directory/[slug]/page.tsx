import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AGENT_LABELS, TYPE_LABELS, entries, getCategory, getEntry, hostOf, related } from "@/lib/data";
import { EntryCard, Stars, TypeBadge } from "@/components/EntryCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { JsonLd } from "@/components/JsonLd";
import { abs } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEntry((await params).slug);
  if (!e) return {};
  const title = `${e.name}: ${TYPE_LABELS[e.type]}${e.type === "mcp-server" ? " for Claude Code, Codex & Cursor" : ""}`;
  return { title, description: e.description, alternates: { canonical: `/directory/${e.slug}` }, openGraph: { title, description: e.description, url: abs(`/directory/${e.slug}`) }, keywords: [e.name, ...e.tags] };
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = getEntry((await params).slug);
  if (!e) notFound();
  const cat = getCategory(e.category);
  const rel = related(e);
  const works = e.worksWith.map((w) => AGENT_LABELS[w] ?? w);
  return (
    <div className="mx-auto max-w-5xl px-4 pt-10">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { "@type": "SoftwareApplication", name: e.name, description: e.description, url: e.url, applicationCategory: "DeveloperApplication",
          operatingSystem: "Cross-platform", keywords: e.tags.join(", "), ...(e.repoUrl ? { codeRepository: e.repoUrl, sameAs: [e.repoUrl] } : {}),
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "See the project site for pricing." } },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          ...(cat ? [{ "@type": "ListItem", position: 2, name: cat.name, item: abs(`/category/${cat.slug}`) }] : []),
          { "@type": "ListItem", position: cat ? 3 : 2, name: e.name, item: abs(`/directory/${e.slug}`) }] },
      ] }} />
      <nav className="text-xs text-zinc-500">
        <Link href="/" className="hover:text-white">Home</Link> / {cat && <><Link href={`/category/${cat.slug}`} className="hover:text-white">{cat.name}</Link> / </>}<span className="text-zinc-300">{e.name}</span>
      </nav>
      <div className="mt-4 grid gap-10 md:grid-cols-[1fr_280px]">
        <div>
          <div className="flex flex-wrap items-center gap-3"><TypeBadge type={e.type} /><Stars n={e.githubStars} /></div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{e.name}</h1>
          <p className="mt-4 text-lg leading-8 text-zinc-300">{e.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={e.url} target="_blank" rel="noopener" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500">Visit {hostOf(e.url)} ↗</a>
            {e.repoUrl && e.repoUrl !== e.url && <a href={e.repoUrl} target="_blank" rel="noopener" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-500">GitHub repo ↗</a>}
          </div>
          {e.type === "mcp-server" && (
            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-400">
              <h2 className="font-semibold text-white">How to use it</h2>
              <p className="mt-2">Add it as an MCP server in your client (e.g. <code className="rounded bg-zinc-800 px-1">claude mcp add</code> in Claude Code, <code className="rounded bg-zinc-800 px-1">~/.codex/config.toml</code> for Codex, or <code className="rounded bg-zinc-800 px-1">.cursor/mcp.json</code> in Cursor). Follow the install command and auth steps in the project’s README; they change often, so we link instead of copying them.</p>
            </div>
          )}
          {rel.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-semibold text-white">Related</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">{rel.map((r) => <EntryCard key={r.slug} entry={r} />)}</div>
            </section>
          )}
        </div>
        <aside className="space-y-6">
          <dl className="space-y-4 rounded-xl border border-zinc-800 p-5 text-sm">
            <div><dt className="text-xs uppercase tracking-wider text-zinc-500">Category</dt><dd className="mt-1">{cat ? <Link className="text-zinc-200 hover:text-brand-400" href={`/category/${cat.slug}`}>{cat.name}</Link> : e.category}</dd></div>
            {works.length > 0 && <div><dt className="text-xs uppercase tracking-wider text-zinc-500">Works with</dt><dd className="mt-1 flex flex-wrap gap-1.5">{works.map((w) => <span key={w} className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">{w}</span>)}</dd></div>}
            <div><dt className="text-xs uppercase tracking-wider text-zinc-500">Tags</dt><dd className="mt-1 flex flex-wrap gap-1.5">{e.tags.map((t) => <span key={t} className="rounded border border-zinc-800 px-2 py-0.5 text-xs text-zinc-400">#{t}</span>)}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider text-zinc-500">Added</dt><dd className="mt-1 text-zinc-300">{e.addedAt}</dd></div>
          </dl>
          <div className="rounded-xl border border-zinc-800 p-5">
            <h2 className="text-sm font-semibold text-white">Get the weekly digest</h2>
            <p className="mt-1 mb-3 text-xs text-zinc-500">New MCP servers and agent releases, every Friday.</p>
            <NewsletterForm compact />
          </div>
          <p className="text-xs text-zinc-600">Maintain this project? <Link href="/submit" className="underline">Suggest an edit</Link> or <Link href="/sponsor" className="underline">feature it</Link>.</p>
        </aside>
      </div>
    </div>
  );
}

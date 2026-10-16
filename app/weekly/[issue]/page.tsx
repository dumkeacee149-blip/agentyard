import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIssue, getIssues, renderMarkdown } from "@/lib/weekly";
import { NewsletterForm } from "@/components/NewsletterForm";
import { JsonLd } from "@/components/JsonLd";
import { SITE, abs } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return getIssues().map((i) => ({ issue: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ issue: string }> }): Promise<Metadata> {
  const i = getIssue((await params).issue);
  if (!i) return {};
  const title = `Weekly #${i.number}: ${i.title}`;
  return { title, description: i.summary, alternates: { canonical: `/weekly/${i.slug}` }, openGraph: { type: "article", title, description: i.summary, publishedTime: i.date, url: abs(`/weekly/${i.slug}`) } };
}

export default async function IssuePage({ params }: { params: Promise<{ issue: string }> }) {
  const i = getIssue((await params).issue);
  if (!i) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 pt-12">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "NewsArticle", headline: `Weekly #${i.number}: ${i.title}`, datePublished: i.date, description: i.summary,
        url: abs(`/weekly/${i.slug}`), publisher: { "@type": "Organization", name: SITE.name, url: abs("/") }, author: { "@type": "Organization", name: SITE.name } }} />
      <nav className="text-xs text-zinc-500"><Link href="/weekly" className="hover:text-white">The Weekly</Link> / Issue #{i.number}</nav>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{i.title}</h1>
      <p className="mt-2 text-sm text-zinc-500">Issue #{i.number} · <time dateTime={i.date}>{i.date}</time></p>
      <div className="prose-digest mt-6" dangerouslySetInnerHTML={{ __html: renderMarkdown(i.body) }} />
      <div className="mt-12 rounded-xl border border-zinc-800 p-6">
        <h2 className="font-semibold text-white">Get next week’s issue</h2>
        <div className="mt-3"><NewsletterForm /></div>
      </div>
    </article>
  );
}

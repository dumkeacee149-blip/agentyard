import type { Metadata } from "next";
import Link from "next/link";
import { getIssues } from "@/lib/weekly";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Weekly digest: new MCP servers & AI agent releases",
  description: "A short weekly roundup of new MCP servers, coding-agent releases and agent tooling worth your time.",
  alternates: { canonical: "/weekly", types: { "application/rss+xml": "/weekly/rss.xml" } },
};

export default function WeeklyIndex() {
  const issues = getIssues();
  return (
    <div className="mx-auto max-w-3xl px-4 pt-12">
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">The Weekly</h1>
      <p className="mt-3 text-zinc-400">What shipped in the agent ecosystem this week: releases, new MCP servers, and one thing to try. Five minutes, every Friday.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start"><NewsletterForm /><a href="/weekly/rss.xml" className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300 hover:border-zinc-500">RSS feed</a></div>
      <ol className="mt-12 space-y-4">
        {issues.map((i) => (
          <li key={i.slug}>
            <Link href={`/weekly/${i.slug}`} className="block rounded-xl border border-zinc-800 p-5 hover:border-zinc-600 hover:bg-zinc-900/50">
              <div className="text-xs text-zinc-500">Issue #{i.number} · <time dateTime={i.date}>{i.date}</time></div>
              <h2 className="mt-1 text-lg font-semibold text-white">{i.title}</h2>
              <p className="mt-1 text-sm text-zinc-400">{i.summary}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

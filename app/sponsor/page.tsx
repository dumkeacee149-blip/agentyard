import type { Metadata } from "next";
import { PRICING, SITE, SPONSOR_URL } from "@/lib/site";
import { entries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sponsor: reach people who build with AI agents",
  description: "Featured listings and newsletter slots on a directory of MCP servers and agent tools read by Claude Code, Codex and Cursor users.",
  alternates: { canonical: "/sponsor" },
};

export default function SponsorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-12">
      <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Sponsor {SITE.name}</h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        Our readers install MCP servers, run coding agents and pick infrastructure for their teams. {entries.length} hand-checked listings, a weekly digest, and machine-readable feeds that AI assistants read too.
        Sponsored placements are always labeled. We only accept products that are real and relevant.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {PRICING.map((p) => (
          <div key={p.id} className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <h2 className="text-lg font-semibold text-white">{p.name}</h2>
            <p className="mt-2"><span className="text-4xl font-semibold text-white">{p.price}</span><span className="text-zinc-500"> {p.per}</span></p>
            <p className="mt-3 text-sm text-zinc-400">{p.blurb}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">{p.bullets.map((b) => <li key={b} className="flex gap-2"><span className="text-lime-400">✓</span>{b}</li>)}</ul>
            <div className="mt-auto pt-6">
              {SPONSOR_URL ? (
                <a href={SPONSOR_URL} target="_blank" rel="noopener" className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-500">Pay with Stripe</a>
              ) : (
                <p className="rounded-lg border border-dashed border-zinc-700 px-4 py-2.5 text-center text-sm text-zinc-500">Online booking opens soon</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-xl border border-zinc-800 p-6 text-sm text-zinc-400">
        <h2 className="font-semibold text-white">How it works</h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5">
          <li>Pay for a slot{SPONSOR_URL ? " with the Stripe button above" : ""} and include your product URL and preferred week.</li>
          <li>We review it for relevance (MCP server, agent tool, or infrastructure agent builders actually use).</li>
          <li>Your placement goes live on the next Monday, labeled “Sponsored”. Not a fit? Full refund.</li>
        </ol>
        {SITE.contactEmail && <p className="mt-4">Questions: <a className="text-brand-400 underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a></p>}
      </div>
    </div>
  );
}

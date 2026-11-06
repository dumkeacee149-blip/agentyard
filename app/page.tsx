import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, EDITOR_PICKS, entries, getEntry, newThisWeek } from "@/lib/data";
import { getIssues } from "@/lib/weekly";
import { SITE, abs } from "@/lib/site";
import { Directory } from "@/components/Directory";
import { EntryCard } from "@/components/EntryCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SponsorSlot } from "@/components/SponsorSlot";
import { JsonLd } from "@/components/JsonLd";
import { TaglineReveal } from "@/components/TaglineReveal";
import { Reveal } from "@/components/Reveal";

const BENEFITS = [
  {
    title: "Find tools that actually install",
    detail: "Every listing is hand checked so you spend less time on dead repos and more time shipping agents.",
  },
  {
    title: "Cover MCP and coding agents together",
    detail: "One directory for servers, agents and infrastructure instead of five scattered lists.",
  },
  {
    title: "Catch what shipped this week",
    detail: "A short weekly digest plus New this week on the homepage, so you do not miss useful releases.",
  },
] as const;

const STEPS = [
  { n: "01", title: "Browse or search", detail: "Filter by MCP servers, agent tools or category." },
  { n: "02", title: "Open a listing", detail: "Read what it does, stars and which agents it works with." },
  { n: "03", title: "Install and ship", detail: "Follow the project link. Come back next week for what is new." },
] as const;

const FAQS = [
  {
    q: "What is AgentYard?",
    a: "A curated directory of MCP servers, coding agents and agent tooling, plus a short weekly digest of what shipped.",
  },
  {
    q: "What counts as an MCP server here?",
    a: "A real Model Context Protocol server you can install in Claude Code, Codex, Cursor or another MCP client, with a working homepage or repo.",
  },
  {
    q: "Which agents does the directory cover?",
    a: "Claude Code, Codex, Cursor, Gemini CLI, OpenClaw, Hermes and other agents that use MCP or similar tool wiring.",
  },
  {
    q: "How do I submit a tool?",
    a: "Use the Submit page. Free listings for real, working projects. We rewrite descriptions in our own words and check every link before it goes live.",
  },
  {
    q: "Is submitting free?",
    a: "Yes. Paid sponsorship never decides whether something gets listed. Sponsorship only buys labeled placement.",
  },
  {
    q: "What does a sponsor placement include?",
    a: "A featured listing on the homepage and category pages, or a newsletter slot on the weekly digest. Prices and details are on the Sponsor page.",
  },
  {
    q: "Are sponsored listings labeled?",
    a: "Always. Sponsored cards and newsletter slots are marked so readers know what is paid.",
  },
  {
    q: "What is the weekly digest?",
    a: "A short Friday note covering new MCP servers, coding agents and tooling we would install ourselves. Also available as an archive and RSS feed.",
  },
  {
    q: "How often is the directory updated?",
    a: "We add hand checked entries as they land, and surface the newest ones in New this week and the weekly issue.",
  },
  {
    q: "Can AI assistants read AgentYard?",
    a: "Yes. There is an llms.txt, a machine readable entries JSON feed, and RSS for the weekly digest.",
  },
] as const;

export default function Home() {
  const mcp = entries.filter((e) => e.type === "mcp-server").length;
  const tools = entries.length - mcp;
  const fresh = newThisWeek(6);
  const picks = EDITOR_PICKS.map(getEntry).filter((e) => e !== undefined);
  const latest = getIssues()[0];
  const issueCount = getIssues().length;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${SITE.name} directory`,
          url: abs("/"),
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: entries.length,
            itemListElement: entries.slice(0, 30).map((e, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: abs(`/directory/${e.slug}`),
              name: e.name,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="relative overflow-hidden border-b border-surface-3 bg-surface-0">
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-28 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-32">
          <div className="min-w-0">
            <p className="caption-4 inline-flex items-center gap-2 rounded-full border border-surface-4 bg-surface-1 px-3 py-1 text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden />
              {entries.length} tools · {mcp} MCP servers · {tools} agent tools · {issueCount} weekly issues
            </p>

            <h1 className="heading-1 hero-heading-gradient mt-6 max-w-[680px]">
              The tool shed
              <br />
              for AI agents.
            </h1>

            <p className="body-3 mt-6 max-w-[680px] text-zinc-400">
              MCP servers, coding agents and agent tooling for{" "}
              <span className="text-zinc-200">Claude Code, Codex, Cursor, Gemini CLI, OpenClaw, Hermes</span> and
              every other agent you run. Hand checked links, a weekly digest of what shipped.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3">
              <Link href="/sponsor" className="btn-primary button-md">
                Sponsor your tool
              </Link>
              <p className="caption-5 text-zinc-500">
                Featured listing $199/week · Newsletter slot $99/issue
              </p>
              <Link href="#directory" className="link-quiet caption-2">
                Browse the directory
              </Link>
            </div>
          </div>

          <div className="min-w-0 w-full">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-surface-2">
              <Image
                src="/art/hero-shed.jpg"
                alt="Dark SaaS directory UI mockup for AgentYard with search and tool listings"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <TaglineReveal />

      <div className="mx-auto max-w-6xl px-4">
        <Reveal as="section" className="mt-16">
          <h2 className="heading-4 text-white">Why builders use the yard</h2>
          <div className="mt-8 grid items-start gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-2 md:aspect-auto md:min-h-[360px]">
              <Image
                src="/art/benefit-tools.jpg"
                alt="Three frosted glass module icons on black representing agent tools"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <ul className="flex flex-col gap-8 md:pt-4">
              {BENEFITS.map((b, i) => (
                <li
                  key={b.title}
                  className={`max-w-md ${i === 1 ? "md:ml-8" : i === 2 ? "md:ml-16" : ""}`}
                >
                  <p className="caption-3 font-mono text-brand-400">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="title-1 mt-2 text-white">{b.title}</h3>
                  <p className="body-6 mt-2 text-zinc-400">{b.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal as="section" className="mt-16">
          <h2 className="heading-4 text-white">How it works</h2>
          <ol className="relative mt-8 space-y-0 border-l border-surface-3 pl-8">
            {STEPS.map((s) => (
              <li key={s.n} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-12 flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 caption-3 font-mono text-brand-400 ring-4 ring-surface-0"
                  aria-hidden
                >
                  {s.n}
                </span>
                <h3 className="title-1 text-white">{s.title}</h3>
                <p className="body-6 mt-2 max-w-xl text-zinc-400">{s.detail}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal as="section" className="mt-16">
          <SponsorSlot />
        </Reveal>

        <Reveal as="section" className="mt-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
            <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-surface-2 md:min-h-0">
              <Image
                src="/art/weekly-desk.jpg"
                alt="Black folded weekly digest with blue ribbon still life"
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-3">
              <p className="caption-3 text-brand-400">Weekly digest</p>
              <h2 className="heading-4 text-white">What shipped for agents this week</h2>
              <p className="body-6 text-zinc-400">
                A short curated note covering new MCP servers, coding agents and tooling worth installing.
                No hype roundups. Just what we checked and would run ourselves.
              </p>
              {latest ? (
                <Link
                  href={`/weekly/${latest.slug}`}
                  className="link-quiet caption-2 mt-2 inline-flex w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                >
                  Read Weekly #{latest.number}
                </Link>
              ) : (
                <Link
                  href="/weekly"
                  className="link-quiet caption-2 mt-2 inline-flex w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                >
                  Browse the weekly archive
                </Link>
              )}
              <div className="mt-4 max-w-md border-t border-surface-3 pt-6">
                <p className="title-4 mb-3 text-zinc-300">Get the weekly digest</p>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="heading-4 text-white">New this week</h2>
            {latest && (
              <Link href={`/weekly/${latest.slug}`} className="link-quiet caption-2 shrink-0">
                Read Weekly #{latest.number}
              </Link>
            )}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fresh.map((e) => (
              <EntryCard key={e.slug} entry={e} />
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="mt-16">
          <h2 className="heading-4 text-white">Editor picks</h2>
          <p className="body-6 mt-2 text-zinc-500">Unpaid. The ones we install first on a fresh machine.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((e) => (
              <EntryCard key={e!.slug} entry={e!} />
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="mt-16">
          <h2 className="heading-4 text-white">Browse by category</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => {
              const count = entries.filter((e) => e.category === c.slug).length;
              return (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="rounded-xl p-4 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="title-4 text-white">{c.name}</h3>
                    <span className="caption-5 font-mono text-zinc-500">{count}</span>
                  </div>
                  <p className="caption-5 mt-2 line-clamp-2 text-zinc-500">{c.blurb}</p>
                </Link>
              );
            })}
          </div>
        </Reveal>

        <section id="directory" className="mt-20 scroll-mt-28">
          <h2 className="heading-4 mb-6 text-white">The directory</h2>
          <Directory entries={entries} categories={CATEGORIES} />
        </section>

        <Reveal as="section" className="mt-20">
          <h2 className="heading-4 text-white">Questions</h2>
          <dl className="mt-8 grid gap-8 md:grid-cols-2">
            {FAQS.map((f) => (
              <div key={f.q} className="max-w-xl">
                <dt className="title-2 text-white">{f.q}</dt>
                <dd className="body-6 mt-2 text-zinc-400">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal as="section" className="mt-20 mb-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="heading-4 text-white">Put your tool in front of agent builders</h2>
              <p className="body-6 mt-3 text-zinc-400">
                Featured listing $199/week or a newsletter slot at $99/issue. Placements are always labeled.
              </p>
              <Link href="/sponsor" className="btn-primary button-md mt-6">
                Sponsor your tool
              </Link>
            </div>
            <div>
              <p className="title-4 mb-3 text-zinc-300">Or get the weekly digest</p>
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}

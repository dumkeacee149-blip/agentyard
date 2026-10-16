"use client";

import { useEffect, useMemo, useState } from "react";
import { type Entry, type Category } from "@/lib/data";
import { EntryCard } from "./EntryCard";

export function Directory({ entries, categories }: { entries: Entry[]; categories: Category[] }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<"all" | Entry["type"]>("all");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState<"stars" | "name">("stars");

  // Support ?q= deep links (used by the WebSite SearchAction JSON-LD).
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQ(initial);
  }, []);

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const e of entries) if (type === "all" || e.type === type) m[e.category] = (m[e.category] ?? 0) + 1;
    return m;
  }, [entries, type]);

  const shown = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const list = entries.filter((e) => {
      if (type !== "all" && e.type !== type) return false;
      if (cat !== "all" && e.category !== cat) return false;
      if (!terms.length) return true;
      const hay = `${e.name} ${e.description} ${e.tags.join(" ")} ${e.category} ${e.worksWith.join(" ")}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
    return sort === "name" ? list.slice().sort((a, b) => a.name.localeCompare(b.name)) : list;
  }, [entries, q, type, cat, sort]);

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 text-xs transition ${active ? "border-brand-500 bg-brand-500/15 text-white" : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"}`;

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${entries.length} tools: "postgres", "browser", "figma", "claude-code"…`}
            aria-label="Search the directory"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 py-3 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "mcp-server", "agent-tool"] as const).map((t) => (
            <button key={t} onClick={() => { setType(t); setCat("all"); }} className={chip(type === t)}>
              {t === "all" ? "All" : t === "mcp-server" ? "MCP servers" : "Agent tools"}
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "stars" | "name")}
            aria-label="Sort"
            className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-400"
          >
            <option value="stars">Most stars</option>
            <option value="name">A–Z</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setCat("all")} className={chip(cat === "all")}>All categories</button>
        {categories.filter((c) => counts[c.slug]).map((c) => (
          <button key={c.slug} onClick={() => setCat(c.slug)} className={chip(cat === c.slug)}>
            {c.name} <span className="text-zinc-500">{counts[c.slug]}</span>
          </button>
        ))}
      </div>
      <p className="mt-6 text-xs text-zinc-500">{shown.length} result{shown.length === 1 ? "" : "s"}</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e) => <EntryCard key={e.slug} entry={e} />)}
      </div>
      {!shown.length && <p className="mt-10 text-center text-sm text-zinc-500">Nothing matches yet. <a className="text-brand-400 underline" href="/submit">Suggest a tool</a>.</p>}
    </div>
  );
}

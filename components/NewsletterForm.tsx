"use client";

import { useState } from "react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "soon" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (data.status === "coming_soon") { setState("soon"); setMsg(data.message); }
      else if (res.ok) { setState("ok"); setMsg(data.message ?? "You're in. See you next week."); }
      else { setState("error"); setMsg(data.message ?? "Something went wrong."); }
    } catch {
      setState("error"); setMsg("Network error, please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "w-full" : "w-full max-w-md"}>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-brand-500 focus:outline-none"
        />
        <button disabled={state === "loading"} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 disabled:opacity-60">
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      {msg && <p className={`mt-2 text-xs ${state === "error" ? "text-red-400" : state === "soon" ? "text-amber-300" : "text-lime-300"}`}>{msg}</p>}
      {!msg && <p className="mt-2 text-xs text-zinc-500">One email a week. New MCP servers, agent releases, no fluff.</p>}
    </form>
  );
}

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
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.status === "coming_soon") {
        setState("soon");
        setMsg(data.message);
      } else if (res.ok) {
        setState("ok");
        setMsg(data.message ?? "You are in. See you next week.");
      } else {
        setState("error");
        setMsg(data.message ?? "Something went wrong. Check the address and try again.");
      }
    } catch {
      setState("error");
      setMsg("Network error. Please try again.");
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
          className="body-6 min-w-0 flex-1 rounded-lg border border-surface-4 bg-surface-0 px-3 py-2 text-white placeholder:text-zinc-500 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:border-brand-500 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        />
        <button
          disabled={state === "loading"}
          type="submit"
          className="button-sm rounded-lg bg-surface-3 px-3 py-2 text-white transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface-4 active:scale-[0.98] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      {msg && (
        <p
          className={`caption-2 mt-2 ${
            state === "error" ? "text-red-400" : state === "soon" ? "text-zinc-400" : "text-brand-400"
          }`}
        >
          {msg}
        </p>
      )}
      {!msg && (
        <p className="caption-5 mt-2 text-zinc-500">One email a week. New MCP servers, agent releases, no fluff.</p>
      )}
    </form>
  );
}

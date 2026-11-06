"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

export function Logo() {
  return (
    <span className="title-3 flex items-center gap-2 tracking-tight text-white">
      <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="8" fill="#2563eb" />
        <path
          d="M9 22l7-12 7 12M11.5 18h9"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="24.5" cy="8" r="2.5" fill="#5fa0ff" />
      </svg>
      {SITE.name}
    </span>
  );
}

const NAV = [
  { href: "/#directory", label: "Directory", match: "/" },
  { href: "/weekly", label: "Weekly", match: "/weekly" },
  { href: "/submit", label: "Submit", match: "/submit" },
  { href: "/sponsor", label: "Sponsor", match: "/sponsor" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (match: string) => {
    if (match === "/") return pathname === "/";
    return pathname === match || pathname.startsWith(`${match}/`);
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-3 md:pt-4">
        <div className="pointer-events-auto mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-surface-1/70 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl md:px-4">
          <Link href="/" aria-label={`${SITE.name} home`} className="shrink-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => {
              const active = isActive(item.match);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`title-4 rounded-lg px-3 py-1.5 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${
                    active ? "bg-surface-3 text-white" : "text-zinc-400 hover:bg-surface-2 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-zinc-200 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-surface-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden
              className={`absolute h-0.5 w-5 rounded-full bg-current transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-5 rounded-full bg-current transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden
              className={`absolute h-0.5 w-5 rounded-full bg-current transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-30 bg-surface-0/95 backdrop-blur-xl transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-6 pt-16" aria-label="Mobile">
          {NAV.map((item, i) => {
            const active = isActive(item.match);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`heading-5 rounded-xl px-4 py-3 transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                } ${active ? "bg-surface-2 text-white" : "text-zinc-300 hover:bg-surface-1 hover:text-white"}`}
                style={{ transitionDelay: open ? `${Math.min(i * 60, 400)}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

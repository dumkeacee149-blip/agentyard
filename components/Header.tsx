import Link from "next/link";
import { SITE } from "@/lib/site";

export function Logo() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight text-white">
      <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="8" fill="#2563eb" />
        <path d="M9 22l7-12 7 12M11.5 18h9" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="24.5" cy="8" r="2.5" fill="#a3e635" />
      </svg>
      {SITE.name}
    </span>
  );
}

export function Header() {
  const nav = [
    ["/#directory", "Directory"],
    ["/weekly", "Weekly"],
    ["/submit", "Submit"],
    ["/sponsor", "Sponsor"],
  ];
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" aria-label={`${SITE.name} home`}><Logo /></Link>
        <nav className="flex items-center gap-1 text-sm">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className="rounded-md px-3 py-1.5 text-zinc-400 hover:bg-zinc-900 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import fs from "node:fs";
import path from "node:path";

export interface Issue {
  number: number;
  slug: string; // e.g. "1"
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  body: string; // markdown
}

const DIR = path.join(process.cwd(), "data", "weekly");

function parse(file: string): Issue {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`Missing frontmatter in ${file}`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
  }
  const number = Number(meta.issue);
  return { number, slug: String(number), title: meta.title, date: meta.date, summary: meta.summary ?? "", body: m[2].trim() };
}

export function getIssues(): Issue[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".md")).map(parse).sort((a, b) => b.number - a.number);
}

export const getIssue = (slug: string) => getIssues().find((i) => i.slug === slug);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(s: string): string {
  return esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, t, u) => {
      const ext = /^https?:/.test(u);
      return `<a href="${u}"${ext ? ' rel="noopener" target="_blank"' : ""}>${t}</a>`;
    });
}

/** Tiny markdown renderer for trusted, repo-authored digest files (headings, lists, quotes, hr, links, bold, code). */
export function renderMarkdown(md: string): string {
  const out: string[] = [];
  let list = false;
  let para: string[] = [];
  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const closeList = () => { if (list) { out.push("</ul>"); list = false; } };
  for (const line of md.split("\n")) {
    const l = line.trimEnd();
    if (!l.trim()) { flush(); closeList(); continue; }
    let m;
    if ((m = l.match(/^(#{2,3})\s+(.*)$/))) { flush(); closeList(); out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); }
    else if (/^---+$/.test(l)) { flush(); closeList(); out.push("<hr/>"); }
    else if ((m = l.match(/^[-*]\s+(.*)$/))) { flush(); if (!list) { out.push("<ul>"); list = true; } out.push(`<li>${inline(m[1])}</li>`); }
    else if ((m = l.match(/^>\s?(.*)$/))) { flush(); closeList(); out.push(`<blockquote>${inline(m[1])}</blockquote>`); }
    else { closeList(); para.push(l.trim()); }
  }
  flush(); closeList();
  return out.join("\n");
}

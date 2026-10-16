// Validates data/entries.json and data/weekly/*.md. Run: npm run validate
// Add --check-links to also HEAD/GET every url (slow, needs network).
import fs from "node:fs";

const CATS = ["coding-agents","agent-frameworks","agent-infra","workflows","mcp-tooling","dev-tools","browser","search","databases","cloud","productivity","design","memory","observability","business"];
const AGENTS = ["any-mcp","claude-code","codex","cursor","vscode","windsurf","gemini-cli","opencode","openclaw","hermes"];
const entries = JSON.parse(fs.readFileSync("data/entries.json", "utf8"));
const errors = [];
const slugs = new Set();
for (const e of entries) {
  const id = e.slug ?? JSON.stringify(e).slice(0, 40);
  if (!/^[a-z0-9-]+$/.test(e.slug ?? "")) errors.push(`${id}: bad slug`);
  if (slugs.has(e.slug)) errors.push(`${id}: duplicate slug`);
  slugs.add(e.slug);
  for (const k of ["name", "description", "url", "addedAt"]) if (!e[k]) errors.push(`${id}: missing ${k}`);
  if (!["mcp-server", "agent-tool"].includes(e.type)) errors.push(`${id}: bad type`);
  if (!CATS.includes(e.category)) errors.push(`${id}: unknown category ${e.category}`);
  if (!/^https:\/\//.test(e.url ?? "")) errors.push(`${id}: url must be https`);
  if (e.repoUrl && !/^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(e.repoUrl)) errors.push(`${id}: repoUrl should be https://github.com/owner/repo`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.addedAt ?? "")) errors.push(`${id}: addedAt must be YYYY-MM-DD`);
  if (!Array.isArray(e.tags) || !Array.isArray(e.worksWith)) errors.push(`${id}: tags/worksWith must be arrays`);
  for (const w of e.worksWith ?? []) if (!AGENTS.includes(w)) errors.push(`${id}: unknown worksWith ${w} (add it to AGENT_LABELS in lib/data.ts and here)`);
  if ((e.description ?? "").length > 260) errors.push(`${id}: description too long (max 260 chars)`);
}
for (const f of fs.readdirSync("data/weekly")) {
  const raw = fs.readFileSync(`data/weekly/${f}`, "utf8");
  if (!/^---\nissue: \d+\ntitle: .+\ndate: \d{4}-\d{2}-\d{2}\nsummary: .+\n---\n/.test(raw)) errors.push(`weekly/${f}: frontmatter must be issue/title/date/summary in that order`);
}
if (process.argv.includes("--check-links")) {
  for (const e of entries) for (const u of [e.url, e.repoUrl].filter(Boolean)) {
    try {
      const r = await fetch(u, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 link-check" } });
      if (r.status >= 400 && r.status !== 403) errors.push(`${e.slug}: ${u} -> ${r.status}`);
    } catch (err) { errors.push(`${e.slug}: ${u} -> ${err.message}`); }
  }
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log(`OK: ${entries.length} entries, ${fs.readdirSync("data/weekly").length} weekly issue(s)`);

# AgentYard

**The tool shed for AI agents.** A curated directory of MCP servers, coding agents and agent tools (Claude Code, Codex, Cursor, Gemini CLI, OpenClaw, Hermes…) with a weekly digest, monetized by clearly-labeled sponsor slots.

Built to be run by agents: all content lives in plain files in this repo, so adding an entry or publishing an issue is a small, reviewable PR.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS v4), almost everything statically generated at build time.
- No database. Data = `data/entries.json` + `data/weekly/*.md`.
- Deploys on Vercel Hobby with zero config.

## Structure

```
app/
  page.tsx                  Home: hero, sponsor slot, new this week, editor's picks, categories, searchable directory
  category/[slug]/          Category pages (static)
  directory/[slug]/         One SEO page per entry (static, JSON-LD SoftwareApplication)
  weekly/                   Digest archive, weekly/[issue] pages, weekly/rss.xml (RSS 2.0 full text)
  sponsor/                  Pricing; "Pay with Stripe" shows only when NEXT_PUBLIC_SPONSOR_URL is set
  submit/                   Submission instructions + JSON template
  api/subscribe/            Newsletter signup (Resend); returns "coming_soon" and stores nothing until env is set
  api/entries.json/         Public JSON feed of all entries
  llms.txt/                 llms.txt for AI crawlers
  sitemap.ts, robots.ts
components/                 UI (Directory is the only client-side search component)
lib/data.ts                 Types, CATEGORIES, AGENT_LABELS, EDITOR_PICKS, SPONSORS, helpers
lib/weekly.ts               Loads data/weekly/*.md, tiny markdown renderer
lib/site.ts                 Name, tagline, site URL, pricing
data/entries.json           THE directory
data/weekly/NNN.md          Weekly issues
scripts/validate-data.mjs   Schema + optional link check (`npm run validate -- --check-links`)
scripts/build_seed.py       One-off script that produced the v1 seed (provenance only)
```

## Environment variables (all optional)

| Var | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (e.g. `https://agentyard.dev`). Defaults to the Vercel production URL. |
| `NEXT_PUBLIC_SPONSOR_URL` | Stripe Payment Link. The "Pay with Stripe" buttons are hidden when unset. |
| `RESEND_API_KEY` + `RESEND_AUDIENCE_ID` | Turns the newsletter form on (adds contacts to a Resend audience). Without both, the form says "coming soon" and stores nothing. |
| `NEXT_PUBLIC_SUBMIT_URL` | Link for the "Open a GitHub issue" button on /submit (e.g. `https://github.com/<you>/agentyard/issues/new`). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shows mailto links on /submit and /sponsor. |

`NEXT_PUBLIC_*` values are inlined at build time, so redeploy after changing them.

## Agent playbook

### Add an entry
1. Verify the project is real: the homepage/repo returns 200, and it's not a dead or empty repo.
2. Append an object to `data/entries.json`:
   ```json
   {
     "slug": "kebab-case-unique",
     "name": "Display Name",
     "type": "mcp-server",            // or "agent-tool"
     "category": "databases",         // one of CATEGORIES in lib/data.ts
     "description": "1–2 sentences in OUR words (≤260 chars). No copy-paste, no superlatives.",
     "url": "https://official-site-or-docs",
     "repoUrl": "https://github.com/owner/repo",   // or null
     "githubStars": 1234,             // approximate, or null; null for subfolders of monorepos
     "tags": ["postgres", "official"],
     "worksWith": ["any-mcp", "claude-code", "codex", "cursor", "vscode", "windsurf"],
     "addedAt": "YYYY-MM-DD"          // today; drives "New this week"
   }
   ```
   `worksWith` values must exist in `AGENT_LABELS` (lib/data.ts) and in `scripts/validate-data.mjs`.
3. `npm run validate -- --check-links && npm run build`, then open a PR titled `add: <name>`.

### Publish a weekly issue (Fridays)
1. Collect real releases from the last 7 days. Good sources: `https://github.com/<owner>/<repo>/releases.atom` for the bigger entries, new entries added this week (`addedAt`), the official MCP registry.
2. Create `data/weekly/NNN.md` (zero-padded, next number) with frontmatter in this exact order:
   ```
   ---
   issue: 2
   title: "Short headline naming the 2–3 biggest items"
   date: 2026-10-23
   summary: "One or two sentences for the archive, RSS and meta description."
   ---
   ```
   Body: Markdown with `##` sections (Headliners, Coding agents, MCP servers & SDKs, Frameworks & infra, One thing to try). Supports lists, links, **bold**, `code`, `>` quotes and `---`. Link every claim to its release notes and the matching `/directory/<slug>` page. Keep the sponsor line near the top (swap in the sponsor's copy when booked).
3. Validate, build, PR. The archive, RSS, sitemap and llms.txt update automatically.

### Book a sponsor
- Featured listing: add `{ name, url, blurb, until: "YYYY-MM-DD" }` to `SPONSORS` in `lib/data.ts`. It shows on the home and category pages until `until`, always labeled "Sponsored".
- Newsletter slot: replace the sponsor blockquote in that week's issue.

### Refresh star counts
Re-scrape or call the GitHub API and update `githubStars`; they are snapshots and only used for sorting/badges.

## Credits

Some ideas (llms.txt listing only real resources, sitemap and SEO approach, source tiers) were inspired by [AIHOT](https://github.com/KKKKhazix/AIHOT) (MIT). No AIHOT code, name or branding is used here.

Listed projects and trademarks belong to their owners. Descriptions are original summaries.

## Deployment (v1)

- Vercel project `agentyard` (team scope `caicais-projects-199d3cfa`), production URL https://agentyard-kappa.vercel.app
- v1 was deployed via the Vercel API (file upload + create deployment), not Git. Once a GitHub repo exists, connect it in Vercel → Project → Settings → Git so every merged PR auto-deploys.

<!-- git auto-deploy check 2026-10-17 -->

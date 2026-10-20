import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE, SITE_URL, abs } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE.name}: MCP servers & AI agent tools directory`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "MCP servers",
    "Model Context Protocol",
    "Claude Code",
    "Codex",
    "Cursor",
    "AI agent tools",
    "coding agents",
    "agent directory",
    "Gemini CLI",
    "OpenClaw",
  ],
  alternates: { canonical: "/", types: { "application/rss+xml": abs("/weekly/rss.xml") } },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE_URL,
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
    images: ["/og.png"],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: SITE.name, url: SITE_URL, description: SITE.description,
                potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/?q={search_term_string}`, "query-input": "required name=search_term_string" } },
              { "@type": "Organization", "@id": `${SITE_URL}/#org`, name: SITE.name, url: SITE_URL, logo: abs("/icon.svg") },
            ],
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

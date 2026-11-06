import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE.name} handles email subscriptions and site analytics.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-28">
      <h1 className="heading-4 text-white">Privacy</h1>
      <p className="body-6 mt-4 text-zinc-400">
        {SITE.name} is a curated directory of MCP servers and agent tools. If you subscribe to the weekly
        digest we store the email address you submit so we can send the newsletter. You can unsubscribe from
        any issue. We do not sell your email. Sponsored placements are paid advertising and are always labeled
        on the site.
      </p>
      <p className="body-6 mt-4 text-zinc-400">
        The site may use standard hosting and analytics logs (such as request times and pages viewed) to keep
        the service running. Listings point to third party projects; their privacy practices are their own.
      </p>
      <p className="body-6 mt-4 text-zinc-400">
        Questions: use the contact details on the sponsor or submit pages when available, or open an issue on
        the project repository.
      </p>
      <Link href="/" className="link-quiet body-6 mt-8 inline-block">
        Back to the directory
      </Link>
    </div>
  );
}

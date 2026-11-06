import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${SITE.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-28">
      <h1 className="heading-4 text-white">Terms</h1>
      <p className="body-6 mt-4 text-zinc-400">
        {SITE.name} provides a directory and weekly digest for informational purposes. Listings link to third
        party projects. We do not guarantee uptime of those projects, accuracy of star counts, or fitness for
        any particular purpose. Trademarks belong to their owners.
      </p>
      <p className="body-6 mt-4 text-zinc-400">
        Sponsored placements are paid and always labeled. Submitting a tool does not guarantee inclusion.
        Featured listing is $199 per week. Newsletter slot is $99 per issue. Prices and availability may change;
        the sponsor page is authoritative at the time you pay.
      </p>
      <p className="body-6 mt-4 text-zinc-400">
        Use of this site is at your own risk. To the fullest extent allowed by law, {SITE.name} is not liable
        for damages arising from use of the directory, digest or linked tools.
      </p>
      <Link href="/" className="link-quiet body-6 mt-8 inline-block">
        Back to the directory
      </Link>
    </div>
  );
}

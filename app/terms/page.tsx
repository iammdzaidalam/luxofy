import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PoweredBy } from "@/components/powered-by";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms governing registration for the Goa Luxury Investor Showcase.",
};

const sections = [
  {
    h: "The event",
    p: "The Goa Luxury Investor Showcase is a free, invite-only event hosted by Think Reality and Luxofy Properties on 9 August 2026 in Delhi NCR. Registration on this site is a request for a seat; seats are confirmed by our team over a short call and admission is at the organiser's discretion.",
  },
  {
    h: "No investment advice",
    p: "Content on this site and at the event, including projections from the investment calculator, is provided for information and discussion. It is not investment, legal or tax advice. Property values can fall as well as rise, and rental income is not guaranteed. Take independent advice before committing funds.",
  },
  {
    h: "Accuracy of information",
    p: "You confirm the details you submit in the registration form are accurate. We may decline or cancel registrations containing false information.",
  },
  {
    h: "Project information",
    p: "Prices, returns, possession dates and specifications shown for featured projects are indicative, may change without notice, and are superseded by the agreements you sign at the time of any purchase. All projects are sold subject to their RERA disclosures where applicable.",
  },
  {
    h: "Communication consent",
    p: "By registering you consent to being contacted about this event and related opportunities by phone, SMS, WhatsApp and email. You can opt out at any time by replying STOP on WhatsApp or writing to us.",
  },
  {
    h: "Intellectual property",
    p: "All content on this site, including text, photography, film and research material, belongs to Think Reality, Luxofy Properties or their licensors and may not be reproduced without permission.",
  },
  {
    h: "Liability",
    p: "To the extent permitted by law, the organisers accept no liability for losses arising from reliance on information presented on this site or at the event, or from event changes, postponement or cancellation.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-dvh bg-ivory">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link href="/" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-bronze hover:text-bronze-deep">
          Back to the showcase
        </Link>
        <h1 className="font-display mt-6 text-5xl font-normal leading-[1.05] text-ink">Terms of use</h1>
        <p className="mt-4 text-[14px] text-stone">Last updated 16 July 2026</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.h}>
              <h2 className="font-serif text-2xl font-semibold text-ink">{section.h}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stone">{section.p}</p>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-line pt-8 text-[14px] leading-relaxed text-stone">
          Contact: {site.contact.email} or {site.contact.phone}.
        </p>
        <div className="mt-8">
          <PoweredBy />
        </div>
      </div>
    </div>
  );
}

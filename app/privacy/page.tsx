import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PoweredBy } from "@/components/powered-by";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Think Reality and Luxofy Properties collect, use and protect your information.",
};

const sections = [
  {
    h: "What we collect",
    p: "When you register for the showcase we collect the details you provide in the registration form: your name, contact information, location, professional details, and the investment preferences you choose to share. We also record standard technical data such as your IP address and the campaign that brought you to the site.",
  },
  {
    h: "How we use it",
    p: "Your information is used to confirm your seat, prepare relevant material for your consultation, contact you about this event on phone, WhatsApp and email, and measure our advertising. Investment details help us pair you with the right advisor and are never used for any other purpose.",
  },
  {
    h: "Who sees it",
    p: "Only the Think Reality and Luxofy Properties event and sales teams. We use trusted processors to deliver messages (SMS, WhatsApp and email providers) and to measure campaigns (Google and Meta). We do not sell or rent your data to anyone.",
  },
  {
    h: "How long we keep it",
    p: "Registration records are retained for 24 months after the event, after which they are deleted or anonymised unless you have an ongoing relationship with us.",
  },
  {
    h: "Security",
    p: "Data is encrypted in transit and at rest. Access is limited to authorised staff, and every registration is covered by an audit log.",
  },
  {
    h: "Your choices",
    p: `You can ask us to correct or delete your information, or to stop contacting you, at any time. Write to ${site.contact.email} or message us on WhatsApp and we will act within 7 working days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-ivory">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Link href="/" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-bronze hover:text-bronze-deep">
          Back to the showcase
        </Link>
        <h1 className="font-display mt-6 text-5xl font-normal leading-[1.05] text-ink">Privacy policy</h1>
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
          Questions about this policy: {site.contact.email} or {site.contact.phone}.
        </p>
        <div className="mt-8">
          <PoweredBy />
        </div>
      </div>
    </div>
  );
}

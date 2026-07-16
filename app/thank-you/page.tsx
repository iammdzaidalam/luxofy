import type { Metadata } from "next";
import Link from "next/link";
import { site, googleCalendarUrl, whatsappUrl } from "@/lib/site";
import { PoweredBy } from "@/components/powered-by";

export const metadata: Metadata = {
  title: "Registration confirmed",
  robots: { index: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name } = await searchParams;
  const firstName = name?.slice(0, 40) ?? "there";

  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink px-6 py-20 text-cream">
      <div className="w-full max-w-xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-bronze/50 bg-bronze/10">
          <svg width="22" height="17" viewBox="0 0 22 17" fill="none" stroke="#9c7c46" strokeWidth="2" aria-hidden="true">
            <path d="M1 9L8 15.5L21 1.5" />
          </svg>
        </span>

        <p className="mt-8 text-[11px] font-semibold uppercase tracking-luxe text-bronze">
          Registration received
        </p>
        <h1 className="font-display mt-5 text-[2.8rem] font-normal leading-[1.05] md:text-[3.6rem]">
          Your seat <span className="italic">is</span> reserved
        </h1>
        <p className="font-serif mt-4 text-xl italic text-cream/80">Thank you, {firstName}.</p>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-cream/65">
          A confirmation email is on its way. One of our investment advisors will call you within
          24 hours to confirm your RSVP and answer any early questions.
        </p>

        <dl className="mx-auto mt-10 max-w-sm space-y-3 border-y border-line-dark py-7 text-left text-[14px]">
          <div className="flex justify-between gap-6">
            <dt className="text-cream/45">Event</dt>
            <dd className="text-right text-cream/85">{site.name}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-cream/45">Date</dt>
            <dd className="text-cream/85">{site.event.dateLabel}</dd>
          </div>
          <div className="flex justify-between gap-6">
            <dt className="text-cream/45">Venue</dt>
            <dd className="text-right text-cream/85">{site.event.city} · {site.event.venueNote}</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-bronze px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-cream transition-colors hover:bg-bronze-deep"
          >
            Add to Google Calendar
          </a>
          <a
            href="/api/calendar"
            className="inline-flex items-center justify-center rounded-full border border-cream/30 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-cream transition-colors hover:border-bronze hover:text-bronze"
          >
            Download invite (.ics)
          </a>
        </div>

        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.16em] text-cream/70 underline underline-offset-4 transition-colors hover:text-bronze"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.16-1.32A10 10 0 1 0 12 2zm5.44 14.06c-.23.64-1.33 1.22-1.86 1.3-.5.07-1.12.1-1.8-.11a16 16 0 0 1-1.64-.6c-2.88-1.25-4.76-4.15-4.9-4.34-.15-.2-1.18-1.57-1.18-3s.74-2.13 1-2.42c.27-.3.58-.37.77-.37h.55c.18 0 .42-.07.65.5.23.58.79 1.99.86 2.13.07.14.12.31.02.5-.1.2-.14.32-.29.49-.14.17-.3.38-.43.51-.14.14-.29.3-.12.58.17.29.74 1.22 1.6 1.98 1.1.98 2.02 1.28 2.31 1.43.29.14.46.12.62-.07.17-.2.72-.84.91-1.13.2-.29.39-.24.65-.14.27.1 1.7.8 1.99.94.29.15.48.22.55.34.07.12.07.7-.16 1.38z" />
          </svg>
          Questions? Message us on WhatsApp
        </a>

        <Link
          href="/"
          className="mt-10 inline-block text-[13px] text-cream/50 underline underline-offset-4 transition-colors hover:text-bronze"
        >
          Back to the showcase
        </Link>

        <div className="mt-12 border-t border-line-dark pt-6">
          <PoweredBy light />
        </div>
      </div>
    </div>
  );
}

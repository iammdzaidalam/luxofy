import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/register/form";
import { PoweredBy } from "@/components/powered-by";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Reserve your seat at the Goa Luxury Investor Showcase on 9 August 2026 in Delhi NCR. Invite only, limited to 100 investors.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-dvh bg-ivory lg:grid lg:grid-cols-[2fr_3fr]">
      {/* Event summary rail */}
      <aside className="relative flex flex-col justify-between bg-ink px-8 py-10 text-cream md:px-12 lg:sticky lg:top-0 lg:h-dvh lg:py-14">
        <div>
          <div className="flex items-center justify-between gap-6">
            <Link href="/" className="inline-flex items-baseline gap-2">
              <span className="font-display text-lg uppercase tracking-[0.32em]">Luxofy</span>
              <span className="text-[9px] font-medium uppercase tracking-luxe text-cream/50">
                x {site.organizer}
              </span>
            </Link>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-cream/60 transition-colors hover:text-bronze"
            >
              <svg width="13" height="10" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">
                <path d="M6 1L1 6L6 11M1 6H16" />
              </svg>
              Back to home
            </Link>
          </div>

          <h1 className="font-display mt-12 text-5xl font-normal leading-[1.05] md:text-[3.4rem] lg:mt-20">
            Reserve <span className="italic">your</span> seat
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-cream/65">
            The showcase is limited to 100 investors. Registration takes about three minutes, and
            our team confirms every seat personally within 24 hours.
          </p>

          <dl className="mt-10 space-y-5 border-t border-line-dark pt-8 text-[14px]">
            <div className="flex gap-4">
              <dt className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/40">When</dt>
              <dd className="text-cream/80">{site.event.dateLabel}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/40">Where</dt>
              <dd className="text-cream/80">{site.event.city} · {site.event.venueNote}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/40">Entry</dt>
              <dd className="text-cream/80">Invite only. Free for qualified investors.</dd>
            </div>
          </dl>
        </div>

        <div className="mt-12 hidden lg:block">
          <p className="text-[12px] leading-relaxed text-cream/40">
            Your information is encrypted and used only by {site.organizer} and {site.partner} for
            this event. We never sell data.
          </p>
          <PoweredBy light className="mt-4" />
        </div>
      </aside>

      {/* Form */}
      <main className="px-6 py-12 md:px-14 md:py-16 lg:px-20">
        <div className="mx-auto max-w-2xl">
          <RegisterForm />
          <div className="mt-14 border-t border-line pt-6 lg:hidden">
            <PoweredBy />
          </div>
        </div>
      </main>
    </div>
  );
}

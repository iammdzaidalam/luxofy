"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { site } from "@/lib/site";
import { Container, ArrowLink } from "@/components/ui";
import { PoweredBy } from "@/components/powered-by";

const exploreLinks = [
  { href: "/#why-goa", label: "Why Goa" },
  { href: "/#projects", label: "Projects" },
  { href: "/#calculator", label: "Calculator" },
  { href: "/#agenda", label: "Agenda" },
  { href: "/#speakers", label: "Speakers" },
  { href: "/register", label: "Register" },
];

const socials = [
  { label: "Instagram", href: site.social.instagram },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "YouTube", href: site.social.youtube },
  { label: "Facebook", href: site.social.facebook },
];

/**
 * Single-section footer, eleos.la style: statement + columns, then the giant
 * serif wordmark fully visible above a slim dark baseline bar.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const wordmarkY = useSpring(useTransform(scrollYProgress, [0, 1], [90, 0]), {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={ref} className="overflow-hidden border-t border-line bg-ivory">
      <Container className="pt-20 md:pt-28">
        {/* Statement row */}
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <h2 className="max-w-xl text-2xl font-medium uppercase leading-snug tracking-[0.04em] text-ink md:text-[2.1rem]">
              Good investments start with good conversations. Let&rsquo;s talk.
            </h2>
            <div className="mt-8">
              <ArrowLink href="/register">Reserve your seat</ArrowLink>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[13px] uppercase tracking-[0.14em] text-stone lg:items-end">
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-2.5 transition-colors hover:text-bronze"
            >
              <span className="h-1 w-1 rounded-full bg-bronze" aria-hidden="true" />
              {site.contact.email}
            </a>
            <a
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2.5 transition-colors hover:text-bronze"
            >
              <span className="h-1 w-1 rounded-full bg-bronze" aria-hidden="true" />
              {site.contact.phone}
            </a>
            <p className="flex items-center gap-2.5">
              <span className="h-1 w-1 rounded-full bg-bronze" aria-hidden="true" />
              {site.event.dateLabel}, {site.event.city}
            </p>
          </div>
        </div>

        {/* Columns row */}
        <div className="mt-20 grid gap-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4 md:mt-24">
          <nav aria-label="Footer">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone/70">Explore</p>
            <ul className="mt-5 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] uppercase tracking-[0.12em] text-ink/75 transition-colors hover:text-bronze"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone/70">Follow</p>
            <ul className="mt-5 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] uppercase tracking-[0.12em] text-ink/75 transition-colors hover:text-bronze"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone/70">Legal</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/privacy" className="text-[13px] uppercase tracking-[0.12em] text-ink/75 transition-colors hover:text-bronze">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[13px] uppercase tracking-[0.12em] text-ink/75 transition-colors hover:text-bronze">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-stone/70">Venue</p>
            <p className="mt-5 text-[13px] leading-relaxed text-ink/75">
              {site.event.city}
              <br />
              {site.event.venueNote}
            </p>
            <div className="mt-4 overflow-hidden border border-line">
              <iframe
                title={`Map of ${site.event.city}`}
                src="https://www.google.com/maps?q=Delhi+NCR&output=embed"
                className="h-32 w-full grayscale-[45%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Giant wordmark, fully visible, gentle rise as it enters */}
      <div className="mt-16 overflow-hidden md:mt-20" aria-hidden="true">
        <motion.div
          style={{ y: wordmarkY }}
          className="font-display flex select-none items-end justify-between px-3 -mb-[2vw] text-[14vw] font-normal leading-[0.75] text-ink will-change-transform md:px-6"
        >
          {"LUXOFY".split("").map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </motion.div>
      </div>

      {/* Baseline bar */}
      <div className="bg-ink py-4 text-cream/60">
        <Container className="flex flex-col items-start justify-between gap-2 text-[11px] uppercase tracking-[0.14em] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {site.organizer} x {site.partner}. All rights reserved.</p>
          <PoweredBy light />
          <button
            type="button"
            onClick={scrollToTop}
            className="transition-colors hover:text-bronze"
          >
            Back to top ↑
          </button>
        </Container>
      </div>
    </footer>
  );
}

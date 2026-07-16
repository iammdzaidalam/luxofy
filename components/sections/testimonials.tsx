"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/content";
import { site } from "@/lib/site";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal, EASE } from "@/components/motion";

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div className="flex gap-1" aria-label={`Rated ${count} out of 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-bronze" aria-hidden="true">
          <path d="M12 2l2.9 6.26L21.5 9.3l-4.75 4.4 1.15 6.8L12 17.3l-5.9 3.2 1.15-6.8L2.5 9.3l6.6-1.04L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  return (
    <section id="testimonials" className="bg-ink py-28 text-cream md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Client experience"
            title="What buyers say on Google"
            copy="Real reviews from real transactions, as published on luxofy.in."
            light
          />
        </Reveal>

        <Reveal className="mt-16">
          <div className="grid gap-px border border-line-dark bg-line-dark lg:grid-cols-[3fr_2fr]">
            {/* Quote panel */}
            <div className="relative flex min-h-[400px] flex-col justify-between overflow-hidden bg-ink p-9 md:p-14">
              <span className="font-serif pointer-events-none absolute -top-8 left-6 text-[12rem] leading-none text-bronze/15" aria-hidden="true">
                &ldquo;
              </span>
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="relative flex h-full flex-col justify-between"
                >
                  <blockquote className="font-serif text-xl font-light italic leading-snug text-cream/90 md:text-[1.55rem]">
                    {current.quote}
                  </blockquote>
                  <figcaption className="mt-10">
                    <Stars count={current.rating} />
                    <p className="mt-4 text-base font-semibold text-cream">{current.name}</p>
                    <p className="mt-1 text-[13px] text-cream/55">{current.detail}</p>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Google rating summary + controls */}
            <div className="flex flex-col justify-between bg-ink-soft p-9 md:p-14">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/50">
                  Verified Google reviews
                </p>
                <div className="mt-6">
                  <Stars count={5} size={26} />
                </div>
                <p className="font-display mt-6 text-5xl font-light text-cream">5.0</p>
                <p className="mt-3 max-w-[240px] text-[13px] leading-relaxed text-cream/60">
                  The reviews shown here are published on{" "}
                  <a
                    href={site.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream underline underline-offset-2 transition-colors hover:text-bronze"
                  >
                    luxofy.in
                  </a>{" "}
                  with the reviewer&rsquo;s name and date.
                </p>
              </div>

              <div className="mt-12 flex items-center justify-between">
                <div className="flex gap-2">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      aria-label={`Show review from ${t.name}`}
                      aria-current={i === index}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === index ? "w-10 bg-bronze" : "w-4 bg-cream/25 hover:bg-cream/50"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-bronze hover:text-bronze"
                  >
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M6 1L1 6L6 11M1 6H16" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={() => setIndex((index + 1) % testimonials.length)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-bronze hover:text-bronze"
                  >
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M10 1L15 6L10 11M15 6H0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

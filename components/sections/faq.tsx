"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-bronze"
      >
        <span className="font-serif text-xl font-medium leading-snug text-ink md:text-[1.4rem]">
          {q}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ${
            open ? "rotate-45 border-bronze text-bronze" : "border-line text-stone"
          }`}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 0V12M0 6H12" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-stone">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const midpoint = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, midpoint), faqs.slice(midpoint)];

  return (
    <section id="faq" className="bg-cream py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Questions"
            title="Everything investors usually ask"
            copy="If your question is not covered here, message us on WhatsApp and a member of the team will reply the same day."
          />
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid gap-x-16 lg:grid-cols-2">
            {columns.map((column, colIndex) => (
              <div key={colIndex} className={colIndex === 0 ? "border-t border-line" : "lg:border-t lg:border-line"}>
                {column.map((faq, i) => {
                  const index = colIndex === 0 ? i : midpoint + i;
                  return (
                    <FaqItem
                      key={faq.q}
                      q={faq.q}
                      a={faq.a}
                      open={open === index}
                      onToggle={() => setOpen(open === index ? null : index)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gallery } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal, EASE } from "@/components/motion";

const tags = ["All", "Villas", "Apartments"] as const;

export function Gallery() {
  const [active, setActive] = useState<(typeof tags)[number]>("All");
  const items = active === "All" ? gallery : gallery.filter((item) => item.tag === active);

  return (
    <section id="gallery" className="bg-ivory py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Gallery"
            title="A glimpse of what awaits"
            copy="Renders and on-site photography from the Luxofy portfolio presented at the showcase."
          />
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              aria-pressed={active === tag}
              className={`rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                active === tag
                  ? "bg-ink text-cream"
                  : "border border-line bg-transparent text-stone hover:border-bronze hover:text-bronze"
              }`}
            >
              {tag}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.figure
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group relative overflow-hidden break-inside-avoid"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={item.tall ? 1050 : 600}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                    item.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/85 to-transparent p-5 pt-10 text-[12px] font-medium tracking-wide text-cream transition-transform duration-500 group-hover:translate-y-0">
                  {item.alt}
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

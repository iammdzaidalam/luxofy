"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ctaBanner } from "@/lib/content";
import { ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/motion";

export function CtaBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [-70, 70]), {
    stiffness: 90,
    damping: 28,
    mass: 0.6,
  });

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-36 md:py-48">
      <motion.div style={{ y }} className="absolute -inset-y-[15%] inset-x-0 will-change-transform" aria-hidden="true">
        <Image
          src={ctaBanner.image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/70" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-cream/80">
            9 August 2026, Delhi NCR
          </p>
          <h2 className="font-display mt-6 text-5xl font-normal leading-[1.05] text-cream md:text-7xl">
            {ctaBanner.title}
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
            {ctaBanner.subtitle}
          </p>
          <div className="mt-11 flex justify-center">
            <ButtonLink href="/register" variant="bronze">
              Reserve your seat today
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

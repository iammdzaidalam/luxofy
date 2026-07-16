"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { heroContent } from "@/lib/content";
import { site } from "@/lib/site";
import { EASE } from "@/components/motion";
import Link from "next/link";

const spring = { stiffness: 90, damping: 28, mass: 0.6 };

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 160]), spring);
  const mediaScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.1]), spring);
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 220]), spring);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink">
      {/* Background video with poster fallback */}
      <motion.div style={{ y: mediaY, scale: mediaScale }} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroContent.poster}
          aria-hidden="true"
        >
          {heroContent.videoSources.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/65" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-24 pt-36 text-center will-change-transform"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          className="text-[10px] font-medium uppercase tracking-[0.4em] text-cream/80"
        >
          {heroContent.eyebrow} · {heroContent.badge}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
          className="font-display mt-7 text-[3.1rem] font-normal leading-[1.06] text-cream sm:text-6xl md:text-[4.6rem]"
        >
          Goa Luxury
          <br />
          Investor Showcase
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-cream/85 md:text-base"
        >
          {heroContent.subtitle}. {heroContent.date}, {heroContent.city}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
          className="mt-10"
        >
          <Link
            href="/register"
            className="pill inline-flex items-center gap-2.5 bg-cream/95 px-9 py-4 text-[12px] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:text-cream"
          >
            <span className="pill-fill bg-bronze" aria-hidden="true" />
            Reserve your seat
          </Link>
        </motion.div>

      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="h-10 w-px bg-gradient-to-b from-transparent via-cream/60 to-transparent"
        />
      </motion.div>

      <span className="sr-only">
        {site.name}, {site.event.dateLabel}, {site.event.city}
      </span>
    </section>
  );
}

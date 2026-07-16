"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";

/** Slide-up register bar that appears once the visitor scrolls past the hero. */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink/95 backdrop-blur-md md:hidden"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-3.5">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-cream">{site.event.dateLabel}, {site.event.city}</p>
              <p className="text-[11px] text-cream/55">Limited invites only</p>
            </div>
            <Link
              href="/register"
              className="shrink-0 rounded-full bg-bronze px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-cream"
            >
              Register
            </Link>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

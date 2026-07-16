"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const leftLinks = [
  { href: "/#why-goa", label: "Why Goa" },
  { href: "/#projects", label: "Projects" },
  { href: "/#agenda", label: "Agenda" },
  { href: "/#faq", label: "FAQ" },
];

const allLinks = [
  { href: "/#why-goa", label: "Why Goa" },
  { href: "/#projects", label: "Projects" },
  { href: "/#calculator", label: "Calculator" },
  { href: "/#agenda", label: "Agenda" },
  { href: "/#speakers", label: "Speakers" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/90 py-3.5 shadow-lg shadow-black/10 backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Left: links (desktop) / burger (mobile) */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-cream/75 transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-start justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-cream transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-cream transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>

        {/* Center: wordmark */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="absolute left-1/2 -translate-x-1/2 text-center"
        >
          <span className="font-display block text-[1.35rem] font-medium uppercase tracking-[0.32em] text-cream">
            Luxofy
          </span>
          <span className="mt-0.5 block text-[8px] font-medium uppercase tracking-[0.42em] text-cream/55">
            x Think Reality
          </span>
        </Link>

        {/* Right: CTA */}
        <Link
          href="/register"
          className="pill hidden sm:inline-flex items-center border border-cream/45 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-cream transition-colors duration-300 hover:text-ink"
        >
          <span className="pill-fill bg-cream" aria-hidden="true" />
          Register
        </Link>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 -z-10 flex h-dvh flex-col justify-center bg-ink px-8 lg:hidden"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              {allLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-2.5 text-4xl font-light text-cream/90 transition-colors hover:text-bronze"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

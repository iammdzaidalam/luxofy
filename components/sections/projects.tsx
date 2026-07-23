"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { catalog, projectCategories, type ProjectCategory, type CatalogItem } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal, Parallax, EASE } from "@/components/motion";

const bandImage = "/projects/azalea-1.jpg";

/** Full-bleed image band with oversized serif project names drifting across. */
function ProjectsBand() {
  const names = catalog.map((p) => p.name);
  return (
    <div className="relative overflow-hidden bg-ink py-24 md:py-32">
      <Parallax distance={70} className="absolute -inset-y-[16%] inset-x-0">
        <Image src={bandImage} alt="" fill sizes="100vw" className="object-cover opacity-50" />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/60" aria-hidden="true" />
      <div className="relative overflow-hidden" aria-hidden="true">
        <div
          className="flex w-max animate-marquee items-center gap-20 pr-20 motion-reduce:animate-none"
          style={{ animationDuration: "140s" }}
        >
          {[...names, ...names].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display whitespace-nowrap text-[11vw] font-light leading-none text-cream md:text-[5.5vw]"
            >
              {name}
              <span className="mx-8 align-middle text-[1.6vw] text-bronze md:mx-12">✦</span>
            </span>
          ))}
        </div>
      </div>
      <p className="relative mt-8 text-center text-[10px] font-medium uppercase tracking-[0.4em] text-cream/70">
        Thirteen projects across Goa, presented in depth on 9 August
      </p>
    </div>
  );
}

function ProjectCard({ item }: { item: CatalogItem }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-parchment">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {item.status ? (
          <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
            {item.status}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-bronze">{item.location}</p>
        <h3 className="font-display mt-2.5 text-[1.75rem] font-medium leading-tight text-ink">
          {item.name}
        </h3>
        <p className="mt-3 text-[13.5px] leading-relaxed text-stone">{item.blurb}</p>
        <dl className="mt-5 space-y-2 border-t border-line pt-4 text-[13px]">
          {item.price ? (
            <div className="flex justify-between gap-4">
              <dt className="text-stone/80">Price</dt>
              <dd className="text-right font-medium text-ink">{item.price}</dd>
            </div>
          ) : null}
          {item.config ? (
            <div className="flex justify-between gap-4">
              <dt className="text-stone/80">Configuration</dt>
              <dd className="text-right text-ink">{item.config}</dd>
            </div>
          ) : null}
          {!item.price && !item.config ? (
            <div className="flex justify-between gap-4">
              <dt className="text-stone/80">Commercials</dt>
              <dd className="text-right text-ink">At the showcase</dd>
            </div>
          ) : null}
        </dl>
        <Link
          href="/register"
          className="group/link mt-5 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:text-bronze"
        >
          Enquire at the showcase
          <svg width="14" height="10" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1">
            <path d="M10 1L15 6L10 11M15 6H0" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

const SLIDE_GAP = 40;

/**
 * Infinite carousel: the slides are rendered three times and the track is
 * translated with a controlled transform. Whenever a transition lands in an
 * outer copy, the index is silently normalised back into the middle copy
 * with a zero-duration hop, so paging works forever in both directions.
 * Dragging (touch or mouse) pages the same way.
 */
function InfiniteCarousel({ items }: { items: CatalogItem[] }) {
  const n = items.length;
  const tripled = [...items, ...items, ...items];
  const viewportRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(n);
  const [instant, setInstant] = useState(true);
  const [step, setStep] = useState(0);

  // Measure one slide (width + gap); re-measure on resize for responsiveness
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const measure = () => {
      const slide = viewport.querySelector<HTMLElement>("[data-slide]");
      if (slide) setStep(slide.offsetWidth + SLIDE_GAP);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [items]);

  // Re-enable animation one frame after an instant hop
  useEffect(() => {
    if (!instant) return;
    const frame = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(frame);
  }, [instant]);

  const normalize = () => {
    setPos((current) => {
      let next = current;
      while (next >= 2 * n) next -= n;
      while (next < n) next += n;
      if (next !== current) setInstant(true);
      return next;
    });
  };

  const page = (direction: 1 | -1) => setPos((current) => current + direction);

  // Swallow the click that follows a drag so card links do not fire
  const dragging = useRef(false);

  return (
    <div className="relative">
      <div
        ref={viewportRef}
        className="overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
        onClickCapture={(e) => {
          if (dragging.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          style={{ gap: SLIDE_GAP }}
          animate={{ x: -pos * step }}
          transition={instant || step === 0 ? { duration: 0 } : { duration: 0.65, ease: EASE }}
          onAnimationComplete={normalize}
          drag="x"
          dragMomentum={false}
          dragElastic={0.06}
          onDragStart={() => {
            dragging.current = true;
          }}
          onDragEnd={(_, info) => {
            window.setTimeout(() => {
              dragging.current = false;
            }, 80);
            if (info.offset.x < -60) page(1);
            else if (info.offset.x > 60) page(-1);
            else setPos((current) => current); // settle back
          }}
        >
          {tripled.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              data-slide
              className="w-[85%] shrink-0 sm:w-[calc((100%-40px)/2)] lg:w-[calc((100%-80px)/3)]"
              aria-hidden={i < n || i >= n * 2}
            >
              <ProjectCard item={item} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-9 flex justify-center gap-3">
        <button
          type="button"
          aria-label="Previous projects"
          onClick={() => page(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-bronze hover:bg-bronze hover:text-cream"
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M6 1L1 6L6 11M1 6H16" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next projects"
          onClick={() => page(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-bronze hover:bg-bronze hover:text-cream"
        >
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M10 1L15 6L10 11M15 6H0" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const [active, setActive] = useState<ProjectCategory>("Villas");
  const items = catalog.filter((p) => p.categories.includes(active));

  return (
    <section id="projects" className="bg-ivory">
      <ProjectsBand />

      <Container className="py-24 md:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="The portfolio"
            title="Every Luxofy project, in one room"
            copy="Browse our curated portfolio of villas and apartments across Goa."
            align="center"
          />
        </Reveal>

        {/* Category toggle */}
        <Reveal className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-line bg-cream p-1.5">
            {projectCategories.map((category) => {
              const count = catalog.filter((p) => p.categories.includes(category)).length;
              const selected = active === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={selected}
                  className={`rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 sm:px-7 ${
                    selected ? "bg-ink text-cream" : "text-stone hover:text-bronze"
                  }`}
                >
                  {category}
                  <span className={`ml-2 ${selected ? "text-cream/60" : "text-stone/50"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12">
          <InfiniteCarousel key={active} items={items} />
        </div>
      </Container>
    </section>
  );
}

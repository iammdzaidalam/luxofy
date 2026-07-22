"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Container, Eyebrow, SectionHeading, ButtonLink, ArrowLink } from "@/components/ui";
import { Reveal, Parallax } from "@/components/motion";
import { site } from "@/lib/site";

/* ------------------------------------------------------------------ hero */

export function ProjectHero({ project }: { project: Project }) {
  return (
    <header className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ink">
      <Parallax distance={80} className="absolute -inset-y-[12%] inset-x-0 -z-10">
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/35 to-ink/25"
        aria-hidden="true"
      />

      <Container className="pb-14 pt-40 md:pb-20">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-luxe text-cream/80">
            The Luxofy portfolio · {project.location}
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl font-light leading-[1.02] text-cream md:text-[5.2rem]">
            {project.name}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/75 md:text-base">
            {project.tagline}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/register" variant="bronze">
              See it at the showcase
            </ButtonLink>
            <ArrowLink href="/#projects" light>
              All projects
            </ArrowLink>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-cream/20 pt-8 md:grid-cols-4">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/55">
                  {fact.label}
                </dt>
                <dd className="font-display mt-2 text-xl font-normal leading-snug text-cream md:text-[1.45rem]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </header>
  );
}

/* -------------------------------------------------------------- overview */

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <section className="bg-ivory">
      <Container className="py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow={project.overview.eyebrow} title={project.overview.title} />
            <div className="mt-8 space-y-5">
              {project.overview.paragraphs.map((paragraph, i) => (
                <p key={i} className="max-w-xl text-[15px] leading-relaxed text-stone md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
            {project.developer ? (
              <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-stone/70">
                A project by {project.developer}
              </p>
            ) : null}
          </Reveal>

          <div className="grid content-start gap-px border border-line bg-line sm:grid-cols-2">
            {project.highlights.map((highlight, i) => (
              <Reveal key={highlight.title} delay={0.08 * i} className="h-full">
                <div className="flex h-full flex-col bg-cream p-7">
                  <span className="font-display text-[1.35rem] leading-none text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-5 text-[1.35rem] leading-tight text-ink">
                    {highlight.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-stone">{highlight.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------- units & pricing */

export function ProjectUnits({ project }: { project: Project }) {
  return (
    <section className="bg-parchment">
      <Container className="py-24 md:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="Residences & pricing"
            title="Choose your address"
            copy={project.unitNote}
          />
        </Reveal>

        <div className="mt-12 border-t border-ink/15">
          {project.units.map((unit, i) => (
            <Reveal key={`${unit.name}-${i}`} delay={0.05 * i}>
              <div
                className={`grid gap-2 border-b border-ink/15 py-6 sm:grid-cols-[1.2fr_1fr_1fr_auto] sm:items-baseline sm:gap-6 ${
                  unit.soldOut ? "opacity-45" : ""
                }`}
              >
                <h3 className="font-display text-[1.4rem] leading-tight text-ink">{unit.name}</h3>
                <p className="text-[13.5px] text-stone">{unit.saleable ?? ""}</p>
                <p className="text-[13.5px] text-stone">{unit.carpet ?? ""}</p>
                {unit.soldOut ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone sm:text-right">
                    Sold out
                  </p>
                ) : (
                  <p className="font-display text-[1.4rem] text-bronze-deep sm:text-right">
                    {unit.price ?? "At the showcase"}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-3">
          {project.possession ? (
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone">
              <span className="text-bronze">Possession</span> · {project.possession}
            </p>
          ) : null}
          {project.rera ? (
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-stone">
              <span className="text-bronze">RERA</span> · {project.rera}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------- amenities */

export function ProjectAmenities({ project }: { project: Project }) {
  return (
    <section className="bg-ivory">
      <Container className="py-24 md:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="Amenities & features"
            title="Everything the brochure promises"
            align="center"
          />
        </Reveal>
        <ul className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-5 sm:grid-cols-2">
          {project.amenities.map((amenity, i) => (
            <Reveal key={amenity} delay={0.03 * i}>
              <li className="flex items-start gap-3.5 border-b border-line pb-5">
                <span className="mt-[3px] text-[13px] leading-none text-bronze" aria-hidden="true">
                  ✦
                </span>
                <span className="text-[14.5px] leading-relaxed text-ink-soft">{amenity}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- gallery */

export function ProjectGallery({ project }: { project: Project }) {
  const images = project.gallery;
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <section className="relative overflow-hidden bg-ink">
        <Parallax distance={60} className="relative aspect-[16/9] max-h-[80svh] w-full md:aspect-[21/9]">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
      </section>
    );
  }

  return (
    <section className="bg-parchment">
      <Container className="py-24 md:py-32">
        <Reveal>
          <SectionHeading eyebrow="The gallery" title={`Inside ${project.name}`} />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, i) => (
            <Reveal
              key={image.src}
              delay={0.05 * (i % 3)}
              className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
            >
              <div
                className={`group relative overflow-hidden bg-ivory ${
                  i === 0 ? "aspect-[4/3] h-full min-h-full" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 640px) 90vw, 60vw" : "(max-width: 640px) 90vw, 30vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- location */

export function ProjectLocation({ project }: { project: Project }) {
  return (
    <section className="bg-ink">
      <Container className="py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <Reveal>
            <Eyebrow>The neighbourhood</Eyebrow>
            <h2 className="font-display mt-6 text-4xl font-normal leading-[1.08] text-cream md:text-[3.4rem]">
              {project.location}
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-cream/65 md:text-base">
              {project.locationCopy}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="border-t border-cream/15">
              {project.distances.map((distance) => (
                <div
                  key={distance.label}
                  className="flex items-baseline justify-between gap-6 border-b border-cream/15 py-5"
                >
                  <dt className="text-[14px] text-cream/70">{distance.label}</dt>
                  <dd className="font-display shrink-0 text-[1.3rem] text-cream">{distance.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------- cta */

export function ProjectCta({ project }: { project: Project }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <Parallax distance={70} className="absolute -inset-y-[14%] inset-x-0 -z-10">
        <Image
          src={project.hero.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-ink/55" aria-hidden="true" />

      <Container className="py-28 text-center md:py-36">
        <Reveal>
          <Eyebrow className="text-bronze">Private viewing & commercials</Eyebrow>
          <h2 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-light leading-[1.08] text-cream md:text-[3.6rem]">
            Meet {project.name} at the showcase
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-cream/70">
            {site.event.dateLabel} · {site.event.city}. Unit availability, payment plans and site
            visit slots for {project.name} — one room, one afternoon, invite only.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink href="/register" variant="bronze">
              Reserve your seat
            </ButtonLink>
            <ArrowLink href="/#projects" light>
              Explore more projects
            </ArrowLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------- mobile sticky register */

export function ProjectStickyCta({ project }: { project: Project }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5">
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-cream">{project.name}</p>
          <p className="text-[11px] text-cream/55">{project.priceLabel}</p>
        </div>
        <Link
          href="/register"
          className="shrink-0 rounded-full bg-bronze px-6 py-3 text-[12px] font-medium uppercase tracking-[0.14em] text-cream"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

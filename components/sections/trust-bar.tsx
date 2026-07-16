import { trustLogos, trustStats, trustIntro } from "@/lib/content";
import { Container } from "@/components/ui";
import { Counter, Reveal } from "@/components/motion";

export function TrustBar() {
  return (
    <section className="bg-cream">
      {/* Centered introduction, Damai style */}
      <Container className="pt-20 md:pt-24">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-[14px] leading-relaxed text-stone md:text-[15px]">{trustIntro}</p>
        </Reveal>
      </Container>

      {/* Animated stats */}
      <Container className="py-16 md:py-20">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {trustStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="text-center">
                <dd className="font-display text-5xl font-light text-ink md:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-stone">
                  {stat.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>

      {/* Partner wordmarks */}
      <div className="overflow-hidden border-t border-line py-7" aria-label="Partners and media">
        <div className="flex w-max animate-marquee items-center gap-16 pr-16 motion-reduce:animate-none">
          {[...trustLogos, ...trustLogos, ...trustLogos, ...trustLogos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display whitespace-nowrap text-lg font-medium italic tracking-wide text-stone/60"
              aria-hidden={i >= trustLogos.length}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import { whyGoa } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui";
import { Counter, Reveal } from "@/components/motion";

export function WhyGoa() {
  return (
    <section id="why-goa" className="bg-ink py-28 text-cream md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Goa"
            title="The case for Goa, in numbers"
            copy={whyGoa.intro}
            light
          />
        </Reveal>

        {/* Headline stats */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-y border-line-dark py-12 lg:grid-cols-4">
          {whyGoa.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div>
                <dd className="font-display text-5xl font-light text-bronze md:text-6xl md:leading-none">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-4 max-w-[220px] text-[13px] leading-relaxed text-cream/60">
                  {stat.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>

        {/* Growth drivers */}
        <div className="mt-20 grid gap-x-14 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {whyGoa.drivers.map((driver, i) => (
            <Reveal key={driver.title} delay={(i % 3) * 0.1}>
              <article className="group border-t border-line-dark pt-7 transition-colors duration-500 hover:border-bronze">
                <h3 className="font-serif text-[1.6rem] font-medium text-cream transition-colors duration-500 group-hover:text-bronze">
                  {driver.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-cream/60">{driver.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Market comparison */}
        <Reveal className="mt-24">
          <div className="border border-line-dark">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="border-b border-line-dark px-8 py-6 text-left">
                  <span className="font-serif text-2xl font-medium text-cream">
                    How Goa compares
                  </span>
                  <span className="mt-1 block text-[13px] text-cream/50">
                    {whyGoa.comparison.caption}
                  </span>
                </caption>
                <thead>
                  <tr className="border-b border-line-dark text-[11px] uppercase tracking-[0.18em] text-cream/50">
                    <th scope="col" className="px-8 py-5 font-semibold">Market</th>
                    <th scope="col" className="px-8 py-5 font-semibold">Capital appreciation</th>
                    <th scope="col" className="px-8 py-5 font-semibold">Rental yield</th>
                    <th scope="col" className="px-8 py-5 font-semibold">Exit liquidity</th>
                  </tr>
                </thead>
                <tbody>
                  {whyGoa.comparison.rows.map((row, i) => (
                    <tr
                      key={row.market}
                      className={`border-b border-line-dark last:border-b-0 ${
                        i === 0 ? "bg-bronze/10" : ""
                      }`}
                    >
                      <th scope="row" className="px-8 py-5 font-medium text-cream">
                        {row.market}
                        {i === 0 ? (
                          <span className="ml-3 rounded-full border border-bronze/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bronze">
                            Featured
                          </span>
                        ) : null}
                      </th>
                      <td className="px-8 py-5 text-cream/70">{row.appreciation}</td>
                      <td className="px-8 py-5 text-cream/70">{row.yield}</td>
                      <td className="px-8 py-5 text-cream/70">{row.exit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-cream/40">
            Indicative ranges based on published market research and managed portfolio data, 2020 to 2025.
            Past performance does not guarantee future returns.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

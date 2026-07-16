import { agenda } from "@/lib/content";
import { site } from "@/lib/site";
import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/motion";

export function Agenda() {
  return (
    <section id="agenda" className="bg-ivory py-28 md:py-36">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[2fr_3fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <SectionHeading
                eyebrow="Event agenda"
                title="The flow of the day"
                copy={`${site.event.dateLabel}, ${site.event.city}. Detailed timings and the venue are shared with confirmed guests.`}
              />
              <div className="mt-10">
                <ButtonLink href="/register" variant="outline">
                  Reserve your seat
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <ol className="relative border-l border-line pl-10 md:pl-14">
            {agenda.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <li className="relative pb-14 last:pb-0">
                  <span
                    className="absolute -left-10 top-3 h-[9px] w-[9px] -translate-x-1/2 rounded-full border-2 border-bronze bg-ivory md:-left-14"
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline gap-5">
                    <span className="font-serif text-base italic text-bronze">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-[1.6rem] font-medium text-ink">{item}</h3>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

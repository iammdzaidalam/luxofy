import Image from "next/image";
import { speakers } from "@/lib/content";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";

export function Speakers() {
  return (
    <section id="speakers" className="bg-cream py-28 md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Speakers"
            title="Meet the Speakers"
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-x-10 gap-y-14 sm:grid-cols-3">
          {speakers.map((speaker, i) => (
            <Reveal key={speaker.name} delay={i * 0.1}>
              <figure className="group text-center">
                <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-full bg-parchment sm:w-64">
                  <Image
                    src={speaker.image}
                    alt={`Portrait of ${speaker.name}`}
                    fill
                    sizes="256px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-7">
                  <h3 className="font-serif text-[1.7rem] font-medium text-ink">{speaker.name}</h3>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-bronze">
                    {speaker.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

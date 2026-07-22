import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { MapPin, Umbrella, Plane, Building2 } from "lucide-react";

export function WhyGoa() {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-bronze" strokeWidth={1.5} />,
      title: "Heart of Goa",
      text: "Live at the center\nof everything\nyou love.",
    },
    {
      icon: <Umbrella className="h-8 w-8 text-bronze" strokeWidth={1.5} />,
      title: "Close to all famous beaches",
      text: "Calangute\nCandolim\nVagator\nArambol",
    },
    {
      icon: <Plane className="h-8 w-8 text-bronze" strokeWidth={1.5} />,
      title: "Close to Mopa airport",
      text: "Easy connections.\nEndless\npossibilities.",
    },
    {
      icon: <Building2 className="h-8 w-8 text-bronze" strokeWidth={1.5} />,
      title: "Apartment or villa",
      text: "Whether you seek\nelegance, comfort\nor space, you'll\nfind everything.",
    },
  ];

  return (
    <section id="why-goa" className="bg-ink py-28 text-cream md:py-36">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Location"
            title="The Heart of Goa"
            copy="Where every lifestyle finds its perfect address."
            light
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-5xl gap-y-10 divide-y divide-line-dark md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-y-0">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.1}>
              <div className="flex flex-col items-center px-4 pt-10 text-center md:px-8 md:pt-0">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-bronze/10">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-[14px] font-medium uppercase tracking-[0.15em] text-cream">
                  {feature.title}
                </h3>
                <div className="mt-5 text-[15px] font-light leading-relaxed text-cream/70 whitespace-pre-line">
                  {feature.text}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

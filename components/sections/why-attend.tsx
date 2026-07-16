import Image from "next/image";
import { whyAttend, introCollage } from "@/lib/content";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal, Parallax } from "@/components/motion";

/**
 * Editorial collage: small offset images either side of a centered serif
 * statement, then an airy two-column list of reasons to attend.
 */
export function WhyAttend() {
  const [leftTop, leftLow, rightTop, rightLow] = introCollage;

  return (
    <section id="why-attend" className="overflow-hidden bg-ivory py-28 md:py-40">
      <Container className="relative">
        {/* Scattered images, hidden on small screens where they would crowd the text */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <Parallax distance={26} className="absolute left-0 top-6 w-[190px]">
            <Image src={leftTop.src} alt="" width={380} height={480} className="aspect-[4/5] w-full object-cover" />
          </Parallax>
          <Parallax distance={44} className="absolute bottom-96 left-2 w-[150px]">
            <Image src={leftLow.src} alt="" width={300} height={380} className="aspect-[3/4] w-full object-cover" />
          </Parallax>
          <Parallax distance={34} className="absolute right-0 top-16 w-[220px]">
            <Image src={rightTop.src} alt="" width={440} height={330} className="aspect-[4/3] w-full object-cover" />
          </Parallax>
          <Parallax distance={50} className="absolute bottom-80 right-2 w-[150px]">
            <Image src={rightLow.src} alt="" width={300} height={380} className="aspect-[3/4] w-full object-cover" />
          </Parallax>
        </div>

        {/* Centered statement */}
        <Reveal className="relative mx-auto max-w-xl py-6 text-center lg:py-24">
          <Eyebrow>Why attend</Eyebrow>
          <h2 className="font-display mt-6 text-4xl font-normal leading-[1.1] text-ink md:text-[3.4rem]">
            One afternoon,
            <br />
            total clarity
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-stone">
            This is not a sales seminar. It is a working session built around research, real
            numbers and unhurried conversations with the people behind the projects.
          </p>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="/register" variant="outline">
              Reserve your seat
            </ButtonLink>
          </div>
        </Reveal>

        {/* Reasons: airy list, thin rules, no boxes */}
        <div className="relative mx-auto mt-20 grid max-w-4xl gap-x-16 gap-y-10 sm:grid-cols-2 lg:mt-28">
          {whyAttend.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.08}>
              <article className="border-t border-line pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-sm italic text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-ink">{item.title}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-stone">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

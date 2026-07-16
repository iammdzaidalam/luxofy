import { LenisProvider } from "@/components/lenis-provider";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { WhyAttend } from "@/components/sections/why-attend";
import { WhyGoa } from "@/components/sections/why-goa";
import { FeaturedProjects } from "@/components/sections/projects";
import { InvestmentCalculator } from "@/components/sections/calculator";
import { Agenda } from "@/components/sections/agenda";
import { Speakers } from "@/components/sections/speakers";
import { Testimonials } from "@/components/sections/testimonials";
import { Gallery } from "@/components/sections/gallery";
import { Faq } from "@/components/sections/faq";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Footer } from "@/components/sections/footer";
import { StickyCta } from "@/components/sections/sticky-cta";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

function StructuredData() {
  const event = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: site.name,
    startDate: site.event.startIso,
    endDate: site.event.endIso,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: site.event.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.event.city,
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: site.organizer,
      url: site.url,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/LimitedAvailability",
      url: `${site.url}/register`,
    },
    description:
      "An invite-only investor showcase covering premium villa and apartment investments in Goa, hosted by Think Reality and Luxofy Properties.",
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.partner,
    url: site.url,
    sameAs: Object.values(site.social),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      contactType: "sales",
      areaServed: "IN",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.partner,
    areaServed: "Goa, India",
    telephone: site.contact.phone,
    email: site.contact.email,
    url: site.contact.website,
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      {[event, organization, localBusiness, faqPage].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function HomePage() {
  return (
    <LenisProvider>
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <WhyAttend />
        <WhyGoa />
        <FeaturedProjects />
        <InvestmentCalculator />
        <Agenda />
        <Speakers />
        <Testimonials />
        <Gallery />
        <Faq />
        <CtaBanner />
      </main>
      <Footer />
      <StickyCta />
    </LenisProvider>
  );
}

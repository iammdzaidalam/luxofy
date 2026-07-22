import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LenisProvider } from "@/components/lenis-provider";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import {
  ProjectHero,
  ProjectOverview,
  ProjectUnits,
  ProjectAmenities,
  ProjectGallery,
  ProjectLocation,
  ProjectCta,
} from "@/components/project/sections";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.name} | ${project.location}`;
  return {
    title,
    description: project.metaDescription,
    alternates: { canonical: `${site.url}/projects/${project.slug}` },
    openGraph: {
      type: "website",
      url: `${site.url}/projects/${project.slug}`,
      siteName: site.name,
      title,
      description: project.metaDescription,
      images: [{ url: `${site.url}${project.hero.src}`, alt: project.hero.alt }],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.metaDescription,
    },
  };
}

function StructuredData({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) return null;

  const listing = {
    "@context": "https://schema.org",
    "@type": project.category === "Villas" ? "SingleFamilyResidence" : "ApartmentComplex",
    name: project.name,
    description: project.metaDescription,
    url: `${site.url}/projects/${project.slug}`,
    image: `${site.url}${project.hero.src}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: project.location,
      addressRegion: "Goa",
      addressCountry: "IN",
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/#projects` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${site.url}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <>
      {[listing, breadcrumbs].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <LenisProvider>
      <StructuredData slug={slug} />
      <Navbar />
      <main>
        <ProjectHero project={project} />
        <ProjectOverview project={project} />
        <ProjectUnits project={project} />
        <ProjectGallery project={project} />
        <ProjectAmenities project={project} />
        <ProjectLocation project={project} />
        <ProjectCta project={project} />
      </main>
      <Footer />
    </LenisProvider>
  );
}

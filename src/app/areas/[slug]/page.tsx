import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaLandingPage } from "@/components/site/AreaLandingPage";
import { PageShell } from "@/components/site/PageShell";
import { getServiceArea, serviceAreas } from "@/content/growth-system";
import { siteConfig } from "@/content/site";

interface AreaPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceArea(slug);

  if (!area) {
    return {};
  }

  return {
    title: `AI Automation for ${area.label}, TX Service Businesses | Bartlett Labs`,
    description: area.summary,
    alternates: {
      canonical: `/areas/${area.slug}`,
    },
    openGraph: {
      title: `AI Automation for ${area.label}, TX Service Businesses | Bartlett Labs`,
      description: area.summary,
      url: `${siteConfig.domain}/areas/${area.slug}`,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
  };
}

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;
  const area = getServiceArea(slug);

  if (!area) {
    notFound();
  }

  const areaJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} - ${area.label}`,
    url: `${siteConfig.domain}/areas/${area.slug}`,
    telephone: siteConfig.phone.display,
    areaServed: {
      "@type": "City",
      name: area.label,
      containedInPlace: area.county,
    },
    description: area.summary,
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaJsonLd) }}
      />
      <AreaLandingPage area={area} />
    </PageShell>
  );
}

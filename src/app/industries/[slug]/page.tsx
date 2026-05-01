import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryLandingPage } from "@/components/site/IndustryLandingPage";
import { PageShell } from "@/components/site/PageShell";
import { getIndustry, industries } from "@/content/growth-system";
import { siteConfig } from "@/content/site";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return {};
  }

  return {
    title: `${industry.label} AI Growth System | Bartlett Labs`,
    description: industry.summary,
    alternates: {
      canonical: `/industries/${industry.slug}`,
    },
    openGraph: {
      title: `${industry.label} AI Growth System | Bartlett Labs`,
      description: industry.summary,
      url: `${siteConfig.domain}/industries/${industry.slug}`,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.label} AI Growth System`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      areaServed: "Houston, TX",
      telephone: siteConfig.phone.display,
      url: siteConfig.domain,
    },
    serviceType: `${industry.label} lead capture, CRM, follow-up, and review automation`,
    description: industry.summary,
    url: `${siteConfig.domain}/industries/${industry.slug}`,
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <IndustryLandingPage industry={industry} />
    </PageShell>
  );
}

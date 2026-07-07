import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { siteConfig } from "@/content/site";
import { CrosbyAiLanding } from "./CrosbyAiLanding";

const TITLE = "AI Automation Built for Crosby, TX Businesses | Bartlett Labs";
const DESCRIPTION =
  "Stop letting missed calls go to your competitors. Capture, engage, and book local Crosby, TX clients 24/7 with the AI Missed Leads Assistant. Claim your free Crosby AI Opportunity Audit.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/crosby-ai" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.domain}/crosby-ai`,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
};

export default function CrosbyAiPage() {
  const LOGO =
    "https://zjxnv7e5voftnnlw.public.blob.vercel-storage.com/organizations/sCunPBX2g6TTuDb08rpSlUvXy4OuJ3zl/brand/logos/8e3a105e-9504-48b3-b7f4-23ef1f041f23.jpeg";

  // Local-authority structured data for AI search + Google (ProfessionalService).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: `${siteConfig.domain}/crosby-ai`,
    logo: LOGO,
    image: LOGO,
    telephone: siteConfig.phone.display,
    email: siteConfig.email,
    description:
      "Providing local Crosby service businesses with AI-powered lead capture systems and the AI Missed Leads Assistant to instantly text-back missed calls.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Houston",
      addressRegion: "TX",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Crosby" },
      { "@type": "AdministrativeArea", name: "Atascocita" },
      { "@type": "AdministrativeArea", name: "Houston" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Automation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Missed Leads Assistant",
            description:
              "Handles missed-call text-back, web chat, lead forms, Google review automation, and pipeline management for local service businesses.",
          },
        },
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          itemOffered: {
            "@type": "Service",
            name: "Free Crosby AI Opportunity Audit",
            description:
              "A free audit for Crosby, TX businesses showing exactly where their lead leaks are and how to patch them.",
          },
        },
      ],
    },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CrosbyAiLanding />
    </PageShell>
  );
}

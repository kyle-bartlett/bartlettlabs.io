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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} — Crosby, TX`,
    url: `${siteConfig.domain}/crosby-ai`,
    telephone: siteConfig.phone.display,
    email: siteConfig.email,
    areaServed: {
      "@type": "City",
      name: "Crosby",
      containedInPlace: "Harris County, TX",
    },
    description: DESCRIPTION,
    makesOffer: {
      "@type": "Offer",
      name: "Free Crosby AI Opportunity Audit",
      description:
        "A free audit for Crosby, TX businesses showing exactly where their lead leaks are and how to patch them.",
      price: "0",
      priceCurrency: "USD",
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

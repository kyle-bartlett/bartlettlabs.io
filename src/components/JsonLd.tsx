import { homepageFaqs } from "@/content/faqs";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

const organizationId = `${siteConfig.domain}/#organization`;
const founderId = `${siteConfig.domain}/#founder`;
const businessId = `${siteConfig.domain}/#business`;
const websiteId = `${siteConfig.domain}/#website`;

const serviceGraph = services.map((service) => ({
  "@type": "Service",
  "@id": `${siteConfig.domain}/#service-${service.id}`,
  name: service.title,
  description: service.summary,
  provider: { "@id": businessId },
  areaServed: "Houston, TX",
  url: `${siteConfig.domain}/services#${service.id}`,
  offers:
    service.priceRange === "Contact for quote"
      ? undefined
      : {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "USD",
            description: service.priceRange,
          },
        },
}));

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.domain,
      founder: { "@id": founderId },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.email,
          telephone: siteConfig.phone.raw,
          areaServed: "US",
          availableLanguage: "English",
        },
      ],
      sameAs: [siteConfig.social.linkedin],
      description:
        "Bartlett Labs is a founder-led studio building missed-call recovery, AI follow-up, scheduling, CRM, and review automation for Houston-area service businesses.",
    },
    {
      "@type": "Person",
      "@id": founderId,
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.title,
      url: `${siteConfig.domain}/about`,
      worksFor: { "@id": organizationId },
      alumniOf: [{ "@type": "CollegeOrUniversity", name: "Purdue University" }],
      sameAs: [siteConfig.social.linkedin],
      description:
        "Kyle Bartlett is a Purdue-trained engineer with 13 years across Sears, Belk, Apple, and Anker, with 300+ automations built across operations, planning, and workflow systems.",
      knowsAbout: [
        "Missed-Call Recovery",
        "AI Voice Intake",
        "CRM Automation",
        "Review Automation",
        "Operations Systems",
        "Demand Planning",
        "Process Improvement",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: siteConfig.name,
      url: siteConfig.domain,
      email: siteConfig.email,
      telephone: siteConfig.phone.raw,
      founder: { "@id": founderId },
      parentOrganization: { "@id": organizationId },
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressRegion: siteConfig.state,
        addressCountry: "US",
      },
      areaServed: "Houston, TX",
      description:
        "Founder-led lead capture, follow-up, scheduling, CRM, and review automation for service businesses in Crosby, Houston, and the surrounding area.",
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.domain,
      name: siteConfig.name,
      publisher: { "@id": organizationId },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.domain}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.domain}/#faq`,
      mainEntity: homepageFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    ...serviceGraph,
  ],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
    />
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demo Sites | Bartlett Labs | AI Automation & Web Design | Houston, TX",
  description:
    "Browse live demo websites built by Bartlett Labs for Houston-area businesses. Auto repair, electric, landscaping, fitness, grooming, and more. See what a custom website could look like for your business. Sites from $2,500.",
  alternates: {
    canonical: "/demos",
  },
  openGraph: {
    title: "Live Demo Sites | Bartlett Labs | Houston TX",
    description:
      "See live demo websites built for real Houston-area businesses. Auto repair, electric, landscaping, and more. Custom sites from $2,500.",
    url: "https://bartlettlabs.io/demos",
    siteName: "Bartlett Labs",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bartlett Labs - Live Demo Sites for Houston Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Bartlett_Labs",
    creator: "@Bartlett_Labs",
    title: "Live Demo Sites | Bartlett Labs",
    description:
      "Browse live demo websites built for Houston-area businesses. See what we can build for you.",
    images: ["/og-image.png"],
  },
};

/* ── Structured data for demos page ── */
const demosStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://bartlettlabs.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Demos",
        item: "https://bartlettlabs.io/demos",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Live Demo Sites by Bartlett Labs",
    description:
      "A showcase of live demo websites built by Bartlett Labs for Houston-area small businesses across multiple industries including auto repair, electrical, landscaping, fitness, and grooming.",
    url: "https://bartlettlabs.io/demos",
    mainEntity: {
      "@type": "ItemList",
      name: "Demo Websites",
      description: "Live demo websites built for real Houston-area businesses",
      numberOfItems: 14,
      itemListOrder: "https://schema.org/ItemListUnordered",
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://bartlettlabs.io/#website",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are demo sites and why does Bartlett Labs build them?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Demo sites are fully designed, working websites that we build for local businesses before we ever reach out. They show exactly what a professional website could look like for your specific business, with your real services, location, and branding. You can see the quality of our work before spending anything.",
        },
      },
      {
        "@type": "Question",
        name: "Are these demo sites free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the demo itself is completely free. We build it using public information about your business to show what is possible. If you like what you see and want to move forward with a custom version, standard websites start at $2,500. There is zero obligation to buy.",
        },
      },
      {
        "@type": "Question",
        name: "Can I request a demo site for my business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Contact us at kyle@bartlettlabs.io or call (832) 630-4317 and we will build a demo site for your business at no cost. We typically deliver demos within 3 to 5 business days.",
        },
      },
      {
        "@type": "Question",
        name: "What industries has Bartlett Labs built demo sites for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We have built demo sites for auto repair shops, electrical contractors, landscaping companies, fitness studios, pet grooming businesses, game rooms, ceramic tile installers, barber shops, and more across the Houston, Crosby, Baytown, and Highlands areas.",
        },
      },
    ],
  },
];

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {demosStructuredData.map((schema, i) => (
        <script
          key={`demos-sd-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}

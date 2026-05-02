import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { FinalCallout } from "@/components/site/FinalCallout";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";
import { ServiceDetailCard } from "@/components/site/ServiceDetailCard";

export const metadata: Metadata = {
  title: "Services | Bartlett Labs",
  description:
    "Website design, AI chatbots, workflow automation, and consulting for Houston-area businesses that need useful systems and clearer operations.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <main>
        <section className="section-spacing">
          <div className="container-bl">
            <SectionIntro
              eyebrow="Services & Pricing"
              title="Four real offers. Fixed-scope builds. No surprise layers."
              description="Every project starts with a clear scope, practical deliverables, and 30 days of post-launch support. No hourly billing. No bloated retainers. Just the work that actually needs to get built."
            />
          </div>
        </section>

        <section className="section-tight">
          <div className="container-bl grid gap-8">
            {services.map((service) => (
              <ServiceDetailCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        <FinalCallout
          eyebrow="Need a Quote?"
          title="Start with the next useful system, not a giant digital overhaul."
          description="If you already know what is broken, we can talk through the right project. If you do not know whether this is a website problem, an automation problem, or both, that is exactly what the first call is for."
          primaryHref={siteConfig.booking.path}
          primaryLabel="Book a Strategy Call"
          secondaryHref="/contact"
          secondaryLabel="Contact Bartlett Labs"
        />

        <section className="section-tight">
          <div className="container-bl pb-12">
            <div className="site-panel px-6 py-5 text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
              Every project includes 30 days of post-launch support. If you need
              help figuring out which service actually fits your business, start
              with a call or send a note through the contact page.
              {" "}
              <Link href="/contact" style={{ color: "var(--color-burnt-orange)" }}>
                Contact Bartlett Labs
              </Link>
              .
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

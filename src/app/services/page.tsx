import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { FinalCallout } from "@/components/site/FinalCallout";
import { PageShell } from "@/components/site/PageShell";
import { SectionIntro } from "@/components/site/SectionIntro";

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
              <article
                key={service.id}
                id={service.id}
                className="card-warm overflow-hidden px-7 py-8 md:px-9 md:py-10"
              >
                <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
                  <div>
                    <span className="proof-badge">{service.priceRange}</span>
                    <h2
                      className="mt-5 text-4xl leading-tight md:text-5xl"
                      style={{
                        color: "var(--color-text-heading)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {service.title}
                    </h2>
                    <p
                      className="mt-5 text-lg leading-8"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {service.summary}
                    </p>
                    <p
                      className="mt-5 text-sm uppercase tracking-[0.16em]"
                      style={{
                        color: "var(--color-text-light)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {service.timeline}
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="site-panel p-5">
                      <h3 className="eyebrow">Who it&apos;s for</h3>
                      <ul className="mt-4 grid gap-3">
                        {service.whoItsFor.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm leading-6"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-2 w-2 rounded-full"
                              style={{ backgroundColor: "var(--color-cyan-dark)" }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="site-panel p-5">
                      <h3 className="eyebrow">What you provide</h3>
                      <ul className="mt-4 grid gap-3">
                        {service.whatYouProvide.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm leading-6"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-2 w-2 rounded-full"
                              style={{ backgroundColor: "var(--color-cyan-dark)" }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="site-panel p-5 md:col-span-2">
                      <h3 className="eyebrow">What I deliver</h3>
                      <ul className="mt-4 grid gap-3">
                        {service.whatIDeliver.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm leading-6"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 h-2 w-2 rounded-full"
                              style={{ backgroundColor: "var(--color-burnt-orange)" }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
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

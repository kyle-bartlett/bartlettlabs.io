import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Navigation } from "lucide-react";
import type { ServiceAreaProfile } from "@/content/growth-system";
import { industries, systemEngines } from "@/content/growth-system";
import { siteConfig } from "@/content/site";

function industryHref(label: string) {
  const match = industries.find((industry) => industry.label === label);
  return match ? `/industries/${match.slug}` : "/services";
}

export function AreaLandingPage({ area }: { area: ServiceAreaProfile }) {
  return (
    <main className="growth-page growth-subpage">
      <section className="growth-subhero">
        <div className="growth-container growth-subhero-layout">
          <div>
            <span className="growth-kicker">AI growth system in {area.label}, TX</span>
            <h1>{area.headline}</h1>
            <p>{area.summary}</p>
            <div className="growth-actions">
              <Link href={siteConfig.booking.path} className="growth-btn growth-btn-primary">
                Audit {area.label} leads
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link href="/#pricing" className="growth-btn growth-btn-ghost">
                View pricing
              </Link>
            </div>
          </div>
          <div className="growth-subhero-card">
            <span>Local profile</span>
            <dl>
              <div>
                <dt>Primary county</dt>
                <dd>{area.county}</dd>
              </div>
              {area.marketSignals.map((signal) => (
                <div key={signal.label}>
                  <dt>{signal.label}</dt>
                  <dd>{signal.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="growth-section growth-section-light" aria-labelledby="area-market">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">Market profile</span>
            <h2 id="area-market">What matters for {area.label} service businesses.</h2>
            <p>
              These are practical market signals for shaping page copy, routing,
              follow-up, and the first automation build.
            </p>
          </div>
          <div className="growth-card-grid growth-card-grid-three">
            {area.marketSignals.map((signal) => (
              <article key={signal.label} className="growth-card">
                <Navigation aria-hidden="true" size={24} />
                <span>{signal.label}</span>
                <h3>{signal.value}</h3>
                <p>{signal.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-section growth-system-section" aria-labelledby="area-system">
        <div className="growth-container growth-system-layout">
          <div>
            <span className="growth-eyebrow">The local system</span>
            <h2 id="area-system">Three engines for the way {area.label} customers search and book.</h2>
            <p>
              The system connects the first touch to the follow-up, the calendar, and
              the review request so local intent does not leak out of the business.
            </p>
            <div className="growth-map-card growth-map-card-dark">
              <MapPin aria-hidden="true" size={22} />
              <div>
                <strong>{area.label}, {area.county}</strong>
                <span>{area.neighborhoods.slice(0, 4).join(" · ")}</span>
              </div>
            </div>
          </div>
          <div className="growth-engine-stack">
            {systemEngines.map((engine) => {
              const Icon = engine.icon;
              return (
                <article key={engine.title} className="growth-engine-card">
                  <Icon aria-hidden="true" size={25} />
                  <div>
                    <span>{engine.kicker}</span>
                    <h3>{engine.title}</h3>
                    <p>{engine.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="growth-section growth-section-light" aria-labelledby="area-industries">
        <div className="growth-container growth-area-layout">
          <div>
            <span className="growth-eyebrow">Best-fit industries</span>
            <h2 id="area-industries">Start where {area.label} demand is easiest to prove.</h2>
            <p>
              These industry pages are the first SEO and sales entry points I would
              prioritize for this area.
            </p>
          </div>
          <div className="growth-area-list">
            {area.industries.map((industry) => (
              <Link key={industry} href={industryHref(industry)}>
                {industry}
                <ArrowRight aria-hidden="true" size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-section growth-neighborhood-section" aria-labelledby="area-neighborhoods">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">Neighborhood targeting</span>
            <h2 id="area-neighborhoods">Useful local signals for {area.label} pages and campaigns.</h2>
          </div>
          <div className="growth-keyword-cloud growth-keyword-cloud-large">
            {area.neighborhoods.map((neighborhood) => (
              <span key={neighborhood}>{neighborhood}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-section growth-faq-section" aria-labelledby="area-checklist">
        <div className="growth-container growth-faq-layout">
          <div>
            <span className="growth-eyebrow">Launch checklist</span>
            <h2 id="area-checklist">The first {area.label} build should prove these basics.</h2>
          </div>
          <div className="growth-faq-list">
            {[
              "Every call, form, and chat lands in one pipeline.",
              "Hot leads trigger an owner alert instead of waiting in voicemail.",
              "Quotes get plain-English follow-up until they book or decline.",
              "Happy customers receive review requests after the job closes.",
            ].map((item) => (
              <article key={item}>
                <h3>
                  <CheckCircle2 aria-hidden="true" size={18} />
                  {item}
                </h3>
                <p>
                  This is the kind of simple operating discipline that makes a small
                  service business look responsive without adding a full-time admin.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-final-cta growth-final-cta-compact" aria-labelledby="area-cta">
        <div className="growth-container">
          <h2 id="area-cta">Want the {area.label} version of the system mapped out?</h2>
          <p>
            Book the audit and we will sketch the highest-value lead leak for this
            service area.
          </p>
          <Link href={siteConfig.booking.path} className="growth-btn growth-btn-primary">
            Request a 15-Min Audit
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

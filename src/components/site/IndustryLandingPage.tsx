import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, PhoneCall } from "lucide-react";
import type { IndustryProfile } from "@/content/growth-system";
import { serviceAreas, systemEngines } from "@/content/growth-system";
import { siteConfig } from "@/content/site";

export function IndustryLandingPage({ industry }: { industry: IndustryProfile }) {
  const featuredAreas = serviceAreas.slice(0, 9);

  return (
    <main className="growth-page growth-subpage">
      <section className="growth-subhero">
        <div className="growth-container growth-subhero-layout">
          <div>
            <span className="growth-kicker">{industry.eyebrow}</span>
            <h1>{industry.headline}</h1>
            <p>{industry.summary}</p>
            <div className="growth-actions">
              <Link href={siteConfig.booking.path} className="growth-btn growth-btn-primary">
                Audit this funnel
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link href="/#demos" className="growth-btn growth-btn-ghost">
                See demo slots
              </Link>
            </div>
          </div>
          <div className="growth-subhero-card">
            <span>Industry profile</span>
            <dl>
              <div>
                <dt>Missed-lead risk</dt>
                <dd>{industry.missedRevenue}</dd>
              </div>
              <div>
                <dt>Typical job value</dt>
                <dd>{industry.leadValue}</dd>
              </div>
              <div>
                <dt>Urgency pattern</dt>
                <dd>{industry.urgency}</dd>
              </div>
              <div>
                <dt>Review pressure</dt>
                <dd>{industry.reviewNeed}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="growth-section growth-section-light" aria-labelledby="industry-leaks">
        <div className="growth-container growth-system-layout">
          <div>
            <span className="growth-eyebrow">Where the money leaks</span>
            <h2 id="industry-leaks">The system is trained around how {industry.label} customers actually ask for help.</h2>
            <p>
              A generic chatbot does not know the difference between a shopping
              question and an emergency. This page gives the system the right
              language, routing, and follow-up for {industry.label.toLowerCase()} work.
            </p>
            <div className="growth-keyword-cloud" aria-label="Emergency and lead keywords">
              {industry.emergencyTerms.map((term) => (
                <span key={term}>{term}</span>
              ))}
            </div>
          </div>
          <div className="growth-card growth-industry-note">
            <PhoneCall aria-hidden="true" size={28} />
            <h3>Dispatch notes</h3>
            <p>{industry.dispatchNotes}</p>
            <ul>
              {industry.automations.map((automation) => (
                <li key={automation}>
                  <CheckCircle2 aria-hidden="true" size={16} />
                  {automation}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="growth-section growth-system-section" aria-labelledby="industry-system">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">Three engines</span>
            <h2 id="industry-system">Calls, follow-up, and reviews working as one system.</h2>
          </div>
          <div className="growth-card-grid growth-card-grid-three">
            {systemEngines.map((engine) => {
              const Icon = engine.icon;
              return (
                <article key={engine.title} className="growth-engine-card growth-engine-card-flat">
                  <Icon aria-hidden="true" size={25} />
                  <span>{engine.kicker}</span>
                  <h3>{engine.title}</h3>
                  <p>{engine.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="growth-section growth-section-light" aria-labelledby="industry-areas">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">Houston service area fit</span>
            <h2 id="industry-areas">Built locally, then tuned by service area.</h2>
            <p>
              The same {industry.label.toLowerCase()} offer should sound different in
              Crosby, Houston, Pearland, and The Woodlands. These pages give each
              market its own useful entry point.
            </p>
          </div>
          <div className="growth-area-list growth-area-list-inline">
            {featuredAreas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`}>
                <MapPin aria-hidden="true" size={15} />
                {area.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-section growth-faq-section" aria-labelledby="industry-faq">
        <div className="growth-container growth-faq-layout">
          <div>
            <span className="growth-eyebrow">Questions</span>
            <h2 id="industry-faq">{industry.label} automation questions owners ask first.</h2>
          </div>
          <div className="growth-faq-list">
            {industry.faqs.map((faq) => (
              <article key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-final-cta growth-final-cta-compact" aria-labelledby="industry-cta">
        <div className="growth-container">
          <h2 id="industry-cta">Want the {industry.label} version of this system?</h2>
          <p>
            Book the audit and we will map the first leak, the right intake
            questions, and the first demo worth showing.
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

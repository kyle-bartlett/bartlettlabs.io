import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  expansionModules,
  growthSteps,
  industries,
  pricingTiers,
  proofMetrics,
  serviceAreas,
  systemEngines,
} from "@/content/growth-system";
import { siteConfig } from "@/content/site";
import { GuaranteeCarousel } from "./GuaranteeCarousel";
import { HomepageDemoGrid } from "./HomepageDemoGrid";

export function GrowthSystemHome() {
  return (
    <main className="growth-page">
      <section className="growth-hero" aria-labelledby="growth-hero-title">
        <div className="growth-hero-grid" aria-hidden="true" />
        <div className="growth-hero-inner">
          <div className="growth-hero-copy">
            <span className="growth-kicker">Built in Crosby for Houston-area service businesses</span>
            <h1 id="growth-hero-title">
              Stop losing jobs to the company that answered first.
            </h1>
            <p>
              Bartlett Labs builds the practical AI operating system for local service
              businesses: every call answered, every quote followed up, every happy
              customer asked for a review.
            </p>
            <div className="growth-actions">
              <Link href={siteConfig.booking.path} className="growth-btn growth-btn-primary">
                Request a 15-Min Audit
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link href="#demos" className="growth-btn growth-btn-ghost">
                Watch the demos
              </Link>
            </div>
          </div>

        </div>
        <div className="growth-ticker" aria-label="Service highlights">
          <div>
            {[
              "Missed-call text-back",
              "AI voice intake",
              "GoHighLevel CRM",
              "Make.com workflows",
              "Review requests",
              "Quote follow-up",
              "Owner alerts",
              "Demo-first builds",
              "Missed-call text-back",
              "AI voice intake",
              "GoHighLevel CRM",
              "Make.com workflows",
              "Review requests",
              "Quote follow-up",
              "Owner alerts",
              "Demo-first builds",
            ].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section
        className="growth-system-preview"
        aria-labelledby="system-preview-title"
      >
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">The system, live</span>
            <h2 id="system-preview-title">
              What it actually looks like the day after launch.
            </h2>
            <p>
              Three engines running together. Every call answered, every quote
              followed up, every happy customer asked for a review.
            </p>
          </div>
          <div
            className="growth-hero-system"
            aria-label="Bartlett Labs operating system preview"
          >
            <div className="growth-live-pill">
              <span />
              Live lead desk
            </div>
            <div className="growth-console">
              <div className="growth-console-header">
                <span>Lead activity</span>
                <strong>Houston area</strong>
              </div>
              {[
                ["Missed call", "Text-back sent", "0:09"],
                ["Website chat", "Booked estimate", "1:42"],
                ["Review request", "Delivered", "2:18"],
              ].map(([label, state, time]) => (
                <div key={label} className="growth-console-row">
                  <span>{label}</span>
                  <strong>{state}</strong>
                  <em>{time}</em>
                </div>
              ))}
            </div>
            <div className="growth-message-card">
              <PhoneCall aria-hidden="true" size={19} />
              <div>
                <strong>New plumbing lead</strong>
                <span>Leak in Crosby. Photos requested. Owner alerted.</span>
              </div>
            </div>
            <div className="growth-system-blocks">
              {["Lead Capture", "AI Follow-Up", "Auto-Scheduling", "Reviews"].map(
                (label) => (
                  <span key={label}>{label}</span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="growth-section growth-section-light" aria-labelledby="problem-title">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">The problem</span>
            <h2 id="problem-title">Your ads work. Your follow-up has holes.</h2>
            <p>
              The expensive part is not just ad spend. It is the lead that calls after
              hours, hits voicemail, checks the next Google result, and books someone
              else before morning.
            </p>
          </div>
          <div className="growth-card-grid growth-card-grid-three">
            {[
              {
                title: "Calls arrive while you are doing the work",
                body: "A good owner is often under a sink, on a roof, in an attic, or driving between jobs. The system covers the gap.",
                icon: PhoneCall,
              },
              {
                title: "Quotes go cold without reminders",
                body: "Most shops have a quote graveyard. Automated follow-up keeps the conversation alive without adding admin time.",
                icon: CalendarCheck,
              },
              {
                title: "Happy customers forget to leave reviews",
                body: "Review requests should happen automatically while the customer still remembers the job went well.",
                icon: Sparkles,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="growth-card">
                  <Icon aria-hidden="true" size={24} />
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="growth-section growth-system-section" id="how" aria-labelledby="system-title">
        <div className="growth-container growth-system-layout">
          <div>
            <span className="growth-eyebrow">The complete system</span>
            <h2 id="system-title">One operating system. Three engines. No loose ends.</h2>
            <p>
              This is not a chatbot taped onto a website. It is a practical growth
              stack that connects phones, forms, SMS, scheduling, CRM, reviews, and
              owner visibility.
            </p>
            <div className="growth-mini-terminal" aria-label="System workflow example">
              <div>
                <span>Trigger</span>
                <strong>New lead submitted</strong>
              </div>
              <div>
                <span>Action</span>
                <strong>Send blueprint + SMS</strong>
              </div>
              <div>
                <span>Owner alert</span>
                <strong>Hot lead in Crosby</strong>
              </div>
            </div>
          </div>
          <div className="growth-engine-stack">
            {systemEngines.map((engine) => {
              const Icon = engine.icon;
              return (
                <article key={engine.title} className="growth-engine-card">
                  <Icon aria-hidden="true" size={26} />
                  <div>
                    <span>{engine.kicker}</span>
                    <h3>{engine.title}</h3>
                    <p>{engine.description}</p>
                    <ul>
                      {engine.bullets.map((bullet) => (
                        <li key={bullet}>
                          <CheckCircle2 aria-hidden="true" size={16} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="growth-metrics" aria-label="System targets">
        <div className="growth-container growth-metrics-grid">
          {proofMetrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="growth-section growth-section-light" aria-labelledby="industries-title">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">Industries</span>
            <h2 id="industries-title">Built for the trades that keep Houston running.</h2>
            <p>
              Each industry page is tuned around its own urgency, job value, intake
              questions, review needs, and follow-up flow.
            </p>
          </div>
          <div className="growth-directory-grid">
            {industries.map((industry) => (
              <Link key={industry.slug} href={`/industries/${industry.slug}`} className="growth-directory-card">
                <span>{industry.label}</span>
                <p>{industry.dispatchNotes}</p>
                <strong>
                  View system
                  <ArrowRight aria-hidden="true" size={15} />
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-section growth-demo-section" id="demos" aria-labelledby="demos-title">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">Demo proof</span>
            <h2 id="demos-title">The part they are missing: show the system working.</h2>
            <p>
              Most sites just promise automation. Start with the 15-second version,
              then dig into the walkthroughs below.
            </p>
          </div>
          <div className="growth-commercial">
            <video
              className="growth-commercial-video"
              controls
              playsInline
              preload="metadata"
              poster="/demos/service-tech-commercial.jpg"
            >
              <source src="/demos/service-tech-commercial-v2.mp4" type="video/mp4" />
            </video>
            <p className="growth-commercial-caption">
              The 15-second version: the AI answers, books the job, and the owner
              never stops working. Sound on.
            </p>
          </div>
          <HomepageDemoGrid />
        </div>
      </section>

      <section className="growth-section growth-founder-section" id="founder" aria-labelledby="founder-title">
        <div className="growth-container growth-founder-layout">
          <div className="growth-founder-photo">
            <Image
              src="/images/founder/kyle-home-portrait.jpg"
              alt="Kyle Bartlett, founder of Bartlett Labs"
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              priority={false}
            />
          </div>
          <div>
            <span className="growth-eyebrow">Founder-led</span>
            <h2 id="founder-title">Purdue engineering meets small-town handshake.</h2>
            <p>
              I grew up washing cars at my family&apos;s Ford dealership in a town
              of 1,000 people, then spent 13 years in operations and technology
              roles for companies like Sears, Belk, Apple, and Anker.
            </p>
            <p>
              Bartlett Labs exists for the local owner who does not need AI theater.
              You need phones answered, jobs booked, quotes followed up, and a clear
              dashboard that tells you what is happening.
            </p>
            <div className="growth-founder-badges">
              {["Crosby-based", "Purdue-trained", "Owner-built", "No agency handoffs"].map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="growth-section growth-section-light" aria-labelledby="steps-title">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">How it works</span>
            <h2 id="steps-title">From first audit to first booked lead without the mystery.</h2>
            <p>
              We keep the process plain: find the leak, build the system, launch it
              with you, and improve it once real leads start flowing.
            </p>
          </div>
          <div className="growth-timeline">
            {growthSteps.map((step) => (
              <article key={step.step} className="growth-step-card">
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-section growth-area-section" aria-labelledby="areas-title">
        <div className="growth-container growth-area-layout">
          <div>
            <span className="growth-eyebrow">Service areas</span>
            <h2 id="areas-title">Houston-area pages that can actually rank and sell.</h2>
            <p>
              Each service-area page gets its own local market profile, neighborhoods,
              industries, and CTA path so the site feels deep without overwhelming the
              main page.
            </p>
            <div className="growth-map-card">
              <MapPin aria-hidden="true" size={22} />
              <div>
                <strong>Home base: Crosby, Texas</strong>
                <span>Serving Houston, Lake Houston, Baytown, and nearby suburbs.</span>
              </div>
            </div>
          </div>
          <div className="growth-area-list">
            {serviceAreas.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`}>
                {area.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-section growth-section-light" id="pricing" aria-labelledby="pricing-title">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">Pricing</span>
            <h2 id="pricing-title">Pick the first system. Scale when it proves itself.</h2>
            <p>
              Pick the plan that fits your shop today. Setup is scoped to your call
              volume, integrations, and the exact system you need.
            </p>
          </div>
          <div className="growth-pricing-grid">
            {pricingTiers.map((tier) => (
              <article key={tier.name} className="growth-pricing-card">
                <span>{tier.bestFor}</span>
                <h3>{tier.name}</h3>
                <strong>{tier.price}</strong>
                <p>{tier.summary}</p>
                <ul>
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 aria-hidden="true" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="growth-section growth-modules-section" aria-labelledby="modules-title">
        <div className="growth-container">
          <div className="growth-section-heading">
            <span className="growth-eyebrow">Expansion modules</span>
            <h2 id="modules-title">Bolt-on engines when the first system starts working.</h2>
          </div>
          <div className="growth-card-grid growth-card-grid-four">
            {expansionModules.map((module) => {
              const Icon = module.icon;
              return (
                <article key={module.title} className="growth-module-card">
                  <Icon aria-hidden="true" size={24} />
                  <span>{module.price}</span>
                  <h3>{module.title}</h3>
                  <p>{module.summary}</p>
                  <strong>{module.bestFor}</strong>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <GuaranteeCarousel />

      <section className="growth-security-band" aria-label="Privacy and security">
        <div className="growth-container growth-security-layout">
          <ShieldCheck aria-hidden="true" size={34} />
          <div>
            <span className="growth-eyebrow">Security first</span>
            <h2>Your data stays yours. Period.</h2>
            <p>
              The system is built around business-owned tools, clear consent language,
              and workflows that do not train public AI models on your customer data.
            </p>
          </div>
          <Link href="/privacy" className="growth-btn growth-btn-ghost">
            Read privacy notes
          </Link>
        </div>
      </section>

      <section className="growth-final-cta" aria-labelledby="final-cta-title">
        <div className="growth-container">
          <Bot aria-hidden="true" size={36} />
          <h2 id="final-cta-title">Stop losing leads. Start booking them.</h2>
          <p>
            Start with a 15-minute audit. We will identify the highest-value leak and
            sketch the first automation blueprint for your shop.
          </p>
          <div className="growth-actions growth-actions-center">
            <Link href={siteConfig.booking.path} className="growth-btn growth-btn-primary">
              Request a 15-Min Audit
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <a href={`tel:${siteConfig.phone.raw}`} className="growth-btn growth-btn-ghost">
              Call {siteConfig.phone.display}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

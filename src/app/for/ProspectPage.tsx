"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Prospect } from "./prospects";
import { markOwnerFromUrl, track, trackViewWhenSeen } from "./track";

// The shared RepBot demo line. It answers as the sample business Summit Heating and Air,
// so the section below says so instead of implying it answers as the prospect.
const DEMO_NUMBER_DISPLAY = "(979) 987-4241";
const DEMO_NUMBER_TEL = "+19799874241";

type FormStatus = "idle" | "sending" | "success" | "error";

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function ProspectPage({ prospect: p }: { prospect: Prospect }) {
  const [service, setService] = useState("");
  const [qualifier, setQualifier] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    markOwnerFromUrl();
    return trackViewWhenSeen(p.slug);
  }, [p.slug]);

  const accentStyle = {
    "--preview-accent": p.accent,
    "--preview-accent-dark": p.accentDark,
  } as React.CSSProperties;

  function buildPlan() {
    if (!service || !qualifier) return;
    setShowPlan(true);
    track(p.slug, "estimate");
    window.setTimeout(() => {
      document
        .getElementById("project-plan")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 20);
  }

  async function claimBuild(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/booked-local-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: p.slug,
          contactName: data.get("contactName"),
          email: data.get("email"),
          phone: data.get("phone"),
          companySite: data.get("companySite"),
        }),
      });
      const body = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !body.ok) {
        throw new Error(body.error || "Your request could not be saved.");
      }
      setStatus("success");
      setMessage(
        "Got it. Kyle will email the exact handoff and launch checklist. No discovery call required.",
      );
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Email kyle@bartlettlabs.io and we will take care of it.",
      );
    }
  }

  return (
    <main
      className={`prospect-page prospect-layout-${p.layout}`}
      style={accentStyle}
    >
      <div className="concept-ribbon">
        <span>Live conversion concept prepared specifically for {p.name}</span>
        <a href="#owner-plan">Why this was built ↘</a>
      </div>

      <header className="prospect-header" id="preview-top">
        <a
          className="prospect-logo"
          href="#preview-top"
          aria-label={`${p.shortName} preview home`}
        >
          <span>{initials(p.shortName)}</span>
          <strong>{p.shortName}</strong>
        </a>
        <nav aria-label="Concept page navigation">
          <a href="#preview-services">Services</a>
          <a href="#preview-proof">Why choose us</a>
          <a className="prospect-nav-cta" href="#preview-estimate">
            Get a fast plan
          </a>
        </nav>
      </header>

      <section className="prospect-hero">
        <div className="prospect-hero-copy">
          <p className="prospect-kicker">Serving {p.area}</p>
          <h1>{p.hero}</h1>
          <p>{p.subhead}</p>
          <div className="prospect-actions">
            <a
              className="prospect-button prospect-button-primary"
              href="#preview-estimate"
            >
              Start my project <span>→</span>
            </a>
            <a
              className="prospect-button prospect-button-ghost"
              href={`tel:${p.phoneHref}`}
            >
              Call {p.phone}
            </a>
          </div>
          <div className="prospect-service-line">
            {p.services.slice(0, 3).map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div className="prospect-proof-composition" id="preview-proof">
          <article className="prospect-rating-card">
            <div>
              <strong>{p.rating.toFixed(1)}</strong>
              <span>★★★★★</span>
            </div>
            <p>Google rating</p>
            <small>{p.reviews} public reviews</small>
          </article>
          <article className="prospect-review-card">
            <span>What customers notice</span>
            <blockquote>{p.trustLine}</blockquote>
            <a href={p.googleProfile} target="_blank" rel="noreferrer">
              See the Google profile ↗
            </a>
          </article>
          <div className="prospect-promise-card">
            <span>THE PROMISE</span>
            <strong>{p.customerPromise}</strong>
          </div>
        </div>
      </section>

      <section className="prospect-services" id="preview-services">
        <div className="prospect-section-heading">
          <p>Built around what the customer needs</p>
          <h2>Choose the project. Get the right next step.</h2>
        </div>
        <div className="prospect-service-grid">
          {p.services.map((s, i) => (
            <article key={s}>
              <div className="prospect-service-image">
                {/* eslint-disable-next-line @next/next/no-img-element -- small local webp, same as the original page */}
                <img
                  src={p.serviceImages[i]}
                  alt={`${s} project example`}
                  loading="lazy"
                />
                <span>0{i + 1}</span>
              </div>
              <div className="prospect-service-copy">
                <h3>{s}</h3>
                <p>
                  Clear expectations, project details captured early and a fast
                  response path.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="prospect-estimate" id="preview-estimate">
        <div className="prospect-estimate-copy">
          <p className="prospect-kicker">Interactive estimate concept</p>
          <h2>A useful answer starts before the callback.</h2>
          <p>
            This demonstration shows how a customer can identify the project,
            add the deciding detail and understand what happens next.
          </p>
          <ul>
            <li>No account or sales call required</li>
            <li>Designed for a phone in under one minute</li>
            <li>Final pricing rules are set by {p.shortName}</li>
          </ul>
        </div>
        <div className="prospect-estimator">
          {showPlan ? (
            <div className="prospect-result" id="project-plan">
              <span className="prospect-result-check">✓</span>
              <p>Your project snapshot</p>
              <h3>{service}</h3>
              <dl>
                <div>
                  <dt>{p.qualifierLabel}</dt>
                  <dd>{qualifier}</dd>
                </div>
                <div>
                  <dt>Recommended next step</dt>
                  <dd>{p.resultCopy}</dd>
                </div>
              </dl>
              <a
                className="prospect-button prospect-button-primary prospect-full-button"
                href={`tel:${p.phoneHref}`}
              >
                Call {p.shortName} <span>→</span>
              </a>
              <button
                className="prospect-reset"
                type="button"
                onClick={() => setShowPlan(false)}
              >
                Change project details
              </button>
              <small>
                Demonstration only. {p.shortName} would control final pricing,
                availability and service terms.
              </small>
            </div>
          ) : (
            <>
              <div className="prospect-step">
                <span>1</span>
                <strong>What can we help with?</strong>
              </div>
              <div className="prospect-choice-grid">
                {p.services.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={service === s ? "selected" : ""}
                    aria-pressed={service === s}
                    onClick={() => setService(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="prospect-step second">
                <span>2</span>
                <strong>{p.qualifierLabel}</strong>
              </div>
              <div className="prospect-choice-grid compact">
                {p.qualifierOptions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className={qualifier === q ? "selected" : ""}
                    aria-pressed={qualifier === q}
                    onClick={() => setQualifier(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                className="prospect-button prospect-button-primary prospect-full-button"
                type="button"
                disabled={!service || !qualifier}
                onClick={buildPlan}
              >
                Build my project plan <span>→</span>
              </button>
            </>
          )}
        </div>
      </section>

      <section className="prospect-repbot" id="missed-calls">
        <div className="prospect-repbot-copy">
          <p className="owner-eyebrow">Now, for {p.shortName}: missed calls</p>
          <h2>Every missed call gets a text back in seconds.</h2>
          <p>
            When a customer calls and nobody can pick up, RepBot texts them back
            as {p.shortName}, asks what they need and books the visit. It
            answers after hours too.
          </p>
          <a
            className="prospect-button prospect-button-primary"
            href={`tel:${DEMO_NUMBER_TEL}`}
            onClick={() => track(p.slug, "demo_tap")}
          >
            Call the live demo {DEMO_NUMBER_DISPLAY} <span>→</span>
          </a>
          <small>
            The demo line answers as Summit Heating and Air, our sample
            business. Yours would answer as {p.shortName}.
          </small>
        </div>
        <div className="prospect-phone" aria-label="Example missed-call text">
          <div className="prospect-phone-top">
            <strong>{p.shortName}</strong>
            <span>Text message · now</span>
          </div>
          <p className="prospect-bubble prospect-bubble-them">
            Hi, this is {p.shortName}. Sorry we missed your call! What can we
            help with: {p.services.slice(0, 2).join(", ").toLowerCase()} or
            something else?
          </p>
          <p className="prospect-bubble prospect-bubble-me">
            {p.services[0]}. Can someone come look this week?
          </p>
          <p className="prospect-bubble prospect-bubble-them">
            Yes. I have Thursday at 10am or 2pm. Which works better?
          </p>
          <small>
            Example text. RepBot sends it within seconds of the missed call.
          </small>
        </div>
      </section>

      <section className="owner-plan" id="owner-plan">
        <div className="owner-plan-intro">
          <p className="owner-eyebrow">Now, for {p.shortName}</p>
          <h2>This was not a generic redesign.</h2>
          <p>{p.audit}</p>
          <div className="owner-source-links">
            {p.website ? (
              <a href={p.website} target="_blank" rel="noreferrer">
                Current website ↗
              </a>
            ) : (
              <span>No current website found</span>
            )}
            <a href={p.googleProfile} target="_blank" rel="noreferrer">
              Google profile ↗
            </a>
          </div>
        </div>
        <div className="owner-upgrade-grid">
          {p.upgrades.map((u, i) => (
            <article
              key={u.title}
              style={
                {
                  "--upgrade-image": `url("${u.image}")`,
                } as React.CSSProperties
              }
            >
              <span>UPGRADE {i + 1}</span>
              <h3>{u.title}</h3>
              <p>{u.detail}</p>
            </article>
          ))}
        </div>
        <div className="owner-package">
          <div>
            <p>Recommended build for {p.shortName}</p>
            <h3>{p.packageName}</h3>
            <span>{p.packageSummary}</span>
          </div>
          <div className="owner-price">
            <small>Founding build</small>
            <strong>$995</strong>
            <span>then $199/month</span>
          </div>
          <ul>
            <li>
              This personalized page rebuilt with approved copy and images
            </li>
            <li>Working estimate intake and project-photo collection</li>
            <li>RepBot missed-call and after-hours follow-up</li>
            <li>Hosting, updates, routing and simple lead reporting</li>
          </ul>
          <p className="owner-terms">
            $250 starts the build · $745 after approval · first 30 days included
            · no long-term contract
          </p>
        </div>
        <div className="owner-claim">
          <div>
            <p className="owner-eyebrow">Keep it simple</p>
            <h2>Want this finished under your name?</h2>
            <p>
              Send the best email for the handoff. Kyle will reply with the
              exact launch checklist. A call is optional.
            </p>
            <a href="mailto:kyle@bartlettlabs.io">kyle@bartlettlabs.io</a>
          </div>
          <form onSubmit={claimBuild}>
            <label>
              <span>Your name</span>
              <input
                name="contactName"
                required
                maxLength={80}
                autoComplete="name"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                name="email"
                type="email"
                required
                maxLength={160}
                autoComplete="email"
              />
            </label>
            <label>
              <span>
                Phone <small>(optional)</small>
              </span>
              <input
                name="phone"
                type="tel"
                maxLength={30}
                autoComplete="tel"
              />
            </label>
            <label className="honeypot" aria-hidden="true">
              Company site
              <input name="companySite" tabIndex={-1} autoComplete="off" />
            </label>
            <button
              className="prospect-button prospect-button-primary prospect-full-button"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Saving…" : "Claim this build"}
              <span>→</span>
            </button>
            <p
              className={`prospect-form-message ${status}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          </form>
        </div>
      </section>

      <footer className="prospect-footer">
        <div>
          <strong>BOOKED LOCAL</strong>
          <span>by Bartlett Labs · Houston, Texas</span>
        </div>
        <p>
          Concept prepared for {p.name}. Not affiliated with or approved by the
          company unless they choose to launch it. Rating and review count
          reflect a public snapshot reviewed August 14, 2026.
        </p>
      </footer>

      <a className="prospect-mobile-claim" href="#owner-plan">
        See your upgrade plan
      </a>
    </main>
  );
}

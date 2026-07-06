"use client";

import { useState, type FormEvent } from "react";
import posthog from "posthog-js";
import { CheckCircle2 } from "lucide-react";
import styles from "./crosby.module.css";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Status = "idle" | "submitting" | "success" | "error";

const TRADES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Contractor / Builder",
  "Realtor",
  "Auto Repair",
  "Tree Service",
  "Other",
] as const;

export function CrosbyLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: (fd.get("name") as string) ?? "",
      business: (fd.get("business") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      phone: (fd.get("phone") as string) ?? "",
      trade: (fd.get("trade") as string) ?? "",
      website: (fd.get("website") as string) ?? "", // honeypot
    };

    try {
      const res = await fetch("/api/crosby-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (res.ok && data.ok) {
        try {
          posthog?.capture?.("crosby_audit_submitted", { source: "alignable" });
        } catch {
          /* ignore analytics errors */
        }
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq("track", "Lead", {
            content_name: "Crosby AI Opportunity Audit",
          });
        }
        form.reset();
        setStatus("success");
        return;
      }

      setError(data.error || "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setError(
        "We couldn't reach the server. Email kyle@bartlettlabs.io and we'll get you set up."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIcon}>
          <CheckCircle2 aria-hidden="true" size={30} />
        </div>
        <h3 className={styles.successTitle}>You&apos;re on the list.</h3>
        <p className={styles.successText}>
          Thanks — your free Crosby AI Opportunity Audit request is in. Kyle will
          reach out personally within one business day to map your lead leaks.
          Prefer to talk now? Call{" "}
          <a href="tel:+18326304317" style={{ color: "var(--color-burnt-orange)", fontWeight: 600 }}>
            (832) 630-4317
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
      <span className={styles.kicker}>Free audit — first 10 this month</span>
      <h3 className={styles.successTitle} style={{ marginTop: "0.9rem" }}>
        Claim your free Crosby AI Opportunity Audit
      </h3>
      <p className={styles.successText} style={{ marginTop: "0.6rem" }}>
        Tell us where to send it and we&apos;ll show you exactly where your leads
        are leaking — and how to patch them.
      </p>

      {/* Honeypot — hidden from real users */}
      <div className={styles.honey} aria-hidden="true">
        <label htmlFor="crosby-website">Website</label>
        <input id="crosby-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={`${styles.formGrid} ${styles.formGrid2}`}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="crosby-name">
            Name <span className={styles.req}>*</span>
          </label>
          <input
            className={styles.input}
            id="crosby-name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="crosby-business">
            Business name <span className={styles.req}>*</span>
          </label>
          <input
            className={styles.input}
            id="crosby-business"
            name="business"
            type="text"
            required
            placeholder="Crosby business name"
            autoComplete="organization"
          />
        </div>
      </div>

      <div className={`${styles.formGrid} ${styles.formGrid2}`}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="crosby-email">
            Email <span className={styles.req}>*</span>
          </label>
          <input
            className={styles.input}
            id="crosby-email"
            name="email"
            type="email"
            required
            placeholder="you@business.com"
            autoComplete="email"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="crosby-phone">
            Phone (optional)
          </label>
          <input
            className={styles.input}
            id="crosby-phone"
            name="phone"
            type="tel"
            placeholder="(832) 630-4317"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="crosby-trade">
            What do you do?
          </label>
          <select className={styles.input} id="crosby-trade" name="trade" defaultValue="">
            <option value="">Select one</option>
            {TRADES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className={styles.consent}>
        Phone is optional — we&apos;ll only use it to reach you about your audit.
        This form does not sign you up for text messages. To opt in to SMS, see our{" "}
        <a href="/sms-opt-in">SMS Opt-In</a> policy.
      </p>

      {status === "error" && <p className={styles.error}>{error}</p>}

      <div className={styles.submitRow}>
        <button
          type="submit"
          className={styles.cta}
          disabled={status === "submitting"}
          style={status === "submitting" ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
        >
          {status === "submitting" ? "Sending…" : "Claim my free audit"}
        </button>
        <span className={styles.submitNote}>No cost, no obligation.</span>
      </div>
    </form>
  );
}

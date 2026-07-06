"use client";

import posthog from "posthog-js";
import { ArrowRight } from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Props = {
  children: React.ReactNode;
  /** Where this CTA sits, for analytics attribution. */
  location: string;
  className?: string;
};

/**
 * Primary CTA that scrolls to the on-page audit form (#audit) and fires a
 * PostHog + Meta Pixel event so the Alignable ad funnel is measurable.
 */
export function CrosbyCtaButton({ children, location, className }: Props) {
  const handleClick = () => {
    try {
      posthog?.capture?.("crosby_audit_cta_click", { location, source: "alignable" });
    } catch {
      /* analytics must never block navigation */
    }
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", "CrosbyAuditCtaClick", { location });
    }
  };

  return (
    <a href="#audit" onClick={handleClick} className={className}>
      {children}
      <ArrowRight aria-hidden="true" size={18} />
    </a>
  );
}

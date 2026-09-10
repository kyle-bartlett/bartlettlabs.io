import type { LucideIcon } from "lucide-react";
import {
  CheckCircle2,
  Clock3,
  Handshake,
  MapPin,
  ShieldCheck,
} from "lucide-react";

export type Guarantee = {
  id: string;
  /** Short eyebrow shown above the headline (e.g. "Launch window"). */
  eyebrow: string;
  /** The main promise — kept tight for use in a carousel slide. */
  headline: string;
  /** One-sentence support copy explaining the guarantee. */
  body: string;
  /** Lucide icon shown in the upper-left corner of each slide. */
  icon: LucideIcon;
};

/**
 * Shipped guarantees for the homepage Guarantee Carousel.
 *
 * Edit copy here. Order in this array determines display order. Keep the
 * total under 7 entries — the carousel has finite real estate and the
 * dot indicators get crowded above that.
 */
export const guarantees: Guarantee[] = [
  {
    id: "launch-window",
    eyebrow: "Launch window",
    headline: "Core missed-call text-back live within 48 hours of kickoff.",
    body: "Full system typically live within a week. Follow-up flows, the CRM dashboard, and owner alerts come online right behind the text-back.",
    icon: Clock3,
  },
  {
    id: "founder-built",
    eyebrow: "Founder-built",
    headline: "Every line of code is mine. No agency handoffs.",
    body: "You work directly with Kyle, the engineer building your system. No project manager telephone game. No outsourced backend.",
    icon: Handshake,
  },
  {
    id: "support-window",
    eyebrow: "30-day support",
    headline: "Thirty days of post-launch tuning, included.",
    body: "Tweak the copy, adjust the workflow, fix anything that surprises you in production. Built in, not an upsell.",
    icon: ShieldCheck,
  },
  {
    id: "fixed-scope",
    eyebrow: "No retainers",
    headline: "Fixed scope. Fixed price. No surprise invoices.",
    body: "Every offer has a clear price tag and a defined deliverable. No hourly billing. No bloated retainers. No mystery charges.",
    icon: CheckCircle2,
  },
  {
    id: "local",
    eyebrow: "Crosby-based",
    headline: "Texas-built systems for Texas service businesses.",
    body: "Operating out of Crosby, TX. I take the operational rigor used by Fortune 500 teams and rebuild it for the local trades.",
    icon: MapPin,
  },
];

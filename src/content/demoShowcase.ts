import { PhoneCall, Video, Wrench } from "lucide-react";

/**
 * Each entry powers a card in the homepage `#demos` section.
 * `demo` points at the recorded walkthrough video; when the asset is
 * not yet on disk, the card shows a "coming soon" placeholder treatment.
 *
 * Lives in its own file (rather than `growth-system.ts`) so the demo
 * data and Service Demo Modal wiring can ship without rewriting the
 * larger content file.
 */
export const demoShowcase = [
  {
    id: "missed-call-recovery",
    title: "Missed-call recovery",
    label: "Phone + SMS demo",
    description:
      "Show a lead calling after hours, receiving an instant text, and landing in the pipeline with a callback task.",
    icon: PhoneCall,
    demo: {
      videoPath: "/demos/missed-call-text-back.mp4",
      videoPathWebm: "/demos/missed-call-text-back.webm",
      posterPath: "/demos/missed-call-text-back.jpg",
      caption: "Missed call \u2192 booked estimate in under 2 minutes.",
      durationSec: 60,
    },
  },
  {
    id: "ghl-command-center",
    title: "GoHighLevel command center",
    label: "CRM walkthrough",
    description:
      "Show the owner dashboard: open leads, booked jobs, stale quotes, review requests, and weekly follow-up tasks.",
    icon: Video,
    demo: {
      videoPath: "/demos/simple-crm-dashboard.mp4",
      videoPathWebm: "/demos/simple-crm-dashboard.webm",
      posterPath: "/demos/simple-crm-dashboard.jpg",
      caption: "Every lead, quote, and job in your pocket.",
      durationSec: 75,
    },
  },
  {
    id: "automation-blueprint",
    title: "Automation blueprint",
    label: "Make.com build",
    description:
      "Show the real workflow logic that routes forms, sends alerts, creates calendar links, and tracks outcomes.",
    icon: Wrench,
    demo: {
      videoPath: "/demos/automated-follow-ups.mp4",
      videoPathWebm: "/demos/automated-follow-ups.webm",
      posterPath: "/demos/automated-follow-ups.jpg",
      caption: "A 4-day-old quote turns into a won job.",
      durationSec: 60,
    },
  },
] as const;

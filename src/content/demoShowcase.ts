import { PhoneCall, Video, Wrench } from "lucide-react";

/**
 * Each entry powers a card in the homepage `#demos` section.
 *
 * `demo.posterPath` is required and points at the static UI mockup we
 * ship today. `demo.videoPath` is optional — when populated, the modal
 * upgrades from an image to a real video walkthrough. Until Kyle's GHL
 * A2P is approved and real recordings come in, we ship image-only.
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
      "A lead calls after hours, gets an instant text back, and lands in your pipeline with a callback task waiting.",
    icon: PhoneCall,
    demo: {
      videoPath: "/demos/missed-call-text-back.mp4",
      // videoPathWebm: "/demos/missed-call-text-back.webm",  // add when WebM encoded
      posterPath: "/demos/missed-call-text-back.jpg",
      caption: "Missed call → booked estimate in under 2 minutes.",
      durationSec: 12,
    },
  },
  {
    id: "ghl-command-center",
    title: "GoHighLevel command center",
    label: "CRM walkthrough",
    description:
      "The owner dashboard in one view: open leads, booked jobs, stale quotes, review requests, and this week's follow-ups.",
    icon: Video,
    demo: {
      // videoPath: "/demos/simple-crm-dashboard.mp4",  // add when recorded
      // videoPathWebm: "/demos/simple-crm-dashboard.webm",
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
      "The workflow behind the scenes: routing form submissions, sending alerts, creating calendar links, and tracking outcomes.",
    icon: Wrench,
    demo: {
      // videoPath: "/demos/automated-follow-ups.mp4",  // add when recorded
      // videoPathWebm: "/demos/automated-follow-ups.webm",
      posterPath: "/demos/automated-follow-ups.jpg",
      caption: "A 4-day-old quote turns into a won job.",
      durationSec: 60,
    },
  },
] as const;

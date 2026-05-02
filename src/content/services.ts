export type ServiceDemo = {
  /** Path to the demo video file relative to /public (e.g. "/demos/missed-call-text-back.mp4"). */
  videoPath: string;
  /** Optional WebM source for better browser support / smaller file size. */
  videoPathWebm?: string;
  /** Path to a poster image shown before the video plays. */
  posterPath: string;
  /** Short caption shown beside the video on small screens. */
  caption: string;
  /** Approximate runtime in seconds, used for the modal label. */
  durationSec: number;
};

export type Service = {
  id: string;
  title: string;
  priceRange: string;
  summary: string;
  timeline: string;
  whoItsFor: string[];
  whatYouProvide: string[];
  whatIDeliver: string[];
  homepageBullets: string[];
  /**
   * Optional walkthrough demo. When present, ServiceCard renders a
   * "Watch the demo" button that opens ServiceDemoModal.
   * The component falls back to a "Demo coming soon" placeholder if the
   * underlying video file is not yet on disk.
   */
  demo?: ServiceDemo;
};

export const services = [
  {
    id: "websites",
    title: "Missed Call Text-Back",
    priceRange: "$500 setup + $99/mo",
    summary: "If you don't answer, you don't get the job. Instantly text back missed calls and keep the lead warm while you finish your current job.",
    timeline: "Live in 48 hours",
    whoItsFor: ["Local businesses missing calls", "Owners on the job site"],
    whatYouProvide: ["Your phone number"],
    whatIDeliver: ["Automated response system"],
    homepageBullets: ["Instant response to missed calls", "Keeps leads from calling the next guy", "Works 24/7 without extra effort"],
    demo: {
      videoPath: "/demos/missed-call-text-back.mp4",
      videoPathWebm: "/demos/missed-call-text-back.webm",
      posterPath: "/demos/missed-call-text-back.jpg",
      caption: "Missed call \u2192 booked estimate in under 2 minutes.",
      durationSec: 60,
    },
  },
  {
    id: "chatbots",
    title: "Automated Follow-Ups",
    priceRange: "Included",
    summary: "Never let a quote go cold. Automated text sequences check in with customers so you don't have to play phone tag.",
    timeline: "Live in 48 hours",
    whoItsFor: ["Businesses losing un-followed up quotes"],
    whatYouProvide: ["Your typical follow up timeline"],
    whatIDeliver: ["Automated text sequences"],
    homepageBullets: ["Automatic follow-ups on open quotes", "Revive old leads effortlessly", "Consistent communication"],
    demo: {
      videoPath: "/demos/automated-follow-ups.mp4",
      videoPathWebm: "/demos/automated-follow-ups.webm",
      posterPath: "/demos/automated-follow-ups.jpg",
      caption: "A 4-day-old quote turns into a won job.",
      durationSec: 60,
    },
  },
  {
    id: "automation",
    title: "Simple CRM Dashboard",
    priceRange: "Included",
    summary: "Ditch the sticky notes. See every lead, active quote, and booked job in one clean dashboard on your phone.",
    timeline: "Live in 48 hours",
    whoItsFor: ["Teams using whiteboards or sticky notes"],
    whatYouProvide: ["None"],
    whatIDeliver: ["Mobile and web app access"],
    homepageBullets: ["One place for all messages", "Mobile app for on-the-go access", "Clear view of your pipeline"],
    demo: {
      videoPath: "/demos/simple-crm-dashboard.mp4",
      videoPathWebm: "/demos/simple-crm-dashboard.webm",
      posterPath: "/demos/simple-crm-dashboard.jpg",
      caption: "Every lead, quote, and job in your pocket.",
      durationSec: 75,
    },
  },
  {
    id: "consulting",
    title: "Consulting & Advisory",
    priceRange: "Contact for quote",
    summary:
      "For teams that need help thinking through the right system before they build. Good fit when the problem is clear but the best implementation path is not.",
    timeline: "Typical timeline: depends on scope",
    whoItsFor: [
      "Owners who need a plan before committing to a bigger build",
      "Operations teams untangling a messy process",
      "Businesses that want a technical partner to scope the right next move",
    ],
    whatYouProvide: [
      "Context on the business problem and current tools",
      "Stakeholders who can explain constraints and priorities",
      "Clarity on what outcome actually matters",
    ],
    whatIDeliver: [
      "A practical recommendation, not abstract AI jargon",
      "Scope, priorities, and implementation guidance",
      "A clear next-step decision instead of more confusion",
    ],
    homepageBullets: [
      "Strategy before building",
      "Clear recommendations and practical scope",
      "Contact for quote",
    ],
    demo: {
      videoPath: "/demos/consulting-advisory.mp4",
      videoPathWebm: "/demos/consulting-advisory.webm",
      posterPath: "/demos/consulting-advisory.jpg",
      caption: "Strategy first. Build second. No AI theater.",
      durationSec: 75,
    },
  },
] satisfies Service[];

/**
 * Top-level overview demo that ties every service together.
 * Used in the homepage hero or a dedicated "/#demos" section.
 */
export const overviewDemo: ServiceDemo = {
  videoPath: "/demos/bartlett-labs-overview.mp4",
  videoPathWebm: "/demos/bartlett-labs-overview.webm",
  posterPath: "/demos/bartlett-labs-overview.jpg",
  caption: "Every call answered. Every quote followed up. Every customer asked for a review.",
  durationSec: 90,
};

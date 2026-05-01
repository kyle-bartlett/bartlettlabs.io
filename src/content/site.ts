import { founderPhotoAssets } from "./assets";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const siteConfig = {
  name: "Bartlett Labs",
  legalName: "Bartlett Labs LLC",
  domain: "https://bartlettlabs.io",
  city: "Crosby",
  state: "TX",
  regionLabel: "Serving Houston and the surrounding area",
  email: "kyle@bartlettlabs.io",
  phone: {
    raw: "+18326304317",
    display: "(832) 630-4317",
  },
  booking: {
    path: "/book",
    externalUrl:
      "https://api.leadconnectorhq.com/widget/booking/tnWattFiELBGpctlleU8",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/bartlett-labs",
    x: "https://twitter.com/Bartlett_Labs",
    store: "https://bartlettlabs.gumroad.com",
  },
  founder: {
    name: "Kyle Bartlett",
    title: "Founder & Systems Builder",
    hometownStory:
      "I grew up in a town of 1,000 people in rural Indiana, washing cars at my family's Ford dealership.",
    shortBio:
      "I'm Kyle Bartlett, a Purdue-trained engineer with 13 years across Sears, Belk, Apple, and Anker. I build websites, AI chatbots, and workflow automation for local businesses that need useful systems, not AI theater.",
    careerPath: ["Purdue", "Sears", "Belk", "Apple", "Anker"],
  },
  homepageAbout: {
    title: "Fortune 500 operations, built for local business.",
    intro: [
      "I grew up washing cars at my family's Ford dealership in rural Indiana, learning early on what it actually takes to keep a local business running. After graduating from Purdue University, I spent 13 years deep in enterprise operations, managing operations and fixing process messes for companies like Sears and Belk.",
      "At that scale, you learn one thing very quickly: flashy tech doesn't fix a broken process. Clean, reliable systems do.",
    ],
    chapters: [
      {
        title: "Why I started Bartlett Labs",
        paragraphs: [
          "I realized that the same operational rigor used by massive companies could be game-changing for local service businesses. But most local shops don't need a massive agency or expensive software bloat; they just need a system that works.",
          "Operating out of Crosby, Texas, I take an independent, lean approach to development. I take the systems used by massive companies and build them locally for Crosby businesses. No handoffs, no middle managers, just a clear build from start to finish.",
        ],
      },
      {
        title: "Off the keyboard",
        paragraphs: [
          "When I'm not building out digital infrastructure or dialing in a new automation workflow, I'm usually completely off the grid. I manage a hunting property out in West Texas and spend my free time focused on outdoor living. I believe the best code and the sharpest systems come from stepping away from the screen and staying grounded in the real world.",
        ],
      },
    ],
  },
  metrics: {
    automations: "300+",
    experienceYears: "13",
    fortune500: "Fortune 500 experience",
  },
  placeholders: {
    homePhoto: {
      eyebrow: "Founder Photo",
      title: "Homepage portrait slot",
      description:
        "Add a strong founder portrait here once final photography is ready.",
      asset: founderPhotoAssets.homeHero,
    },
    aboutPhoto: {
      eyebrow: "About Photo",
      title: "Personal portrait slot",
      description:
        "Use a different photo here than the homepage so the story feels more personal.",
      asset: founderPhotoAssets.aboutPage,
    },
  },
} as const;

export const primaryNavLinks: NavLink[] = [
  { label: "How It Works", href: "/#how" },
  { label: "Demos", href: "/#demos" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerSecondaryLinks: NavLink[] = [
  { label: "Quiz", href: "/quiz" },
  { label: "Calculator", href: "/calculator" },
  { label: "Store", href: siteConfig.social.store, external: true },
];

export const footerComplianceLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Email Opt-Out", href: "/email-opt-out" },
  { label: "SMS Opt-In", href: "/sms-opt-in" },
  { label: "SMS Opt-Out", href: "/sms-opt-out" },
  { label: "Data Deletion", href: "/data-deletion" },
];

export const footerPrimaryLinks: NavLink[] = [
  ...primaryNavLinks,
  { label: "Book", href: siteConfig.booking.path },
];

export const credibilityHighlights = [
  "Crosby-Based & Founder-Led",
  "Custom Built For Trades",
  "Built Around Your Actual Workflow",
] as const;

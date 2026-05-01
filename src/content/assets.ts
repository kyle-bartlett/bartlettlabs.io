export type VisualAsset = {
  id: string;
  kind: "founder-photo" | "work-screenshot";
  publicPath: string;
  alt: string;
  aspectRatio: "4:5" | "16:10";
  minWidth: number;
  minHeight: number;
  fit: "cover" | "contain";
  priority: "high" | "medium";
  usage: readonly string[];
  captureNotes: readonly string[];
};

export const founderPhotoAssets = {
  homeHero: {
    id: "home-hero-portrait",
    kind: "founder-photo",
    publicPath: "/images/founder/kyle-home-portrait.jpg",
    alt: "Kyle Bartlett portrait for the Bartlett Labs homepage hero",
    aspectRatio: "4:5",
    minWidth: 1600,
    minHeight: 2000,
    fit: "contain",
    priority: "high",
    usage: ["/"],
    captureNotes: [
      "Vertical portrait with direct eye contact and natural expression",
      "Neutral or lightly textured background",
      "Enough negative space to crop for responsive layouts",
    ],
  },
  aboutPage: {
    id: "about-page-portrait",
    kind: "founder-photo",
    publicPath: "/images/founder/kyle-about-portrait.jpg",
    alt: "Kyle Bartlett portrait for the Bartlett Labs about page",
    aspectRatio: "4:5",
    minWidth: 1600,
    minHeight: 2000,
    fit: "cover",
    priority: "medium",
    usage: ["/", "/about"],
    captureNotes: [
      "A different portrait than the homepage so the about page feels personal",
      "More casual or environmental framing is fine",
      "Keep lighting clean and avoid cluttered backgrounds",
    ],
  },
} satisfies Record<string, VisualAsset>;

export const workScreenshotAssets = {
  "santiagos-auto-repair": {
    id: "santiagos-auto-repair-primary",
    kind: "work-screenshot",
    publicPath: "/images/work/santiagos-auto-repair-primary.jpg",
    alt: "Primary Bartlett Labs concept screenshot for Santiago's Auto Repair",
    aspectRatio: "16:10",
    minWidth: 1600,
    minHeight: 1000,
    fit: "contain",
    priority: "high",
    usage: ["/", "/work"],
    captureNotes: [
      "Use the strongest homepage or service-page view",
      "Capture a full desktop browser view if possible",
      "Keep browser chrome minimal and text readable",
    ],
  },
  "five-stars-electric": {
    id: "five-stars-electric-primary",
    kind: "work-screenshot",
    publicPath: "/images/work/five-stars-electric-primary.jpg",
    alt: "Primary Bartlett Labs concept screenshot for 5 Stars Electric",
    aspectRatio: "16:10",
    minWidth: 1600,
    minHeight: 1000,
    fit: "contain",
    priority: "high",
    usage: ["/work"],
    captureNotes: [
      "Prioritize the trust-heavy lead capture view",
      "Show the strongest above-the-fold section",
      "Desktop orientation works best for the current layout",
    ],
  },
  "doggie-world-grooming": {
    id: "doggie-world-grooming-primary",
    kind: "work-screenshot",
    publicPath: "/images/work/doggie-world-grooming-primary.jpg",
    alt: "Primary Bartlett Labs concept screenshot for Doggie World Grooming",
    aspectRatio: "16:10",
    minWidth: 1600,
    minHeight: 1000,
    fit: "contain",
    priority: "high",
    usage: ["/work"],
    captureNotes: [
      "Use the scheduling or service-overview screen",
      "Aim for a bright desktop capture with readable CTA placement",
      "Avoid phone-only screenshots for this slot",
    ],
  },
  "lake-houston-fitness": {
    id: "lake-houston-fitness-primary",
    kind: "work-screenshot",
    publicPath: "/images/work/lake-houston-fitness-primary.jpg",
    alt: "Primary Bartlett Labs concept screenshot for Lake Houston Fitness",
    aspectRatio: "16:10",
    minWidth: 1600,
    minHeight: 1000,
    fit: "contain",
    priority: "medium",
    usage: ["/work"],
    captureNotes: [
      "Use the membership or class-schedule view",
      "Desktop capture with clean typography and CTA visibility",
      "Keep contrast strong enough to read at smaller card sizes",
    ],
  },
  "cycle-landscaping": {
    id: "cycle-landscaping-primary",
    kind: "work-screenshot",
    publicPath: "/images/work/cycle-landscaping-primary.jpg",
    alt: "Primary Bartlett Labs concept screenshot for CYCLE Landscaping",
    aspectRatio: "16:10",
    minWidth: 1600,
    minHeight: 1000,
    fit: "contain",
    priority: "medium",
    usage: ["/work"],
    captureNotes: [
      "Use the gallery-forward or estimate-request view",
      "Favor a composition with clear imagery and page structure",
      "Desktop capture is preferred for the current card layout",
    ],
  },
  "straight-off-the-road-bbq": {
    id: "straight-off-the-road-bbq-primary",
    kind: "work-screenshot",
    publicPath: "/images/work/straight-off-the-road-bbq-primary.jpg",
    alt: "Primary Bartlett Labs concept screenshot for Straight Off the Road BBQ",
    aspectRatio: "16:10",
    minWidth: 1600,
    minHeight: 1000,
    fit: "contain",
    priority: "medium",
    usage: ["/work"],
    captureNotes: [
      "Use the menu or catering conversion view",
      "Desktop screenshot with the strongest branded section",
      "Keep food photography sharp and text readable",
    ],
  },
} satisfies Record<string, VisualAsset>;

export const allVisualAssets = [
  ...Object.values(founderPhotoAssets),
  ...Object.values(workScreenshotAssets),
];

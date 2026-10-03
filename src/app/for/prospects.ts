// Booked Local fence proposal pages, one entry per prospect.
// Source: the ChatGPT-built pages, snapshot 2026-10-02
// (Dev_Expansion/Personal/Bartlett_Labs/bartlett-labs-chatGPT-sites/snapshot-2026-10-02).
// Rating and review counts are the public snapshot from August 14, 2026.

export type Upgrade = { title: string; detail: string; image: string };

export type Prospect = {
  slug: string;
  /** Visual variant from the original pages; maps to .prospect-layout-N in prospect.css. */
  layout: 0 | 1 | 2;
  name: string;
  shortName: string;
  area: string;
  phone: string;
  phoneHref: string;
  rating: number;
  reviews: number;
  website: string | null;
  googleProfile: string;
  websiteStatus: "working" | "outdated" | "none";
  accent: string;
  accentDark: string;
  hero: string;
  subhead: string;
  trustLine: string;
  customerPromise: string;
  services: string[];
  serviceImages: string[];
  qualifierLabel: string;
  qualifierOptions: string[];
  resultCopy: string;
  audit: string;
  packageName: string;
  packageSummary: string;
  upgrades: Upgrade[];
};

export const prospects: Prospect[] = [
  {
    slug: "aags-solutions",
    layout: 0,
    name: "AAGS Solutions LLC",
    shortName: "AAGS Solutions",
    area: "Cypress · Katy · Greater Houston",
    phone: "(346) 507-6303",
    phoneHref: "+13465076303",
    rating: 5,
    reviews: 48,
    website: "https://aagsolutionsllc.com/",
    googleProfile:
      "https://www.google.com/maps/place/AAGS+Solutions+LLC/data=!4m7!3m6!1s0x8640d7497bd7e549:0x6aae7374ab22f963!8m2!3d29.961757!4d-95.6682786!16s%2Fg%2F11w4vmtzm3!19sChIJSeXXe0nXQIYRY_kiq3Rzrmo?authuser=0&hl=en&rclk=1",
    websiteStatus: "working",
    accent: "#ce652d",
    accentDark: "#833814",
    hero: "Gate problem? Get the right next step—day or night.",
    subhead:
      "Automatic gate installation, emergency repair and access-control support across greater Houston.",
    trustLine:
      "A perfect-rating reputation matters most when the work controls access, security and daily reliability.",
    customerPromise:
      "The right response for emergency repair, a new gate or a smarter access system.",
    services: [
      "Emergency gate repair",
      "Automatic gate install",
      "Access control",
      "Fence repair",
    ],
    serviceImages: [
      "/booked-local/emergency-gate-repair.webp",
      "/booked-local/automatic-gate.webp",
      "/booked-local/access-control.webp",
      "/booked-local/fence-repair.webp",
    ],
    qualifierLabel: "How urgent is it?",
    qualifierOptions: [
      "Gate stuck now",
      "Needs repair this week",
      "New installation",
      "Planning an upgrade",
    ],
    resultCopy:
      "Emergency repairs route separately from new installations, with gate type, access issue and timing captured before callback.",
    audit:
      "AAGS serves both urgent failures and planned installations, but those buyers need different first questions. This concept turns the 24/7 promise into a triage experience and keeps the perfect-rating proof beside the security decision.",
    packageName: "24/7 Automatic Gate Triage System",
    packageSummary:
      "An emergency-versus-install intake, instant missed-call follow-up and conversion page for high-value gate work.",
    upgrades: [
      {
        title: "Emergency/install split",
        detail:
          "Route a stuck gate differently from a planned driveway-gate project.",
        image: "/booked-local/emergency-gate-repair.webp",
      },
      {
        title: "Gate-type intake",
        detail:
          "Capture swing, slide, operator, access-control and safety details before dispatch.",
        image: "/booked-local/automatic-gate.webp",
      },
      {
        title: "24/7 RepBot layer",
        detail:
          "Answer urgent callers and collect the critical information even outside office hours.",
        image: "/booked-local/access-control.webp",
      },
    ],
  },
  {
    slug: "brian-the-fence-guy",
    layout: 2,
    name: "Brian The Fence Guy",
    shortName: "Brian The Fence Guy",
    area: "Cypress · Katy · Tomball · Houston",
    phone: "(713) 515-9538",
    phoneHref: "+17135159538",
    rating: 5,
    reviews: 128,
    website: "https://brianthefenceguytx.com/",
    googleProfile:
      "https://www.google.com/maps/place/Brianthefenceguy/data=!4m7!3m6!1s0x298720fe2a55551d:0xde25573108c60aeb!8m2!3d29.9885048!4d-95.5588633!16s%2Fg%2F11mdjmx864!19sChIJHVVVKv4ghykR6wrGCDFXJd4?authuser=0&hl=en&rclk=1",
    websiteStatus: "working",
    accent: "#d47532",
    accentDark: "#874315",
    hero: "Your fence guy should show up, build it right and clean it up.",
    subhead:
      "Owner-led fence installation, repair and staining for Cypress and the greater Houston area.",
    trustLine:
      "A perfect-rating reputation built around punctual work, strong results, cleanup and haul-away.",
    customerPromise:
      "Personal accountability from the first answer through the final board hauled away.",
    services: [
      "Wood fence",
      "Chain link",
      "Wrought iron & gates",
      "Fence staining",
    ],
    serviceImages: [
      "/booked-local/wood-privacy-fence.webp",
      "/booked-local/chain-link-fence.webp",
      "/booked-local/wrought-iron-fence.webp",
      "/booked-local/fence-staining.webp",
    ],
    qualifierLabel: "What should the quote include?",
    qualifierOptions: [
      "New installation",
      "Tear-out & haul-away",
      "Repair",
      "Staining",
    ],
    resultCopy:
      "The request captures removal, access and finish details while keeping Brian’s personal accountability front and center.",
    audit:
      "Brian’s owner-led name is an advantage, but generic location pages dilute the personal story and inconsistent phone details can create doubt. This concept makes the founder promise, cleanup and haul-away the conversion spine.",
    packageName: "Owner-Led Estimate & Haul-Away System",
    packageSummary:
      "A founder-forward page, phone-detail cleanup and estimate flow built around the review themes that differentiate Brian.",
    upgrades: [
      {
        title: "Founder-first proof",
        detail:
          "Make the owner-led relationship visible before generic service descriptions.",
        image: "/booked-local/fence-repair.webp",
      },
      {
        title: "Cleanup and haul-away",
        detail:
          "Turn a repeatedly praised detail into a clear reason to choose Brian.",
        image: "/booked-local/fence-replacement.webp",
      },
      {
        title: "One consistent response path",
        detail:
          "Align phone, SMS consent and estimate follow-up so every contact detail reinforces trust.",
        image: "/booked-local/access-control.webp",
      },
    ],
  },
  {
    slug: "eb-privacy-fences",
    layout: 0,
    name: "EB Privacy Fences LLC",
    shortName: "EB Privacy Fences",
    area: "Katy · Fulshear · Cypress · Sugar Land",
    phone: "(832) 301-1569",
    phoneHref: "+18323011569",
    rating: 5,
    reviews: 105,
    website: "https://www.ebprivacyfenceskatytx.com/",
    googleProfile:
      "https://www.google.com/maps/place/EB+Privacy+Fences+LLC/data=!4m7!3m6!1s0x6999347d07a47d35:0x391c89bca707b62b!8m2!3d29.7582286!4d-95.7495456!16s%2Fg%2F11vjjqbrcr!19sChIJNX2kB300mWkRK7YHp7yJHDk?authuser=0&hl=en&rclk=1",
    websiteStatus: "working",
    accent: "#af6130",
    accentDark: "#71391b",
    hero: "Privacy starts with a fence that fits your home.",
    subhead:
      "Custom privacy fencing, repairs and gates with material options for Katy-area homes and Texas weather.",
    trustLine:
      "A perfect 5.0 reputation gives homeowners immediate confidence in the workmanship and finished look.",
    customerPromise:
      "The right height, style and material—explained before the first post goes in.",
    services: [
      "Western red cedar",
      "Japanese cedar",
      "Pine economy fence",
      "Custom gates",
    ],
    serviceImages: [
      "/booked-local/western-red-cedar.webp",
      "/booked-local/japanese-cedar.webp",
      "/booked-local/pressure-treated-pine.webp",
      "/booked-local/custom-gate.webp",
    ],
    qualifierLabel: "What are you optimizing for?",
    qualifierOptions: [
      "Maximum privacy",
      "Best longevity",
      "Lower upfront cost",
      "Custom design",
    ],
    resultCopy:
      "Homeowners leave with a clear good/better/best material path and the details needed for an exact measurement.",
    audit:
      "EB’s site contains useful material choices, but the volume of content makes the first decision harder than it needs to be. This concept turns those same options into a guided privacy-fence selector powered by the company’s perfect rating.",
    packageName: "Privacy Fence Visual Estimator",
    packageSummary:
      "A footage, height and material selector that packages EB’s expertise into a faster buying decision.",
    upgrades: [
      {
        title: "Good/better/best selector",
        detail:
          "Compare pine, Japanese cedar and Western red cedar around budget, life and appearance.",
        image: "/booked-local/pressure-treated-pine.webp",
      },
      {
        title: "Style-led gallery path",
        detail:
          "Move from the desired privacy and look to the right fence configuration.",
        image: "/booked-local/custom-wood-fence.webp",
      },
      {
        title: "Perfect-rating handoff",
        detail:
          "Keep the 5.0 review proof beside the estimate CTA instead of below long service copy.",
        image: "/booked-local/western-red-cedar.webp",
      },
    ],
  },
  {
    slug: "goat-fence-company",
    layout: 1,
    name: "GOAT Fence Company",
    shortName: "GOAT Fence Company",
    area: "Katy · Cypress · West Houston",
    phone: "(713) 294-1300",
    phoneHref: "+17132941300",
    rating: 4.8,
    reviews: 141,
    website: "https://www.goatfenceco.com/",
    googleProfile:
      "https://www.google.com/maps/place/GOAT+Fence+Company/data=!4m7!3m6!1s0x8641217abcdfdcbb:0x9488b2c64428c0b6!8m2!3d29.875645!4d-95.6543809!16s%2Fg%2F11gtytjdqh!19sChIJu9zfvHohQYYRtsAoRMayiJQ?authuser=0&hl=en&rclk=1",
    websiteStatus: "working",
    accent: "#c2672b",
    accentDark: "#7b3a13",
    hero: "Straight fences. Solid gates. Immediate answers.",
    subhead:
      "Fence installation, repair and replacement for Katy, Cypress and west Houston properties.",
    trustLine:
      "More than 140 reviews support the quality-workmanship promise and honest repair-versus-replacement advice.",
    customerPromise:
      "A clear scope, a clean jobsite and a gate that works the way it should.",
    services: ["Fence repair", "Wood fence", "Wrought iron", "Chain link"],
    serviceImages: [
      "/booked-local/fence-repair.webp",
      "/booked-local/wood-privacy-fence.webp",
      "/booked-local/wrought-iron-fence.webp",
      "/booked-local/chain-link-fence.webp",
    ],
    qualifierLabel: "What do you need?",
    qualifierOptions: [
      "Repair recommendation",
      "Full replacement",
      "New fence",
      "Gate work",
    ],
    resultCopy:
      "An instant acknowledgement replaces the current 1–2 business-day quote wait and starts the right conversation immediately.",
    audit:
      "GOAT already has a credible service story. The conversion gap is response time: the current site says appointment inquiries receive a call in one to two business days. This layer qualifies the work and replies while intent is still high.",
    packageName: "Instant Repair-or-Replace Response System",
    packageSummary:
      "A high-speed qualifier and missed-call layer added to an already credible West Houston brand.",
    upgrades: [
      {
        title: "Immediate acknowledgement",
        detail:
          "Give every caller or form lead a useful next step in seconds instead of days.",
        image: "/booked-local/access-control.webp",
      },
      {
        title: "Honest-scope qualifier",
        detail:
          "Separate repair, replacement, new installation and gate work before dispatch.",
        image: "/booked-local/fence-replacement.webp",
      },
      {
        title: "Review-to-estimate bridge",
        detail:
          "Place the quality-workmanship proof beside the action that starts the job.",
        image: "/booked-local/custom-wood-fence.webp",
      },
    ],
  },
  {
    slug: "lonestar-handywork",
    layout: 2,
    name: "Lonestar Handywork",
    shortName: "Lonestar Handywork",
    area: "Harris County · Montgomery County",
    phone: "(346) 475-7754",
    phoneHref: "+13464757754",
    rating: 5,
    reviews: 49,
    website: "https://fencebuildersofhouston.com/",
    googleProfile:
      "https://www.google.com/maps/place/Lonestar+Handywork/data=!4m7!3m6!1s0x21ae9889fe5dde1d:0x84f5058b29136843!8m2!3d29.7895199!4d-95.1776863!16s%2Fg%2F11nnr8pdvn!19sChIJHd5d_omYriERQ2gTKYsF9YQ?authuser=0&hl=en&rclk=1",
    websiteStatus: "outdated",
    accent: "#ba5b2a",
    accentDark: "#783716",
    hero: "A beautiful wood fence starts with a fast, clear plan.",
    subhead:
      "Traditional and custom residential wood fencing in pressure-treated pine and Western red cedar.",
    trustLine:
      "A perfect-rating reputation built on friendly service, fast response and beautiful finished work.",
    customerPromise:
      "Wood-fence craftsmanship with a simple, no-confusion quote process.",
    services: [
      "Pressure-treated pine",
      "Western red cedar",
      "Fence replacement",
      "Custom wood fence",
    ],
    serviceImages: [
      "/booked-local/pressure-treated-pine.webp",
      "/booked-local/western-red-cedar.webp",
      "/booked-local/fence-replacement.webp",
      "/booked-local/custom-wood-fence.webp",
    ],
    qualifierLabel: "Approximate fence length",
    qualifierOptions: ["Under 50 ft", "50–100 ft", "100–200 ft", "200+ ft"],
    resultCopy:
      "The request confirms the 50-foot project minimum, preferred wood and gate needs before scheduling a measurement.",
    audit:
      "The current site has strong project photography but still feels like an older brochure, and the Lonestar/Fence Builders naming split can create hesitation. This concept unifies the story and turns the 5.0 proof into a guided cedar-or-pine decision.",
    packageName: "Cedar/Pine Fast Quote System",
    packageSummary:
      "A unified brand story, wood-specific qualifier and clear minimum-project fit check.",
    upgrades: [
      {
        title: "One clear identity",
        detail:
          "Connect Lonestar Handywork and Fence Builders of Houston without making visitors decode the brand.",
        image: "/booked-local/custom-wood-fence.webp",
      },
      {
        title: "Wood option selector",
        detail:
          "Explain pine versus Western red cedar in the same flow that gathers footage and gates.",
        image: "/booked-local/western-red-cedar.webp",
      },
      {
        title: "Fast-response automation",
        detail:
          "Reply instantly even when a form arrives while the crew is building.",
        image: "/booked-local/access-control.webp",
      },
    ],
  },
  {
    slug: "n2-fencing",
    layout: 2,
    name: "N2 FENCING",
    shortName: "N2 FENCING",
    area: "Spring · North Houston",
    phone: "(936) 263-0091",
    phoneHref: "+19362630091",
    rating: 4.9,
    reviews: 152,
    website: "https://www.n2fencinghouston.com/",
    googleProfile:
      "https://www.google.com/maps/place/N2+FENCING/data=!4m7!3m6!1s0x86474b61c8a6da8f:0xc45c7b95de49a234!8m2!3d30.1300232!4d-95.3872252!16s%2Fg%2F11p55zk0ws!19sChIJj9qmyGFLR4YRNKJJ3pV7XMQ?authuser=0&hl=en&rclk=1",
    websiteStatus: "working",
    accent: "#d56e2f",
    accentDark: "#8a3e15",
    hero: "Repair it or replace it? Get an honest answer fast.",
    subhead:
      "Residential and commercial fence, railing and gate work backed by Spring-area craftsmanship.",
    trustLine:
      "More than 150 reviews reinforce speed, communication and crews that get the work right.",
    customerPromise:
      "No shortcuts, no guesswork and a clear recommendation before the build.",
    services: [
      "Fence repair",
      "Cedar fence",
      "Pine fence",
      "Iron fence & gates",
    ],
    serviceImages: [
      "/booked-local/fence-repair.webp",
      "/booked-local/western-red-cedar.webp",
      "/booked-local/pressure-treated-pine.webp",
      "/booked-local/wrought-iron-fence.webp",
    ],
    qualifierLabel: "What is happening now?",
    qualifierOptions: [
      "Leaning or damaged",
      "Gate will not work",
      "Full replacement",
      "New installation",
    ],
    resultCopy:
      "The intake separates urgent repair from replacement, so homeowners get a useful response before a site visit.",
    audit:
      "N2 has the strongest review volume in this list. The opportunity is not another generic page—it is a decision tool that turns the company’s fast-response reputation into an immediate repair-or-replace path.",
    packageName: "Repair-or-Replace Fast Response System",
    packageSummary:
      "A diagnostic intake page for urgent fence problems, replacement opportunities and after-hours calls.",
    upgrades: [
      {
        title: "Repair triage",
        detail:
          "Identify leaning sections, damaged posts, gate issues and replacement scope before dispatch.",
        image: "/booked-local/fence-repair.webp",
      },
      {
        title: "Speed as proof",
        detail:
          "Use the rapid-response review pattern as the main conversion promise.",
        image: "/booked-local/fence-replacement.webp",
      },
      {
        title: "After-hours capture",
        detail:
          "Keep an urgent fence issue from becoming the next contractor’s job.",
        image: "/booked-local/emergency-gate-repair.webp",
      },
    ],
  },
  {
    slug: "premier-fencing-company",
    layout: 0,
    name: "Premier Fencing Company",
    shortName: "Premier Fencing",
    area: "Humble · Atascocita · Kingwood",
    phone: "(832) 722-3635",
    phoneHref: "+18327223635",
    rating: 4.9,
    reviews: 132,
    website: "https://premierfencinghouston.com/",
    googleProfile:
      "https://www.google.com/maps/place/Premier+Fencing+Company/data=!4m7!3m6!1s0x8421a040499a5ad9:0x7347cf0247de313e!8m2!3d29.986612!4d-95.2243979!16s%2Fg%2F11l2vh84t8!19sChIJ2VqaSUCgIYQRPjHeRwLPR3M?authuser=0&hl=en&rclk=1",
    websiteStatus: "outdated",
    accent: "#d87934",
    accentDark: "#98491d",
    hero: "Quality fencing without the quote runaround.",
    subhead:
      "Wood, iron, chain-link, gates and repairs—planned clearly and built with care across northeast Houston.",
    trustLine:
      "Homeowners consistently mention quick replies, clear communication, punctual crews and a clean finish.",
    customerPromise: "Fast response. Straight answers. A jobsite left clean.",
    services: [
      "Wood privacy fence",
      "Custom gate",
      "Fence repair",
      "Commercial fence",
    ],
    serviceImages: [
      "/booked-local/wood-privacy-fence.webp",
      "/booked-local/custom-gate.webp",
      "/booked-local/fence-repair.webp",
      "/booked-local/commercial-fence.webp",
    ],
    qualifierLabel: "Approximate fence length",
    qualifierOptions: ["Under 75 ft", "75–150 ft", "150–250 ft", "250+ ft"],
    resultCopy:
      "A same-day reply with material options, a planning range and the right next measurement step.",
    audit:
      "Premier’s reputation is stronger than its current handoff. This concept brings the review proof, service choices and estimate action into the first screen, then removes the form friction that can stop a ready homeowner.",
    packageName: "Fast-Quote Cedar & Gate System",
    packageSummary:
      "A conversion-first Humble-area landing page paired with a fence qualifier and immediate missed-call follow-up.",
    upgrades: [
      {
        title: "Review-led first screen",
        detail:
          "Lead with the response, cleanup and cedar-craftsmanship themes customers already trust.",
        image: "/booked-local/western-red-cedar.webp",
      },
      {
        title: "Linear-foot qualifier",
        detail:
          "Collect material, footage, gate count, timing and photos before the first callback.",
        image: "/booked-local/fence-replacement.webp",
      },
      {
        title: "RepBot recovery",
        detail:
          "Answer missed and after-hours calls while the crew is on a jobsite.",
        image: "/booked-local/access-control.webp",
      },
    ],
  },
  {
    slug: "rafter-v-services",
    layout: 0,
    name: "Rafter V Services",
    shortName: "Rafter V Services",
    area: "Cypress · Tomball · The Woodlands",
    phone: "(832) 799-4006",
    phoneHref: "+18327994006",
    rating: 5,
    reviews: 37,
    website: "https://raftervservices.com/",
    googleProfile:
      "https://www.google.com/maps/place/Rafter+V+Services/data=!4m7!3m6!1s0x56947d73820b05b:0x77cbe59c11e9c30b!8m2!3d29.836095!4d-95.484649!16s%2Fg%2F11vz7jn8lv!19sChIJW7AgONdHaQURC8PpEZzly3c?authuser=0&hl=en&rclk=1",
    websiteStatus: "outdated",
    accent: "#b56c37",
    accentDark: "#75411f",
    hero: "Built for privacy. Built for Houston weather.",
    subhead:
      "Fence installation, replacement and exterior improvements for Cypress-area homes.",
    trustLine:
      "Customers say the finished work exceeds expectations—exactly the proof a first-time visitor needs to see.",
    customerPromise:
      "A stronger property, a cleaner process and details handled from quote to walkthrough.",
    services: ["Wood fence", "Vinyl fence", "Chain-link fence", "Wrought iron"],
    serviceImages: [
      "/booked-local/wood-privacy-fence.webp",
      "/booked-local/vinyl-fence.webp",
      "/booked-local/chain-link-fence.webp",
      "/booked-local/wrought-iron-fence.webp",
    ],
    qualifierLabel: "What matters most?",
    qualifierOptions: ["Privacy", "Security", "Low maintenance", "Curb appeal"],
    resultCopy:
      "The flow recommends a material path, captures project photos and prepares the estimate conversation before the visit.",
    audit:
      "The existing site covers many services, but template remnants and empty-looking sections weaken the otherwise perfect reputation. This version narrows the first journey to fencing, then lets decks and concrete remain secondary cross-sells.",
    packageName: "Cypress Fence-First Conversion System",
    packageSummary:
      "A focused fence entry page that replaces template residue with material guidance and real proof.",
    upgrades: [
      {
        title: "Fence-first positioning",
        detail:
          "Lead with the service Google visitors are already looking for instead of every exterior service at once.",
        image: "/booked-local/wood-privacy-fence.webp",
      },
      {
        title: "Material-fit guide",
        detail:
          "Match privacy, security and maintenance goals to wood, vinyl, chain link or iron.",
        image: "/booked-local/vinyl-fence.webp",
      },
      {
        title: "Clean conversion layer",
        detail:
          "Remove placeholder signals and follow every request with an immediate next step.",
        image: "/booked-local/custom-wood-fence.webp",
      },
    ],
  },
  {
    slug: "southtex-fence-trees",
    layout: 1,
    name: "Southtex Fence & Trees LLC",
    shortName: "Southtex Fence & Trees",
    area: "Pasadena · Deer Park · Southeast Houston",
    phone: "(346) 251-3357",
    phoneHref: "+13462513357",
    rating: 4.9,
    reviews: 108,
    website: "https://southtexfencetrees.com/",
    googleProfile:
      "https://www.google.com/maps/place/Southtex+Fence+%26+Trees+LLC/data=!4m7!3m6!1s0x8640a394a3a15c7d:0x7d22fcfec525693b!8m2!3d29.7005227!4d-95.2060151!16s%2Fg%2F11k0t_nyqc!19sChIJfVyho5SjQIYRO2klxf78In0?authuser=0&hl=en&rclk=1",
    websiteStatus: "outdated",
    accent: "#dc6b35",
    accentDark: "#93431f",
    hero: "Fence work and tree service—one fast way to get help.",
    subhead:
      "Reliable fencing, tree removal and storm cleanup for Pasadena and the surrounding communities.",
    trustLine:
      "Customers highlight on-time crews, careful cleanup and a finished fence that looks right.",
    customerPromise:
      "Texas-proud workmanship from the fence line to the tree line.",
    services: ["New fence", "Fence repair", "Tree removal", "Storm cleanup"],
    serviceImages: [
      "/booked-local/wood-privacy-fence.webp",
      "/booked-local/fence-repair.webp",
      "/booked-local/tree-removal.webp",
      "/booked-local/storm-cleanup.webp",
    ],
    qualifierLabel: "When do you need help?",
    qualifierOptions: [
      "Emergency / today",
      "Within 7 days",
      "This month",
      "Planning ahead",
    ],
    resultCopy:
      "Fence projects and urgent tree work follow separate paths, so the right details reach the right crew immediately.",
    audit:
      "Fence shoppers and urgent tree-service callers currently enter the same basic path. This version makes the two sides of the business instantly clear and gives storm-related leads a faster route after hours.",
    packageName: "Fence + Storm Response System",
    packageSummary:
      "Two focused service paths, one shared intake system and 24/7 recovery for high-urgency calls.",
    upgrades: [
      {
        title: "Two-path customer journey",
        detail:
          "Let visitors choose Fence or Tree Service before the form asks anything else.",
        image: "/booked-local/tree-removal.webp",
      },
      {
        title: "Photo-first intake",
        detail:
          "Collect fence lines, damaged sections, fallen limbs or access concerns with the request.",
        image: "/booked-local/fence-repair.webp",
      },
      {
        title: "Urgent-call routing",
        detail:
          "Use RepBot to distinguish emergency cleanup from planned estimates after hours.",
        image: "/booked-local/storm-cleanup.webp",
      },
    ],
  },
  {
    slug: "westgate-fencing",
    layout: 1,
    name: "Westgate Fencing",
    shortName: "Westgate Fencing",
    area: "Pearland · South Houston",
    phone: "(713) 969-7776",
    phoneHref: "+17139697776",
    rating: 4.9,
    reviews: 11,
    website: null,
    googleProfile:
      "https://www.google.com/maps/place/Westgate+Fencing/data=!4m7!3m6!1s0x853c86ea0e0a2e3f:0x8e26dbb25031c02c!8m2!3d29.612!4d-95.4539135!16s%2Fg%2F11x7k5pyn9!19sChIJPy4KDuqGPIURLMAxULLbJo4?authuser=0&hl=en&rclk=1",
    websiteStatus: "none",
    accent: "#c36c32",
    accentDark: "#7f3f1b",
    hero: "A fence built right. A quote without the chase.",
    subhead:
      "Professional wood-fence installation for Pearland and the south Houston area.",
    trustLine:
      "Early customers already praise fast, efficient work, solid pricing and a clean, on-schedule finish.",
    customerPromise:
      "Professional from the first response to the final cleanup.",
    services: [
      "Wood fence installation",
      "Fence replacement",
      "Gate installation",
      "Fence repair",
    ],
    serviceImages: [
      "/booked-local/wood-privacy-fence.webp",
      "/booked-local/fence-replacement.webp",
      "/booked-local/custom-gate.webp",
      "/booked-local/fence-repair.webp",
    ],
    qualifierLabel: "Where is the project?",
    qualifierOptions: ["Backyard", "Side yard", "Full property", "Repair area"],
    resultCopy:
      "A first website gives homeowners a place to see the work, choose the project and request an estimate at any hour.",
    audit:
      "Westgate already has the beginning of a strong local reputation but no website was found. This is the highest-leverage version: a professional first impression, a visible project path and a reliable follow-up system launched together.",
    packageName: "First Website + 24/7 Estimate System",
    packageSummary:
      "A complete first web presence designed to turn every new review into the next estimate request.",
    upgrades: [
      {
        title: "First owned web presence",
        detail:
          "Give Google visitors a trustworthy destination with services, proof and one-tap phone access.",
        image: "/booked-local/wood-privacy-fence.webp",
      },
      {
        title: "Simple fence estimator",
        detail:
          "Gather project type, location, approximate size, gate needs and photos.",
        image: "/booked-local/fence-replacement.webp",
      },
      {
        title: "Always-on response",
        detail:
          "Make a small operation feel available without keeping the owner tied to the phone.",
        image: "/booked-local/access-control.webp",
      },
    ],
  },
];

export function getProspect(slug: string): Prospect | undefined {
  return prospects.find((p) => p.slug === slug);
}

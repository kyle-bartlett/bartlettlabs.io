import type { LucideIcon } from "lucide-react";
import {
  Bot,
  CalendarCheck,
  ClipboardCheck,
  Gauge,
  MessageSquareText,
  PhoneCall,
  SearchCheck,
  ShieldCheck,
  Star,
  TrendingUp,
} from "lucide-react";

export type SystemEngine = {
  title: string;
  kicker: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
};

export type PricingTier = {
  name: string;
  summary: string;
  price: string;
  bestFor: string;
  features: string[];
};

export type ExpansionModule = {
  title: string;
  price: string;
  summary: string;
  bestFor: string;
  icon: LucideIcon;
};

export type IndustryProfile = {
  slug: string;
  label: string;
  eyebrow: string;
  headline: string;
  summary: string;
  missedRevenue: string;
  leadValue: string;
  urgency: string;
  reviewNeed: string;
  dispatchNotes: string;
  emergencyTerms: string[];
  automations: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export type ServiceAreaProfile = {
  slug: string;
  label: string;
  county: string;
  headline: string;
  summary: string;
  marketSignals: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  neighborhoods: string[];
  industries: string[];
};

export const systemEngines = [
  {
    title: "Lead Capture",
    kicker: "Every call answered",
    description:
      "Missed calls, website chats, Facebook messages, and Google Business Profile messages all land in one response flow.",
    icon: PhoneCall,
    bullets: [
      "AI voice intake for after-hours calls",
      "Missed-call text-back in seconds",
      "Lead details logged into one pipeline",
    ],
  },
  {
    title: "Lead Conversion",
    kicker: "Every quote followed up",
    description:
      "The system keeps prospects warm with plain-English SMS and email until they book, reply, or tell you no.",
    icon: MessageSquareText,
    bullets: [
      "Automated quote follow-up",
      "Calendar links and reminders",
      "Owner alerts for hot opportunities",
    ],
  },
  {
    title: "Reputation Growth",
    kicker: "Every happy customer asked",
    description:
      "Completed jobs trigger review requests, referral nudges, and simple reporting so good work turns into local proof.",
    icon: Star,
    bullets: [
      "Google review request flows",
      "Service-area proof collection",
      "Weekly dashboard snapshots",
    ],
  },
] satisfies SystemEngine[];

export const proofMetrics = [
  {
    value: "Under 2 min",
    label: "target response time",
    detail: "for missed-call text-back and new web leads",
  },
  {
    value: "24/7",
    label: "lead coverage",
    detail: "for nights, weekends, and job-site busy hours",
  },
  {
    value: "7 days",
    label: "typical launch window",
    detail: "for the first usable version of the system",
  },
  {
    value: "3 engines",
    label: "one operating system",
    detail: "calls, follow-up, and reviews working together",
  },
] as const;

export const pricingTiers = [
  {
    name: "Solo",
    summary: "For one-truck operators and owner-led shops that need the phones covered.",
    price: "$497/mo + setup",
    bestFor: "Owner-operators",
    features: [
      "Missed-call text-back",
      "Basic web chat and lead forms",
      "Google review request flow",
      "Weekly owner summary",
    ],
  },
  {
    name: "Crew",
    summary: "For growing service teams that need follow-up, dispatch visibility, and cleaner handoffs.",
    price: "$897/mo + setup",
    bestFor: "2-8 person teams",
    features: [
      "Everything in Solo",
      "AI voice intake option",
      "Quote follow-up sequences",
      "Pipeline dashboard and alerts",
    ],
  },
  {
    name: "Herd",
    summary: "For multi-location or high-volume teams that want the whole growth system.",
    price: "$1,297/mo + setup",
    bestFor: "Multi-crew teams",
    features: [
      "Everything in Crew",
      "Advanced routing by service area",
      "Campaign reactivation",
      "Monthly optimization call",
    ],
  },
] satisfies PricingTier[];

export const expansionModules = [
  {
    title: "Database Reactivation",
    price: "$197/mo",
    summary:
      "Turn old customers, unbooked quotes, and stale lead lists into fresh conversations.",
    bestFor: "Any shop with past customers",
    icon: TrendingUp,
  },
  {
    title: "Seasonal Campaigns",
    price: "$297/mo",
    summary:
      "Pre-built tune-up, storm, heatwave, holiday, and slow-season campaigns.",
    bestFor: "Trades with seasonal swings",
    icon: CalendarCheck,
  },
  {
    title: "Membership Builder",
    price: "$397/mo",
    summary:
      "A service-plan funnel with reminders, renewals, and follow-ups built into the CRM.",
    bestFor: "Maintenance-heavy businesses",
    icon: ClipboardCheck,
  },
  {
    title: "Security Review",
    price: "Included",
    summary:
      "Plain-English privacy notes, consent language, and data-handling checks before launch.",
    bestFor: "Owners nervous about AI",
    icon: ShieldCheck,
  },
] satisfies ExpansionModule[];

export const industries = [
  {
    slug: "hvac",
    label: "HVAC",
    eyebrow: "HVAC growth system",
    headline: "The call-answering and follow-up system for HVAC contractors.",
    summary:
      "When the heat breaks, homeowners call whoever answers first. Bartlett Labs keeps emergency calls, tune-up requests, quotes, and review requests moving even when your techs are in an attic.",
    missedRevenue: "High",
    leadValue: "$250-$1,200",
    urgency: "Severe after-hours spikes",
    reviewNeed: "Map-pack reviews compound fast",
    dispatchNotes: "Tune-ups, emergency calls, replacements, maintenance plans",
    emergencyTerms: ["no cooling", "no heat", "AC not working", "same-day repair"],
    automations: [
      "Emergency intake with owner escalation",
      "Tune-up reminder campaigns",
      "Quote follow-up for replacements",
      "Post-job review requests",
    ],
    faqs: [
      {
        question: "Can this handle emergency HVAC calls?",
        answer:
          "Yes. Calls can be tagged by urgency, summarized, pushed into the CRM, and escalated to the right phone number.",
      },
      {
        question: "Does it replace my dispatcher?",
        answer:
          "No. It covers the gaps, organizes the intake, and keeps follow-up moving so your team spends less time chasing details.",
      },
    ],
  },
  {
    slug: "plumbing",
    label: "Plumbing",
    eyebrow: "Plumbing growth system",
    headline: "Stop losing burst-pipe, drain, and water-heater calls to voicemail.",
    summary:
      "Plumbing leads are urgent and impatient. The system captures the issue, location, photos, availability, and owner alerts before the caller moves to the next result.",
    missedRevenue: "Very high",
    leadValue: "$175-$2,500",
    urgency: "Emergency calls nights and weekends",
    reviewNeed: "Trust matters before entry into the home",
    dispatchNotes: "Leaks, clogs, water heaters, repipes, camera inspections",
    emergencyTerms: ["burst pipe", "water leak", "clogged drain", "water heater"],
    automations: [
      "Missed-call text-back with issue capture",
      "Photo upload prompts",
      "Appointment reminders",
      "Review request after job close",
    ],
    faqs: [
      {
        question: "Can customers send photos?",
        answer:
          "Yes. The intake flow can request photos and keep them attached to the lead record.",
      },
      {
        question: "Can it prioritize emergencies?",
        answer:
          "Yes. Keywords and form answers can route urgent jobs to a faster owner alert.",
      },
    ],
  },
  {
    slug: "electricians",
    label: "Electricians",
    eyebrow: "Electrical growth system",
    headline: "A cleaner intake system for repairs, panels, EV chargers, and emergency calls.",
    summary:
      "Electrical work needs speed and trust. Bartlett Labs helps capture job details, qualification notes, photos, and scheduling windows before the first callback.",
    missedRevenue: "High",
    leadValue: "$200-$4,500",
    urgency: "Safety language needs fast routing",
    reviewNeed: "License and trust proof matter",
    dispatchNotes: "Panels, generators, EV chargers, lighting, troubleshooting",
    emergencyTerms: ["sparking", "breaker", "power outage", "burning smell"],
    automations: [
      "Safety-keyword escalation",
      "Quote follow-up for larger installs",
      "EV charger inquiry workflow",
      "Service-area review collection",
    ],
    faqs: [
      {
        question: "Can this distinguish repair calls from install quotes?",
        answer:
          "Yes. The intake can classify job type and route each one into a different pipeline stage.",
      },
      {
        question: "Can it include license and insurance trust cues?",
        answer:
          "Yes. Those can be built into forms, follow-up messages, landing pages, and review prompts.",
      },
    ],
  },
  {
    slug: "water-damage",
    label: "Water Damage",
    eyebrow: "Restoration growth system",
    headline: "Capture mitigation calls while the customer is still in panic mode.",
    summary:
      "Restoration leads move fast. The system collects photos, source details, insurance notes, and urgency while alerting the team immediately.",
    missedRevenue: "Severe",
    leadValue: "$1,500-$10,000+",
    urgency: "Immediate response expected",
    reviewNeed: "Proof lowers panic and skepticism",
    dispatchNotes: "Water removal, drying, mold checks, insurance intake",
    emergencyTerms: ["flooded", "water damage", "insurance", "mitigation"],
    automations: [
      "Emergency phone escalation",
      "Insurance detail capture",
      "Photo and address intake",
      "Status updates during mitigation",
    ],
    faqs: [
      {
        question: "Can this alert my team immediately?",
        answer:
          "Yes. Critical jobs can trigger SMS, email, and CRM alerts at the same time.",
      },
      {
        question: "Can it gather insurance information?",
        answer:
          "Yes. The workflow can capture carrier, claim status, and adjuster notes before the callback.",
      },
    ],
  },
  {
    slug: "roofing",
    label: "Roofing",
    eyebrow: "Roofing growth system",
    headline: "A storm-ready system for inspections, estimates, and claim follow-up.",
    summary:
      "After a storm, speed and organization decide who gets the roof. Bartlett Labs captures inspection requests, neighborhoods, photos, and quote follow-ups.",
    missedRevenue: "High during storm windows",
    leadValue: "$500-$15,000+",
    urgency: "Weather-driven lead surges",
    reviewNeed: "Local proof wins neighborhoods",
    dispatchNotes: "Inspections, repairs, replacements, insurance claims",
    emergencyTerms: ["leak", "hail", "storm damage", "roof inspection"],
    automations: [
      "Storm-response intake",
      "Inspection scheduling",
      "Neighborhood campaign lists",
      "Estimate follow-up",
    ],
    faqs: [
      {
        question: "Can this support storm campaigns?",
        answer:
          "Yes. Campaigns can be built for specific neighborhoods, ZIP codes, and recent weather events.",
      },
      {
        question: "Can it help after the inspection?",
        answer:
          "Yes. Estimate follow-up, photo notes, and review requests can all run through the same CRM.",
      },
    ],
  },
  {
    slug: "garage-door",
    label: "Garage Door",
    eyebrow: "Garage door growth system",
    headline: "Fast response for stuck doors, broken springs, openers, and replacements.",
    summary:
      "Garage door customers usually need help now. The system routes repair calls, captures model details, and keeps replacement quotes from going stale.",
    missedRevenue: "High",
    leadValue: "$150-$2,000",
    urgency: "Same-day service expected",
    reviewNeed: "Speed and reliability proof",
    dispatchNotes: "Springs, doors, tracks, openers, emergency service",
    emergencyTerms: ["broken spring", "door stuck", "opener", "same day"],
    automations: [
      "Same-day availability prompts",
      "Photo capture",
      "Repair vs replacement routing",
      "Quote follow-up",
    ],
    faqs: [
      {
        question: "Can the intake ask for door photos?",
        answer:
          "Yes. Photo prompts can be included in chat, forms, and SMS follow-up.",
      },
      {
        question: "Can it route same-day jobs differently?",
        answer:
          "Yes. Same-day requests can trigger priority owner alerts and calendar links.",
      },
    ],
  },
  {
    slug: "appliance-repair",
    label: "Appliance Repair",
    eyebrow: "Appliance repair growth system",
    headline: "Turn model-number chaos into cleaner repair intake.",
    summary:
      "Appliance calls need details. Bartlett Labs captures appliance type, brand, symptoms, model numbers, location, and preferred windows.",
    missedRevenue: "Medium-high",
    leadValue: "$100-$750",
    urgency: "Food spoilage and laundry backup",
    reviewNeed: "Trust for in-home repair",
    dispatchNotes: "Refrigerators, washers, dryers, ovens, dishwashers",
    emergencyTerms: ["fridge not cooling", "washer leaking", "dryer", "model number"],
    automations: [
      "Model and brand capture",
      "Photo upload prompts",
      "Parts follow-up",
      "Appointment confirmations",
    ],
    faqs: [
      {
        question: "Can it ask for model numbers?",
        answer:
          "Yes. The system can request model and serial photos before a tech spends time calling back.",
      },
      {
        question: "Can it separate brands or appliance types?",
        answer:
          "Yes. Each appliance type can route into a different set of intake questions.",
      },
    ],
  },
  {
    slug: "locksmith",
    label: "Locksmith",
    eyebrow: "Locksmith growth system",
    headline: "Capture lockout, rekey, smart lock, and commercial calls quickly.",
    summary:
      "Locksmith leads are immediate and trust-sensitive. The system captures location, proof needs, job type, and urgency before dispatch.",
    missedRevenue: "High",
    leadValue: "$100-$1,500",
    urgency: "Immediate lockout expectations",
    reviewNeed: "Trust and legitimacy are critical",
    dispatchNotes: "Lockouts, rekeys, smart locks, commercial hardware",
    emergencyTerms: ["locked out", "rekey", "smart lock", "commercial lock"],
    automations: [
      "Urgency routing",
      "Address and access notes",
      "Commercial quote follow-up",
      "Post-service review request",
    ],
    faqs: [
      {
        question: "Can it handle emergency lockouts?",
        answer:
          "Yes. Emergency language can trigger direct phone alerts instead of waiting in a general inbox.",
      },
      {
        question: "Can it support commercial quotes?",
        answer:
          "Yes. Commercial jobs can move into a quote pipeline with follow-up tasks.",
      },
    ],
  },
  {
    slug: "tree-service",
    label: "Tree Service",
    eyebrow: "Tree service growth system",
    headline: "A quote and storm-response system for tree crews.",
    summary:
      "Tree service leads depend on photos, location, access, and urgency. The workflow captures the details before your crew gets on the phone.",
    missedRevenue: "Storm-dependent",
    leadValue: "$300-$5,000+",
    urgency: "Weather and property-risk spikes",
    reviewNeed: "Safety proof matters",
    dispatchNotes: "Removal, trimming, storm cleanup, stump grinding",
    emergencyTerms: ["tree down", "limb on roof", "storm cleanup", "stump"],
    automations: [
      "Photo-first estimate flow",
      "Storm cleanup triage",
      "Estimate follow-up",
      "Review request after cleanup",
    ],
    faqs: [
      {
        question: "Can customers send tree photos?",
        answer:
          "Yes. Photo collection is one of the best fits for tree-service intake.",
      },
      {
        question: "Can it support storm cleanup surges?",
        answer:
          "Yes. Storm campaigns and priority routing can be added when weather drives demand.",
      },
    ],
  },
  {
    slug: "septic",
    label: "Septic",
    eyebrow: "Septic growth system",
    headline: "A cleaner intake system for pumping, inspections, and emergency backups.",
    summary:
      "Septic customers often call when the problem is already bad. The system captures urgency, tank info, access notes, and service history.",
    missedRevenue: "High when urgent",
    leadValue: "$250-$3,500",
    urgency: "Emergency backup calls",
    reviewNeed: "Local trust and reliability",
    dispatchNotes: "Pumping, inspection, repairs, aerobic systems",
    emergencyTerms: ["backup", "septic smell", "alarm", "pumping"],
    automations: [
      "Emergency triage",
      "Maintenance reminder campaigns",
      "Tank/access detail capture",
      "Review requests",
    ],
    faqs: [
      {
        question: "Can this remind customers about maintenance?",
        answer:
          "Yes. Past customers can receive scheduled maintenance reminders and booking links.",
      },
      {
        question: "Can it collect access notes?",
        answer:
          "Yes. Gate codes, tank location, pet notes, and property access can all be captured.",
      },
    ],
  },
  {
    slug: "auto-glass",
    label: "Auto Glass",
    eyebrow: "Auto glass growth system",
    headline: "Mobile glass intake for chips, cracks, replacements, and insurance notes.",
    summary:
      "Auto-glass leads need photos, vehicle details, location, and insurance information. Bartlett Labs keeps that intake organized.",
    missedRevenue: "Medium-high",
    leadValue: "$100-$900",
    urgency: "Mobile convenience wins",
    reviewNeed: "Fast service proof",
    dispatchNotes: "Windshields, chips, side glass, mobile repair",
    emergencyTerms: ["windshield", "chip", "crack", "insurance"],
    automations: [
      "Vehicle detail capture",
      "Photo prompts",
      "Insurance workflow",
      "Mobile appointment reminders",
    ],
    faqs: [
      {
        question: "Can it gather vehicle information?",
        answer:
          "Yes. Year, make, model, VIN notes, and glass location can be captured before quoting.",
      },
      {
        question: "Can it support mobile appointments?",
        answer:
          "Yes. Appointment reminders can include address, parking, and access instructions.",
      },
    ],
  },
  {
    slug: "wildlife-pest",
    label: "Wildlife & Pest",
    eyebrow: "Wildlife and pest growth system",
    headline: "Capture urgent pest, rodent, attic, and wildlife calls before they move on.",
    summary:
      "Pest and wildlife leads need fast reassurance. The system captures issue type, location, photos, access notes, and urgency.",
    missedRevenue: "High",
    leadValue: "$150-$2,500",
    urgency: "Fear and property-risk driven",
    reviewNeed: "Trust and discretion matter",
    dispatchNotes: "Rodents, insects, attic noises, exclusion, recurring plans",
    emergencyTerms: ["rats", "wasps", "animal in attic", "pest control"],
    automations: [
      "Issue-type routing",
      "Photo and location prompts",
      "Recurring plan follow-up",
      "Review request after service",
    ],
    faqs: [
      {
        question: "Can the system identify recurring-plan opportunities?",
        answer:
          "Yes. The CRM can tag one-time jobs and trigger follow-up for maintenance plans.",
      },
      {
        question: "Can it handle sensitive pest calls carefully?",
        answer:
          "Yes. Messages can be written in a calm, direct voice without making the customer feel embarrassed.",
      },
    ],
  },
] satisfies IndustryProfile[];

export const serviceAreas = [
  {
    slug: "houston",
    label: "Houston",
    county: "Harris County",
    headline: "Houston service businesses need speed, trust, and follow-up that never sleeps.",
    summary:
      "Big search volume, long drives, and impatient customers make Houston a brutal market for missed calls. Bartlett Labs helps crews keep leads organized across neighborhoods, ZIP codes, and dispatch windows.",
    marketSignals: [
      {
        label: "Market pressure",
        value: "Very high",
        description: "Large metro demand with heavy competition in every service category.",
      },
      {
        label: "After-hours risk",
        value: "High",
        description: "Emergency home-service searches keep moving after the office closes.",
      },
      {
        label: "Best first build",
        value: "Lead capture",
        description: "Missed-call text-back, web chat, and owner alerts produce fast clarity.",
      },
    ],
    neighborhoods: ["Heights", "Memorial", "Westchase", "Midtown", "Spring Branch", "Energy Corridor"],
    industries: ["HVAC", "Plumbing", "Electrical", "Roofing"],
  },
  {
    slug: "crosby",
    label: "Crosby",
    county: "Harris County",
    headline: "Crosby owners need local trust with systems that feel easy to use.",
    summary:
      "Crosby is relationship-driven, but customers still search, text, and compare online. The system keeps the handshake feel while making sure leads do not disappear.",
    marketSignals: [
      {
        label: "Local trust",
        value: "Critical",
        description: "Founder-led proof and fast response matter more than agency polish.",
      },
      {
        label: "After-hours risk",
        value: "High",
        description: "Owners in the field miss calls while customers keep searching.",
      },
      {
        label: "Best first build",
        value: "Missed-call recovery",
        description: "A simple text-back system can plug the first obvious leak.",
      },
    ],
    neighborhoods: ["Newport", "Barrett", "Lake Houston", "FM 2100", "Indian Shores", "Crosby Lynchburg"],
    industries: ["HVAC", "Plumbing", "Auto Repair", "Tree Service"],
  },
  {
    slug: "baytown",
    label: "Baytown",
    county: "Harris County",
    headline: "Baytown crews need lead routing built around industrial schedules and busy roads.",
    summary:
      "Baytown mixes residential demand, industrial work, and urgent repairs. Bartlett Labs helps route calls, photos, and follow-ups without adding a new software mess.",
    marketSignals: [
      { label: "Market pressure", value: "High", description: "Strong service demand across residential and industrial corridors." },
      { label: "Scheduling complexity", value: "High", description: "Jobs often depend on crew availability, site access, and travel windows." },
      { label: "Best first build", value: "CRM dashboard", description: "One pipeline helps owners see every active lead and job." },
    ],
    neighborhoods: ["Garth Road", "Bayway", "Cedar Bayou", "Highlands", "Mont Belvieu edge", "Wooster"],
    industries: ["Electrical", "Plumbing", "HVAC", "Auto Glass"],
  },
  {
    slug: "humble",
    label: "Humble",
    county: "Harris County",
    headline: "Humble service teams need quick response across fast-growing neighborhoods.",
    summary:
      "Around Humble and Lake Houston, customers compare options quickly. Bartlett Labs helps owners respond, book, and follow up before competitors get the second call.",
    marketSignals: [
      { label: "Growth pressure", value: "High", description: "Expanding neighborhoods create steady service demand." },
      { label: "Review importance", value: "High", description: "Map-pack reputation influences who gets the call." },
      { label: "Best first build", value: "Reviews + follow-up", description: "Review velocity and quote follow-up strengthen local search." },
    ],
    neighborhoods: ["Atascocita edge", "Fall Creek", "Eagle Springs", "Deerbrook", "Lake Houston", "Timberwood"],
    industries: ["HVAC", "Garage Door", "Pest Control", "Roofing"],
  },
  {
    slug: "atascocita",
    label: "Atascocita",
    county: "Harris County",
    headline: "Atascocita is a review-driven service market where fast follow-up wins.",
    summary:
      "Homeowners here often compare multiple providers. A clean response system helps service teams look organized from the first text.",
    marketSignals: [
      { label: "Homeowner density", value: "High", description: "Suburban service demand rewards quick quoting and reminders." },
      { label: "Review importance", value: "Very high", description: "Customers lean on Google reviews before inviting crews into the home." },
      { label: "Best first build", value: "Reputation engine", description: "Automated review requests compound proof over time." },
    ],
    neighborhoods: ["Eagle Springs", "Walden", "Pinehurst", "Kings River", "Atascocita Shores", "Lakewood Pines"],
    industries: ["HVAC", "Plumbing", "Electrical", "Appliance Repair"],
  },
  {
    slug: "kingwood",
    label: "Kingwood",
    county: "Harris County",
    headline: "Kingwood service businesses need polished follow-up without losing the local feel.",
    summary:
      "Kingwood customers expect clear communication. Bartlett Labs gives owners a cleaner way to capture details, schedule, and request reviews after work is done.",
    marketSignals: [
      { label: "Customer expectations", value: "High", description: "Professional communication helps premium service teams stand out." },
      { label: "Tree/storm demand", value: "High", description: "Storm, tree, and water issues can create sudden lead surges." },
      { label: "Best first build", value: "Photo intake", description: "Photo-first workflows help qualify jobs before dispatch." },
    ],
    neighborhoods: ["Trailwood", "Bear Branch", "Kings Point", "Elm Grove", "Greentree", "Woodland Hills"],
    industries: ["Tree Service", "Water Damage", "Roofing", "Pest Control"],
  },
  {
    slug: "pasadena",
    label: "Pasadena",
    county: "Harris County",
    headline: "Pasadena contractors need practical systems for high-volume service calls.",
    summary:
      "Pasadena rewards owners who answer quickly and stay organized. The system captures calls, quotes, and job notes in one practical flow.",
    marketSignals: [
      { label: "Service volume", value: "High", description: "Dense residential and commercial demand creates plenty of inbound work." },
      { label: "Speed pressure", value: "High", description: "Customers keep dialing when a call is missed." },
      { label: "Best first build", value: "Call capture", description: "Answer gaps are the simplest revenue leak to fix first." },
    ],
    neighborhoods: ["Vista Villas", "Parkview", "Red Bluff", "Burke", "Golden Acres", "Strawberry Park"],
    industries: ["Plumbing", "Electrical", "HVAC", "Garage Door"],
  },
  {
    slug: "deer-park",
    label: "Deer Park",
    county: "Harris County",
    headline: "Deer Park teams need reliable intake for homes, facilities, and urgent repairs.",
    summary:
      "With industrial and residential work side by side, Deer Park crews benefit from cleaner routing, reminders, and job context.",
    marketSignals: [
      { label: "Commercial mix", value: "High", description: "Facility and residential calls often need different intake questions." },
      { label: "Scheduling detail", value: "High", description: "Access, safety, and crew availability matter." },
      { label: "Best first build", value: "Routing rules", description: "Route commercial and residential work into separate workflows." },
    ],
    neighborhoods: ["Center Street", "College Park", "San Jacinto", "Battleground", "Park Meadows", "East Meadow"],
    industries: ["Electrical", "Plumbing", "HVAC", "Roofing"],
  },
  {
    slug: "la-porte",
    label: "La Porte",
    county: "Harris County",
    headline: "La Porte service businesses need after-hours coverage and coastal-ready follow-up.",
    summary:
      "Weather, water, and repair demand can spike quickly near the bay. Bartlett Labs keeps calls and follow-ups moving when the owner is busy.",
    marketSignals: [
      { label: "Weather sensitivity", value: "High", description: "Storm and water issues can drive urgent demand." },
      { label: "After-hours risk", value: "High", description: "Emergency calls rarely wait for business hours." },
      { label: "Best first build", value: "Emergency intake", description: "Escalation workflows prevent urgent jobs from sitting in voicemail." },
    ],
    neighborhoods: ["Shoreacres", "Fairmont Park", "Morgan's Point", "Bay Forest", "Spencer Highway", "Sylvan Beach"],
    industries: ["Water Damage", "Roofing", "HVAC", "Plumbing"],
  },
  {
    slug: "channelview",
    label: "Channelview",
    county: "Harris County",
    headline: "Channelview contractors need simple lead capture that works while crews are moving.",
    summary:
      "For busy field teams, the first win is simple: answer more leads, gather the right details, and stop losing quote follow-ups.",
    marketSignals: [
      { label: "Field-work pressure", value: "High", description: "Owners and crews are often unavailable when calls arrive." },
      { label: "Quote follow-up", value: "High", description: "Manual callbacks are easy to miss after long days." },
      { label: "Best first build", value: "SMS follow-up", description: "Automated texts keep quotes warm without extra admin time." },
    ],
    neighborhoods: ["Old River Terrace", "Sterling Green", "Market Street", "Sheldon Road", "San Jacinto River", "Woodforest"],
    industries: ["Auto Glass", "Plumbing", "Electrical", "Garage Door"],
  },
  {
    slug: "mont-belvieu",
    label: "Mont Belvieu",
    county: "Chambers County",
    headline: "Mont Belvieu growth rewards service businesses that look organized online.",
    summary:
      "Fast-growing communities create more service demand and higher expectations. Bartlett Labs helps local teams respond like a larger operation without becoming one.",
    marketSignals: [
      { label: "Growth pressure", value: "Very high", description: "More rooftops usually means more service calls and more competition." },
      { label: "Professional polish", value: "High", description: "Clear intake and follow-up help smaller teams compete." },
      { label: "Best first build", value: "Full funnel", description: "Capture, booking, and review flows work best together here." },
    ],
    neighborhoods: ["Eagle Pointe", "Fishers Landing", "Cherry Point", "Barbers Hill", "Crown Colony", "Lakes of Champions"],
    industries: ["HVAC", "Roofing", "Plumbing", "Garage Door"],
  },
  {
    slug: "dayton",
    label: "Dayton",
    county: "Liberty County",
    headline: "Dayton businesses need small-town trust with modern lead handling.",
    summary:
      "Dayton is relationship-heavy, but customers still expect quick answers. The system gives local teams faster response without losing their voice.",
    marketSignals: [
      { label: "Local trust", value: "High", description: "Plain-English communication matters as much as the technology." },
      { label: "Owner availability", value: "Limited", description: "Owner-led shops often miss calls while doing the work." },
      { label: "Best first build", value: "Owner alerts", description: "Simple alerts and text-back flows fit lean teams." },
    ],
    neighborhoods: ["Downtown Dayton", "Fordland Estates", "Encino Estates", "Kenefick edge", "FM 1960", "Liberty County"],
    industries: ["HVAC", "Septic", "Tree Service", "Plumbing"],
  },
  {
    slug: "liberty",
    label: "Liberty",
    county: "Liberty County",
    headline: "Liberty service businesses need follow-up that feels personal, not automated.",
    summary:
      "In smaller markets, reputation travels quickly. Bartlett Labs builds automations that sound like the owner and protect the trust already earned.",
    marketSignals: [
      { label: "Reputation sensitivity", value: "Very high", description: "A bad or missed interaction carries more weight in a small market." },
      { label: "Service coverage", value: "Regional", description: "Teams often cover several towns and need better lead notes." },
      { label: "Best first build", value: "Review engine", description: "Happy customers should turn into public proof consistently." },
    ],
    neighborhoods: ["Downtown Liberty", "Ames", "Moss Bluff", "Hardin", "Devers", "Raywood"],
    industries: ["Septic", "Tree Service", "HVAC", "Wildlife & Pest"],
  },
  {
    slug: "pearland",
    label: "Pearland",
    county: "Brazoria County",
    headline: "Pearland service teams need fast response in a highly competitive suburb.",
    summary:
      "Pearland customers compare quickly and expect polished communication. Bartlett Labs helps service businesses capture, qualify, and follow up with less admin drag.",
    marketSignals: [
      { label: "Competition", value: "Very high", description: "Dense suburban demand attracts plenty of service providers." },
      { label: "Review importance", value: "Very high", description: "Customers compare social proof before booking." },
      { label: "Best first build", value: "Review + booking", description: "Fast scheduling and review growth strengthen local trust." },
    ],
    neighborhoods: ["Shadow Creek Ranch", "Silverlake", "Old Pearland", "Southwyck", "Green Tee", "Broadway"],
    industries: ["HVAC", "Electrical", "Plumbing", "Appliance Repair"],
  },
  {
    slug: "sugar-land",
    label: "Sugar Land",
    county: "Fort Bend County",
    headline: "Sugar Land customers expect premium communication from the first touch.",
    summary:
      "For premium service areas, sloppy follow-up costs trust. Bartlett Labs helps teams look responsive, organized, and local.",
    marketSignals: [
      { label: "Customer expectations", value: "Very high", description: "Premium neighborhoods reward professional communication." },
      { label: "Quote value", value: "High", description: "Install and replacement leads are worth careful follow-up." },
      { label: "Best first build", value: "Quote nurture", description: "Structured follow-up helps close higher-value jobs." },
    ],
    neighborhoods: ["First Colony", "Greatwood", "New Territory", "Telfair", "Riverstone", "Sweetwater"],
    industries: ["HVAC", "Roofing", "Electrical", "Garage Door"],
  },
  {
    slug: "the-woodlands",
    label: "The Woodlands",
    county: "Montgomery County",
    headline: "The Woodlands service businesses need polished intake and strong reputation systems.",
    summary:
      "Customers here expect clear scheduling, fast confirmations, and visible proof. Bartlett Labs keeps those touchpoints consistent.",
    marketSignals: [
      { label: "Trust bar", value: "Very high", description: "Premium residential service depends on reputation and responsiveness." },
      { label: "Review importance", value: "Very high", description: "Google proof heavily influences who gets invited into the home." },
      { label: "Best first build", value: "Premium intake", description: "Clean forms, reminders, and review requests support high-value work." },
    ],
    neighborhoods: ["Alden Bridge", "Cochran's Crossing", "Panther Creek", "Sterling Ridge", "Creekside Park", "Grogan's Mill"],
    industries: ["HVAC", "Pest Control", "Tree Service", "Electrical"],
  },
  {
    slug: "tomball",
    label: "Tomball",
    county: "Harris County",
    headline: "Tomball crews need systems that handle suburban growth and rural edges.",
    summary:
      "Tomball service teams often cover wide territory. A cleaner lead pipeline helps owners track where calls came from and what happens next.",
    marketSignals: [
      { label: "Coverage area", value: "Wide", description: "Longer drive windows make qualification and scheduling more important." },
      { label: "Growth pressure", value: "High", description: "Suburban expansion creates steady service demand." },
      { label: "Best first build", value: "Service-area routing", description: "Route leads by neighborhood, ZIP code, or job type." },
    ],
    neighborhoods: ["Rosehill", "Creekside", "Downtown Tomball", "Decker Prairie", "Four Corners", "Lakewood"],
    industries: ["Septic", "HVAC", "Tree Service", "Roofing"],
  },
  {
    slug: "conroe",
    label: "Conroe",
    county: "Montgomery County",
    headline: "Conroe service businesses need follow-up built for growth and lake-area demand.",
    summary:
      "Conroe covers dense neighborhoods, lake homes, and rural edges. Bartlett Labs helps teams capture context before sending a crew.",
    marketSignals: [
      { label: "Growth pressure", value: "Very high", description: "Fast regional growth creates more inbound demand and more competition." },
      { label: "Job context", value: "High", description: "Lake-area, rural, and suburban jobs often require different details." },
      { label: "Best first build", value: "Smart intake", description: "Capture photos, access notes, and urgency before dispatch." },
    ],
    neighborhoods: ["Lake Conroe", "Grand Central Park", "April Sound", "Panorama Village", "Crighton Ridge", "Downtown Conroe"],
    industries: ["HVAC", "Plumbing", "Tree Service", "Water Damage"],
  },
  {
    slug: "katy",
    label: "Katy",
    county: "Harris County",
    headline: "Katy teams need fast booking and follow-up for high-intent suburban leads.",
    summary:
      "Katy homeowners compare options fast. The system helps owners answer, qualify, and book before the lead goes cold.",
    marketSignals: [
      { label: "Competition", value: "Very high", description: "Strong suburban demand attracts aggressive local competition." },
      { label: "Quote follow-up", value: "High", description: "High-value install leads need structured follow-up." },
      { label: "Best first build", value: "Booking engine", description: "Calendar links and reminders reduce phone tag." },
    ],
    neighborhoods: ["Cinco Ranch", "Old Katy", "Grand Lakes", "Firethorne", "Elyson", "Nottingham Country"],
    industries: ["HVAC", "Roofing", "Garage Door", "Electrical"],
  },
  {
    slug: "cypress",
    label: "Cypress",
    county: "Harris County",
    headline: "Cypress contractors need a system that keeps up with fast suburban demand.",
    summary:
      "Cypress has the kind of growth that creates opportunity and noise. Bartlett Labs helps local providers respond quickly and build proof over time.",
    marketSignals: [
      { label: "Growth pressure", value: "Very high", description: "Newer neighborhoods create a steady stream of home-service needs." },
      { label: "Review velocity", value: "High", description: "Visible local proof helps cut through crowded search results." },
      { label: "Best first build", value: "Full system", description: "Capture, follow-up, and reviews work best together in crowded markets." },
    ],
    neighborhoods: ["Towne Lake", "Bridgeland", "Fairfield", "Coles Crossing", "Cypress Creek Lakes", "Blackhorse Ranch"],
    industries: ["HVAC", "Plumbing", "Electrical", "Pest Control"],
  },
] satisfies ServiceAreaProfile[];

export const growthSteps = [
  {
    step: "01",
    title: "Map the leak",
    description:
      "We look at calls, forms, follow-up, reviews, and scheduling to find the first revenue leak worth fixing.",
  },
  {
    step: "02",
    title: "Build the system",
    description:
      "I wire the CRM, messages, automation logic, calendar, dashboards, and demo flows around how your shop actually works.",
  },
  {
    step: "03",
    title: "Launch with you",
    description:
      "We go live with a human watching the first leads, tighten the language, and leave you with a system you understand.",
  },
] as const;

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getServiceArea(slug: string) {
  return serviceAreas.find((area) => area.slug === slug);
}

export const navIndustryLinks = industries.map((industry) => ({
  label: industry.label,
  href: `/industries/${industry.slug}`,
}));

export const navServiceAreaLinks = serviceAreas.map((area) => ({
  label: area.label,
  href: `/areas/${area.slug}`,
}));

export const systemFeatureIcons = {
  bot: Bot,
  gauge: Gauge,
  search: SearchCheck,
} as const;

# 🛠️ Bartlett Labs | Modern Systems for Local Business

> **AI Automation & Operational Rigor, Hand-Built in Texas.**

Bartlett Labs is a specialized development and automation studio focused on building high-performance digital systems for local service businesses. This site serves as both a portfolio and a demonstration of the "Growth System"—a modular, AI-integrated approach to local business operations.

---

## 🎭 Brand Identity: The Nerdy Hillbilly
- **Persona:** Purdue Engineer meets Small-Town Handshake.
- **Voice:** Direct, honest, technical but zero jargon.
- **Visuals:** "Modern Workshop" aesthetic.
- **Colors:** Houston Navy (`#03202F`), Astros Orange (`#FF5910`), Warm Parchment (`#F5F3F0`).

---

## 🛠 Tech Stack
- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (PostCSS)
- **Animations:** Framer Motion (Spring physics: Mass 1, Tension 170, Friction 26)
- **3D/Graphics:** Three.js / React Three Fiber
- **Testing:** Vitest + React Testing Library
- **AI Integrations:** Anthropic (Vercel AI SDK)
- **CRM/Automation:** GoHighLevel (GHL) Integration

---

## 📁 Directory Index

### 🏗 Core Application (`/src`)
- **`app/`**: Next.js App Router (File-based routing).
  - `/areas/[slug]`: Dynamic landing pages for Houston-area neighborhoods.
  - `/industries/`: Niche-specific pages (HVAC, Distribution, Healthcare, etc.).
  - `/quiz` & `/calculator`: Interactive tools for ROI and system qualification.
  - `/work`: Portfolio of featured builds.
  - `/api/chat`: Backend logic for AI-driven interactions.
- **`components/`**:
  - `site/`: High-level page sections and structural components (PageHero, ProofStrip, SiteHeader).
  - `ContactForm.tsx`: Custom lead capture integrated with GoHighLevel.
  - `ROICalculator.tsx`: Logic-heavy interactive component for business value estimation.
- **`content/`**: **The SSOT (Single Source of Truth)** for site data.
  - `site.ts`: Global configuration, founder bio, and navigation links.
  - `services.ts` & `work.ts`: Catalog of offerings and past projects.
- **`lib/`**: Utility layer.
  - `ghl.ts`: GoHighLevel API client and form submission logic.
  - `ai-router.ts`: Intelligent routing and prompt management.

### 📚 Documentation & Strategy (`/docs`)
- **`design-references/`**: Visual benchmarks for the "Workshop" aesthetic.
- **`plans/`**: Technical roadmaps, asset checklists, and compliance audits.
- **`research/`**: Behavioral analysis (`BEHAVIORS.md`) and page topology specs.

### 🎨 Static Assets (`/public`)
- **`images/founder/`**: Optimized portraits of Kyle Bartlett.
- **`llms.txt`**: Machine-readable project overview for AI assistants.

### 🛠️ Support & Tooling
- **`.agents/`**: Project-specific AI agent definitions (e.g., `react-doctor`).
- **`scripts/`**: Automation and inspection scripts (e.g., `inspect-rhinobot.mjs`).
- **`test/`**: Shared testing utilities and render wrappers.
- **`vitest.setup.ts`**: Global configuration for the Vitest suite.

---

## 📈 Brand Strategy & Growth Pipeline

### 🎯 Positioning: "Booked by AI"
Bartlett Labs is shifting towards a narrow, high-impact niche: **Turning Missed Calls into Booked Jobs.**
- **Core Offer:** The "5-Minute Booking Engine"—a modular AI receptionist + automated follow-up system designed specifically for Trades (HVAC, Plumbing, Electrical).
- **The "Flipped Dollar" Strategy:** All marketing focuses on the revenue **saved/recovered** for the client, rather than the cost of the system. ("This system recovered $4k for a plumber" vs "I charge $500 for this").

### 📧 Outreach Infrastructure
- **System of Record:** GoHighLevel (GHL) manages the CRM, pipelines, and post-reply workflows.
- **Sending Engine:** SmartLead handles cold outbound at scale using the `bartlett-labs.com` outreach domain (isolated to protect primary `.io` reputation).
- **Lead Database:** 30,000+ verified Texas-area leads (Houston, Austin, Dallas, San Antonio).
- **The Hook:** Personalized demo sites (e.g., `alfa-plumbing.bartlettlabs.io`) are built for top-tier targets before outreach.

### 🎥 Content Pillars (YouTube Strategy)
- **Channel:** *Booked by AI*
- **Primary Hook:** "Most service businesses don't need more leads; they need faster response."
- **Content Format:** 80% Talking Head (Trust/Authority) + 20% Screen Demos (Proof).
- **Monetization:** Setup fees ($1,500 - $5,000) + recurring optimization ($200 - $500/mo).

---

## 🧩 Architectural Patterns
1. **Modular Page Construction**: Most pages are built using `PageShell` and a series of "Sections" imported from `src/components/site`.
2. **Data-Driven UI**: Content is separated from components in `src/content/`. Adding a new service or portfolio item only requires updating a TypeScript file.
3. **Spring-Based Motion**: Consistent animation physics across the site for a "heavy/mechanical" feel.
4. **GHL Integration**: Deep integration with GoHighLevel for booking, lead capture, and missed-call recovery automation.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Execute test suite
npm run test

# Run linter
npm run lint
```

---

## 🗺️ Roadmap & Current Sprints

### 🏗️ Website (v2.0 Rehaul)
- [ ] **Hero 3D Overhaul**: Interactive 3D blocks representing "system modules" using R3F.
- [ ] **Service Modals**: Interactive video placeholders for all service cards.
- [ ] **Local SEO Scale**: Expanding dynamic landing pages for 50+ Houston suburbs.

### 📈 Outreach & Growth (Q2 2026)
- [ ] **30k Lead Activation**: Scale SmartLead sends to 200+ emails/day (starting April 17).
- [ ] **Demo Factory**: Automating the creation of sub-domain demo sites for high-value targets.
- [ ] **YouTube Launch**: Execute the "30-Day Execution Plan" for the *Booked by AI* channel.
- [ ] **Case Study Engine**: Converting successful outreach replies into public-facing portfolio items in `/src/content/work.ts`.

*For more details on brand persona and local rules, see `CLAUDE.md`.*

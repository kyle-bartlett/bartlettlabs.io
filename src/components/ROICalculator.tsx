"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";

/* ── Directional planning assumptions for service-business scenarios ── */
const INDUSTRIES = [
  { value: "restaurant", label: "Restaurant / Food Service", revenueMultiplier: 0.18, trafficMultiplier: 2.4, timeWeeks: 6 },
  { value: "automotive", label: "Automotive / Auto Repair", revenueMultiplier: 0.22, trafficMultiplier: 2.8, timeWeeks: 5 },
  { value: "hvac", label: "HVAC / Plumbing / Electrical", revenueMultiplier: 0.28, trafficMultiplier: 3.2, timeWeeks: 4 },
  { value: "landscaping", label: "Landscaping / Lawn Care", revenueMultiplier: 0.25, trafficMultiplier: 3.0, timeWeeks: 4 },
  { value: "pet-services", label: "Pet Services / Grooming / Vet", revenueMultiplier: 0.20, trafficMultiplier: 2.6, timeWeeks: 5 },
  { value: "fitness", label: "Fitness / Gym / Personal Training", revenueMultiplier: 0.22, trafficMultiplier: 2.5, timeWeeks: 5 },
  { value: "fencing", label: "Fencing / Contractor", revenueMultiplier: 0.30, trafficMultiplier: 3.5, timeWeeks: 3 },
  { value: "salon", label: "Salon / Barbershop / Spa", revenueMultiplier: 0.20, trafficMultiplier: 2.4, timeWeeks: 5 },
  { value: "dental", label: "Dental / Medical Practice", revenueMultiplier: 0.15, trafficMultiplier: 2.2, timeWeeks: 6 },
  { value: "real-estate", label: "Real Estate / Property Mgmt", revenueMultiplier: 0.18, trafficMultiplier: 2.6, timeWeeks: 6 },
  { value: "cleaning", label: "Cleaning / Janitorial", revenueMultiplier: 0.24, trafficMultiplier: 3.0, timeWeeks: 4 },
  { value: "legal", label: "Law Firm / Legal Services", revenueMultiplier: 0.15, trafficMultiplier: 2.0, timeWeeks: 7 },
  { value: "retail", label: "Retail / E-commerce", revenueMultiplier: 0.20, trafficMultiplier: 2.8, timeWeeks: 5 },
  { value: "other", label: "Other / General Business", revenueMultiplier: 0.20, trafficMultiplier: 2.5, timeWeeks: 5 },
] as const;

const PRESENCE_LEVELS = [
  { value: "none", label: "No online presence", multiplier: 1.4 },
  { value: "social-only", label: "Social media only", multiplier: 1.2 },
  { value: "basic-website", label: "Basic website (no SEO/optimization)", multiplier: 1.0 },
  { value: "full-digital", label: "Full digital presence (website + SEO + social)", multiplier: 0.7 },
] as const;

function formatCurrency(n: number): string {
  if (n >= 1000) {
    return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  return "$" + n.toFixed(0);
}

function formatPercent(n: number): string {
  return n.toFixed(0) + "%";
}

export default function ROICalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(15000);
  const [monthlyTraffic, setMonthlyTraffic] = useState(500);
  const [industry, setIndustry] = useState("hvac");
  const [presence, setPresence] = useState("basic-website");
  const [showResults, setShowResults] = useState(false);

  const selectedIndustry = useMemo(
    () => INDUSTRIES.find((i) => i.value === industry) || INDUSTRIES[13],
    [industry]
  );
  const selectedPresence = useMemo(
    () => PRESENCE_LEVELS.find((p) => p.value === presence) || PRESENCE_LEVELS[2],
    [presence]
  );

  const results = useMemo(() => {
    const baseRevenueIncrease = monthlyRevenue * selectedIndustry.revenueMultiplier * selectedPresence.multiplier;
    const projectedTraffic = Math.round(monthlyTraffic * selectedIndustry.trafficMultiplier * selectedPresence.multiplier);
    const annualRevenueIncrease = baseRevenueIncrease * 12;

    // Directional placeholder investment for rough ROI math
    const estimatedInvestment = 5000;
    const roi = ((annualRevenueIncrease - estimatedInvestment) / estimatedInvestment) * 100;
    const timeToResults = selectedIndustry.timeWeeks;

    // Monthly breakdown
    const monthlyIncrease = baseRevenueIncrease;
    const newMonthlyRevenue = monthlyRevenue + monthlyIncrease;

    return {
      monthlyIncrease: Math.round(monthlyIncrease),
      annualIncrease: Math.round(annualRevenueIncrease),
      projectedTraffic,
      trafficIncrease: projectedTraffic - monthlyTraffic,
      roi: Math.round(roi),
      timeToResults,
      newMonthlyRevenue: Math.round(newMonthlyRevenue),
      estimatedInvestment,
    };
  }, [monthlyRevenue, monthlyTraffic, selectedIndustry, selectedPresence]);

  const handleCalculate = useCallback(() => {
    setShowResults(true);
  }, []);

  return (
    <div className="space-y-10">
      {/* Calculator Form */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Inputs */}
        <div className="space-y-8">
          {/* Monthly Revenue */}
          <div>
            <label className="label-mono text-accent-blue mb-3 block">
              Current Monthly Revenue
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={1000}
                max={200000}
                step={1000}
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="calculator-slider flex-1"
                aria-label="Monthly revenue slider"
              />
              <div
                className="min-w-[120px] text-right text-lg font-bold font-heading"
                style={{ color: "#06b6d4" }}
              >
                {formatCurrency(monthlyRevenue)}
              </div>
            </div>
            <div className="mt-1 flex justify-between text-xs" style={{ color: "#94a3b8" }}>
              <span>$1,000</span>
              <span>$200,000</span>
            </div>
          </div>

          {/* Monthly Traffic */}
          <div>
            <label className="label-mono text-accent-blue mb-3 block">
              Current Monthly Website Visitors
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={50000}
                step={100}
                value={monthlyTraffic}
                onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                className="calculator-slider flex-1"
                aria-label="Monthly website traffic slider"
              />
              <div
                className="min-w-[120px] text-right text-lg font-bold font-heading"
                style={{ color: "#06b6d4" }}
              >
                {monthlyTraffic.toLocaleString()}
              </div>
            </div>
            <div className="mt-1 flex justify-between text-xs" style={{ color: "#94a3b8" }}>
              <span>0</span>
              <span>50,000</span>
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="label-mono text-accent-blue mb-3 block" htmlFor="industry-select">
              Your Industry
            </label>
            <select
              id="industry-select"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="calculator-select w-full"
            >
              {INDUSTRIES.map((ind) => (
                <option key={ind.value} value={ind.value}>
                  {ind.label}
                </option>
              ))}
            </select>
          </div>

          {/* Online Presence */}
          <div>
            <label className="label-mono text-accent-blue mb-3 block" htmlFor="presence-select">
              Current Online Presence
            </label>
            <select
              id="presence-select"
              value={presence}
              onChange={(e) => setPresence(e.target.value)}
              className="calculator-select w-full"
            >
              {PRESENCE_LEVELS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCalculate}
            className="btn-primary w-full sm:w-auto text-sm"
          >
            Calculate My ROI
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

        {/* Right: Live Preview */}
        <div
          className="card-warm p-8 flex flex-col justify-center"
          style={{ minHeight: "320px" }}
        >
          {!showResults ? (
            <div className="text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "rgba(6,182,212,0.1)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" className="h-8 w-8">
                  <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z" />
                  <path d="M4 13a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6z" />
                  <path d="M16 13a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold dk-text-heading" style={{ color: "#0f172a" }}>
                Your Results Will Appear Here
              </h3>
              <p className="mt-2 text-sm dk-text-muted" style={{ color: "#64748b" }}>
                Adjust the sliders and inputs, then hit &ldquo;Calculate My ROI&rdquo; to see your estimated results.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="font-heading text-lg font-semibold dk-text-heading" style={{ color: "#0f172a" }}>
                Your Estimated Results
              </h3>

              {/* Revenue increase */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)" }}
                >
                  <p className="text-xs font-medium uppercase tracking-wider dk-text-muted" style={{ color: "#64748b" }}>
                    Monthly Revenue Increase
                  </p>
                  <p className="mt-1 text-2xl font-bold font-heading" style={{ color: "#06b6d4" }}>
                    +{formatCurrency(results.monthlyIncrease)}
                  </p>
                  <p className="mt-0.5 text-xs dk-text-muted" style={{ color: "#94a3b8" }}>
                    per month
                  </p>
                </div>

                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)" }}
                >
                  <p className="text-xs font-medium uppercase tracking-wider dk-text-muted" style={{ color: "#64748b" }}>
                    Annual Revenue Increase
                  </p>
                  <p className="mt-1 text-2xl font-bold font-heading" style={{ color: "#06b6d4" }}>
                    +{formatCurrency(results.annualIncrease)}
                  </p>
                  <p className="mt-0.5 text-xs dk-text-muted" style={{ color: "#94a3b8" }}>
                    per year
                  </p>
                </div>
              </div>

              {/* ROI + Traffic + Timeline */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-3xl font-bold font-heading" style={{ color: "#0f172a" }}>
                    <span className="dk-text-heading">{formatPercent(results.roi)}</span>
                  </p>
                  <p className="mt-1 text-xs dk-text-muted" style={{ color: "#64748b" }}>
                    Projected First-Year ROI
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold font-heading" style={{ color: "#0f172a" }}>
                    <span className="dk-text-heading">{results.projectedTraffic.toLocaleString()}</span>
                  </p>
                  <p className="mt-1 text-xs dk-text-muted" style={{ color: "#64748b" }}>
                    Projected Monthly Visitors
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold font-heading" style={{ color: "#0f172a" }}>
                    <span className="dk-text-heading">{results.timeToResults} weeks</span>
                  </p>
                  <p className="mt-1 text-xs dk-text-muted" style={{ color: "#64748b" }}>
                    Time to First Results
                  </p>
                </div>
              </div>

              {/* New projected revenue */}
              <div
                className="rounded-xl p-5 text-center"
                style={{
                  background: "linear-gradient(135deg, #1e3a5f, #0f172a)",
                  border: "1px solid rgba(6,182,212,0.3)",
                }}
              >
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Projected Monthly Revenue
                </p>
                <p className="mt-1 text-3xl font-bold font-heading text-white">
                  {formatCurrency(results.newMonthlyRevenue)}
                  <span className="text-sm font-normal" style={{ color: "#06b6d4" }}>/mo</span>
                </p>
                <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Up from {formatCurrency(monthlyRevenue)}/mo today
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center pt-2">
                <Link href="/contact" className="btn-primary text-sm text-center">
                  Get Your Custom Strategy
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <a
                  href="https://api.leadconnectorhq.com/widget/booking/tnWattFiELBGpctlleU8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm text-center"
                >
                  Book a Free Strategy Call
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Methodology Note */}
      <div className="fade-in-section">
        <div
          className="card-warm p-6 sm:p-8"
        >
          <h3 className="font-heading text-sm font-semibold dk-text-heading mb-3" style={{ color: "#0f172a" }}>
            How We Calculate These Estimates
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#06b6d4" }}>
                Industry Data
              </p>
              <p className="text-sm dk-text-muted" style={{ color: "#64748b" }}>
                Benchmarks from our live client projects and published industry conversion rates for local businesses.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#06b6d4" }}>
                Traffic Projections
              </p>
              <p className="text-sm dk-text-muted" style={{ color: "#64748b" }}>
                Based on SEO improvements, Google Business optimization, and AI-powered lead capture systems.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#06b6d4" }}>
                Revenue Model
              </p>
              <p className="text-sm dk-text-muted" style={{ color: "#64748b" }}>
                Factors in your industry&apos;s average deal size, close rate, and the impact of AI automation on lead conversion.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#06b6d4" }}>
                Conservative Estimates
              </p>
              <p className="text-sm dk-text-muted" style={{ color: "#64748b" }}>
                These numbers represent conservative projections. Many of our clients exceed these estimates within the first 90 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useCallback, useMemo } from "react";

/* ── Quiz Data ────────────────────────────────────────────── */

interface Option {
  label: string;
  points: number;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: "data-entry",
    question: "How many hours per week does your team spend on manual data entry?",
    options: [
      { label: "20+ hours — almost everything is entered by hand", points: 1 },
      { label: "10-20 hours — some templates and copy-paste shortcuts", points: 2 },
      { label: "5-10 hours — we use forms and basic integrations", points: 3 },
      { label: "Under 5 hours — most data flows automatically between systems", points: 4 },
    ],
  },
  {
    id: "customer-comms",
    question: "How do you communicate with customers?",
    options: [
      { label: "Phone calls and in-person only", points: 1 },
      { label: "Phone plus email, but nothing automated", points: 2 },
      { label: "Email and text with some templates and auto-replies", points: 3 },
      { label: "Multi-channel (email, text, chat) with automated follow-ups", points: 4 },
    ],
  },
  {
    id: "scheduling",
    question: "How do customers schedule or book with you?",
    options: [
      { label: "They call and we check the calendar manually", points: 1 },
      { label: "They email or message and we go back and forth on times", points: 2 },
      { label: "Online booking form, but we still confirm manually", points: 3 },
      { label: "Self-service online booking with automatic confirmations and reminders", points: 4 },
    ],
  },
  {
    id: "invoicing",
    question: "How do you handle invoicing and payments?",
    options: [
      { label: "Paper invoices or handwritten receipts", points: 1 },
      { label: "Spreadsheets or Word docs emailed manually", points: 2 },
      { label: "Invoicing software (QuickBooks, FreshBooks, etc.) with manual sends", points: 3 },
      { label: "Automated invoicing with online payments and recurring billing", points: 4 },
    ],
  },
  {
    id: "marketing",
    question: "What does your marketing look like?",
    options: [
      { label: "Word of mouth only — no website or social media", points: 1 },
      { label: "Basic website and/or a social media page we rarely update", points: 2 },
      { label: "Active social media, some email marketing, website with SEO", points: 3 },
      { label: "Planned content calendar, email sequences, analytics tracking, and paid or organic funnels", points: 4 },
    ],
  },
  {
    id: "reporting",
    question: "How do you track business performance and reporting?",
    options: [
      { label: "We don't really track anything — go by gut feeling", points: 1 },
      { label: "Basic spreadsheets we update manually", points: 2 },
      { label: "Dashboards or reports from our software tools", points: 3 },
      { label: "Real-time dashboards with automated KPIs, alerts, and trend analysis", points: 4 },
    ],
  },
  {
    id: "team-size",
    question: "How large is your team?",
    options: [
      { label: "Just me — I do everything", points: 1 },
      { label: "2-5 people — small crew, everyone wears multiple hats", points: 2 },
      { label: "6-20 people — dedicated roles but limited tech support", points: 3 },
      { label: "20+ people — departments, managers, and some IT infrastructure", points: 4 },
    ],
  },
];

/* ── Tier Logic ───────────────────────────────────────────── */

interface Tier {
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

interface AreaRecommendation {
  area: string;
  recommendation: string;
}

const areaLabels: Record<string, string> = {
  "data-entry": "Data Entry",
  "customer-comms": "Customer Communication",
  scheduling: "Scheduling & Booking",
  invoicing: "Invoicing & Payments",
  marketing: "Marketing",
  reporting: "Reporting & Analytics",
  "team-size": "Team Size & Structure",
};

const areaRecommendations: Record<string, string> = {
  "data-entry":
    "Automate data entry with form integrations, OCR tools, or API connectors. Even simple Zapier or Make workflows can eliminate hours of manual input each week.",
  "customer-comms":
    "Set up automated email and text follow-ups so no lead falls through the cracks. An AI chatbot can handle after-hours inquiries and qualify leads 24/7.",
  scheduling:
    "Add self-service online booking with automatic confirmations and reminders. Tools like Calendly or an integrated booking widget eliminate the back-and-forth.",
  invoicing:
    "Switch to automated invoicing with online payment links and recurring billing. This alone can cut days off your payment cycle and reduce missed invoices.",
  marketing:
    "Build a consistent content calendar and set up email sequences. Even basic SEO and regular social posting can drive steady inbound leads without paid ads.",
  reporting:
    "Set up a live dashboard pulling from your existing tools. Seeing revenue, leads, and operations at a glance lets you make faster, smarter decisions.",
  "team-size":
    "AI automation works at every team size, but solopreneurs and small teams benefit the most. Automating your weakest areas frees you to focus on what actually grows revenue.",
};

function getTier(score: number): Tier {
  if (score <= 14) {
    return {
      label: "Ready to Transform",
      emoji: "🔥",
      color: "#dc2626",
      bgColor: "rgba(220, 38, 38, 0.08)",
      borderColor: "rgba(220, 38, 38, 0.2)",
      description:
        "Your business is running heavily on manual processes. That means you're spending time on tasks that could run themselves. The good news? You have massive upside. Even small automations will save you hours every week and help you capture leads you're currently missing.",
    };
  }
  if (score <= 21) {
    return {
      label: "Getting Started",
      emoji: "🚀",
      color: "#d97706",
      bgColor: "rgba(217, 119, 6, 0.08)",
      borderColor: "rgba(217, 119, 6, 0.2)",
      description:
        "You have some foundations in place, but there are clear gaps where automation could save serious time and money. You're in the sweet spot for AI. Targeted improvements to your weakest areas will produce big results fast.",
    };
  }
  return {
    label: "AI-Ready",
    emoji: "⚡",
    color: "#06b6d4",
    bgColor: "rgba(6, 182, 212, 0.08)",
    borderColor: "rgba(6, 182, 212, 0.2)",
    description:
      "Your business already has strong digital foundations. You're ready for advanced AI: custom agents, predictive analytics, automated content pipelines, and intelligent workflows that give you a real competitive edge.",
  };
}

function getWeakAreas(
  answerMap: Record<string, number>
): AreaRecommendation[] {
  return Object.entries(answerMap)
    .filter(([, score]) => score <= 2)
    .sort(([, a], [, b]) => a - b)
    .map(([id]) => ({
      area: areaLabels[id] || id,
      recommendation: areaRecommendations[id] || "",
    }));
}

/* ── Component ────────────────────────────────────────────── */

export default function QuizClient() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerMap, setAnswerMap] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"in" | "out">("in");
  const [animating, setAnimating] = useState(false);

  const totalQuestions = questions.length;
  const maxScore = totalQuestions * 4; // 28

  const handleSelect = useCallback((optionIndex: number) => {
    setSelectedOption(optionIndex);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedOption === null || animating) return;

    const q = questions[currentQuestion];
    const points = q.options[selectedOption].points;
    const newMap = { ...answerMap, [q.id]: points };

    // Slide out
    setAnimating(true);
    setSlideDirection("out");

    setTimeout(() => {
      setAnswerMap(newMap);
      setSelectedOption(null);

      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }

      // Slide in
      setSlideDirection("in");
      setTimeout(() => setAnimating(false), 50);
    }, 280);
  }, [selectedOption, currentQuestion, answerMap, totalQuestions, animating]);

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0);
    setAnswerMap({});
    setSelectedOption(null);
    setShowResults(false);
    setSlideDirection("in");
    setAnimating(false);
  }, []);

  const rawScore = useMemo(
    () => Object.values(answerMap).reduce((sum, a) => sum + a, 0),
    [answerMap]
  );
  const tier = useMemo(() => getTier(rawScore), [rawScore]);
  const weakAreas = useMemo(() => getWeakAreas(answerMap), [answerMap]);
  const percentFill = Math.round((rawScore / maxScore) * 100);
  const progress = showResults
    ? 100
    : (currentQuestion / totalQuestions) * 100;

  const slideStyle: React.CSSProperties = {
    transition: "opacity 0.28s ease, transform 0.28s ease",
    opacity: slideDirection === "out" ? 0 : 1,
    transform:
      slideDirection === "out"
        ? "translateX(-24px)"
        : "translateX(0)",
  };

  /* ── Results View ─────────────────────────────────────── */

  if (showResults) {
    return (
      <div className="fade-in-section">
        {/* Score Card */}
        <div
          className="card-warm rounded-2xl p-8 sm:p-10 text-center mb-8"
        >
          <div className="text-5xl mb-4">{tier.emoji}</div>

          {/* Score circle */}
          <div className="relative mx-auto mb-6 h-36 w-36">
            <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                className="dk-text-muted"
                stroke="#e2e8f0"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={tier.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(percentFill / 100) * 327} 327`}
                style={{ transition: "stroke-dasharray 1s ease-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-3xl font-bold dk-text-heading"
                style={{ color: "#0f172a" }}
              >
                {rawScore}
              </span>
              <span
                className="text-xs font-medium dk-text-muted"
                style={{ color: "#64748b" }}
              >
                out of {maxScore}
              </span>
            </div>
          </div>

          {/* Score bar */}
          <div className="max-w-md mx-auto mb-6">
            <div
              className="h-3 w-full rounded-full overflow-hidden"
              style={{ backgroundColor: "#e2e8f0" }}
            >
              <div
                className="h-full rounded-full origin-left"
                style={{
                  transform: `scaleX(${percentFill / 100})`,
                  backgroundColor: tier.color,
                  transition: "transform 1s ease-out",
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs dk-text-muted" style={{ color: "#94a3b8" }}>
              <span>7</span>
              <span>14</span>
              <span>21</span>
              <span>28</span>
            </div>
          </div>

          <h2
            className="text-2xl font-bold mb-2 dk-text-heading"
            style={{ color: tier.color }}
          >
            {tier.label}
          </h2>
          <p
            className="text-base max-w-lg mx-auto dk-text-muted"
            style={{ color: "#64748b" }}
          >
            {tier.description}
          </p>
        </div>

        {/* Per-area Recommendations */}
        {weakAreas.length > 0 && (
          <div className="card-warm rounded-2xl p-8 sm:p-10 mb-8">
            <h3
              className="text-xl font-bold mb-2 dk-text-heading"
              style={{ color: "#0f172a" }}
            >
              Your Biggest Opportunities
            </h3>
            <p
              className="text-sm mb-6 dk-text-muted"
              style={{ color: "#64748b" }}
            >
              Based on your answers, these areas have the most room for improvement:
            </p>

            <div className="space-y-5">
              {weakAreas.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: "#06b6d4" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold mb-1 dk-text-heading"
                      style={{ color: "#0f172a" }}
                    >
                      {item.area}
                    </p>
                    <p
                      className="text-sm leading-relaxed dk-text"
                      style={{ color: "#334155" }}
                    >
                      {item.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* General recommendations for high scorers */}
        {weakAreas.length === 0 && (
          <div className="card-warm rounded-2xl p-8 sm:p-10 mb-8">
            <h3
              className="text-xl font-bold mb-2 dk-text-heading"
              style={{ color: "#0f172a" }}
            >
              Next-Level Moves
            </h3>
            <p
              className="text-sm mb-6 dk-text-muted"
              style={{ color: "#64748b" }}
            >
              You&apos;re already ahead of most businesses. Here&apos;s how to pull even further ahead:
            </p>
            <div className="space-y-5">
              {[
                {
                  title: "Deploy Custom AI Agents",
                  desc: "Build AI agents that handle customer conversations, qualify leads, and book appointments without human intervention.",
                },
                {
                  title: "Predictive Analytics",
                  desc: "Use AI to forecast demand, identify your highest-value customer segments, and optimize your operations in real time.",
                },
                {
                  title: "Automated Content Pipelines",
                  desc: "Generate, schedule, and optimize content across all your channels automatically with AI-powered workflows.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: "#06b6d4" }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold mb-1 dk-text-heading"
                      style={{ color: "#0f172a" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-sm leading-relaxed dk-text"
                      style={{ color: "#334155" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div
          className="rounded-2xl p-8 sm:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          }}
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Want help implementing these recommendations?
          </h3>
          <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
            Book a free consultation and we&apos;ll walk through exactly how to act
            on these for your business. No pressure, no pitch.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/contact" className="btn-primary">
              Book a Free Consultation
            </a>
            <button onClick={handleRestart} className="btn-ghost">
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Question View ────────────────────────────────────── */

  const q = questions[currentQuestion];

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-medium uppercase tracking-wide dk-text-muted"
            style={{ color: "#64748b" }}
          >
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
          <span
            className="text-xs font-medium dk-text-muted"
            style={{ color: "#64748b" }}
          >
            {Math.round(progress)}%
          </span>
        </div>
        <div
          className="h-2 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: "#e2e8f0" }}
        >
          <div
            className="h-full rounded-full origin-left"
            style={{
              transform: `scaleX(${progress / 100})`,
              backgroundColor: "#06b6d4",
              transition: "transform 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Question card with slide animation */}
      <div style={slideStyle}>
        <div className="card-warm rounded-2xl p-8 sm:p-10 mb-6">
          <h2
            className="text-xl sm:text-2xl font-bold mb-8 dk-text-heading"
            style={{ color: "#0f172a" }}
          >
            {q.question}
          </h2>

          <div className="space-y-3">
            {q.options.map((option, i) => {
              const isSelected = selectedOption === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="w-full text-left rounded-xl p-4 sm:p-5 transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: isSelected
                      ? "rgba(6, 182, 212, 0.08)"
                      : "#f8fafc",
                    border: isSelected
                      ? "2px solid #06b6d4"
                      : "2px solid transparent",
                    color: isSelected ? "#0f172a" : "#334155",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200"
                      style={{
                        borderColor: isSelected ? "#06b6d4" : "#cbd5e1",
                      }}
                    >
                      {isSelected && (
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: "#06b6d4" }}
                        />
                      )}
                    </div>
                    <span className="text-sm sm:text-base font-medium">
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Next button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="btn-primary"
          style={{
            opacity: selectedOption === null ? 0.5 : 1,
            cursor: selectedOption === null ? "not-allowed" : "pointer",
          }}
        >
          {currentQuestion + 1 === totalQuestions
            ? "See My Results"
            : "Next Question"}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

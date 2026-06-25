"use client";

import { useState, type FormEvent } from "react";

const DEMO_API = "https://repbot.bartlettlabs.io/api/demo-call";
const DEMO_NUMBER_DISPLAY = "(979) 987-4241";
const DEMO_NUMBER_TEL = "+19799874241";

const fieldStyle = {
  borderColor: "var(--color-border)",
  color: "var(--color-text-heading)",
  backgroundColor: "rgba(247, 242, 233, 0.95)",
} as const;

type Status = "idle" | "calling" | "done" | "error";

export function DemoCallWidget() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage("Please check the box to authorize the one-time demo call.");
      return;
    }
    setStatus("calling");
    setMessage("");
    try {
      const res = await fetch(DEMO_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, consent }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("done");
        setMessage(data.message || "Calling you now — answer your phone!");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
      {/* Inbound — visitor calls us (zero TCPA risk) */}
      <article className="card-warm flex flex-col p-8 md:p-9">
        <span className="eyebrow">Call it now</span>
        <h2
          className="mt-4 text-3xl md:text-4xl"
          style={{ color: "var(--color-text-heading)", fontFamily: "var(--font-display)" }}
        >
          Call our live demo line.
        </h2>
        <p className="mt-4 flex-1 text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
          Dial the number and the AI receptionist answers, qualifies you, and books an appointment —
          exactly how it would answer for your business. Nothing to fill out, nothing to sign up for.
        </p>
        <a href={`tel:${DEMO_NUMBER_TEL}`} className="btn-primary mt-7 w-fit">
          Call {DEMO_NUMBER_DISPLAY}
        </a>
        <p className="mt-3 text-xs leading-6" style={{ color: "var(--color-text-muted)" }}>
          You&apos;re calling us — we never place automated calls to you from this option. Standard
          call rates may apply.
        </p>
      </article>

      {/* Outbound — we call the visitor (consent-gated) */}
      <article className="card-warm flex flex-col p-8 md:p-9">
        <span className="eyebrow">Or have it call you</span>
        <h2
          className="mt-4 text-3xl md:text-4xl"
          style={{ color: "var(--color-text-heading)", fontFamily: "var(--font-display)" }}
        >
          Let it call you by name.
        </h2>
        {status === "done" ? (
          <div className="mt-6 flex-1">
            <p className="text-sm leading-7" style={{ color: "var(--color-cyan-dark)" }}>{message}</p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setMessage("");
              }}
              className="mt-5 text-sm font-semibold"
              style={{ color: "var(--color-burnt-orange)" }}
            >
              Run it again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="demo-name"
                className="mb-1.5 block text-sm font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                Name <span style={{ color: "var(--color-burnt-orange)" }}>*</span>
              </label>
              <input
                id="demo-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors"
                style={fieldStyle}
              />
            </div>
            <div>
              <label
                htmlFor="demo-phone"
                className="mb-1.5 block text-sm font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                Mobile number <span style={{ color: "var(--color-burnt-orange)" }}>*</span>
              </label>
              <input
                id="demo-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 555-5555"
                className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors"
                style={fieldStyle}
              />
            </div>
            <label
              className="flex items-start gap-3 text-xs leading-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0"
              />
              <span>
                I authorize Bartlett Labs to place a <strong>one-time automated demo call</strong> to
                this number. This is a demo, not a sales call, and I will not be added to any calling
                or text list. See the{" "}
                <a href="/privacy" className="site-link">Privacy Policy</a> and{" "}
                <a href="/terms" className="site-link">Terms</a>.
              </span>
            </label>
            <button
              type="submit"
              disabled={status === "calling"}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "calling" ? "Calling you…" : "Call me now"}
            </button>
            {status === "error" && message && (
              <p className="text-sm leading-7" style={{ color: "var(--color-burnt-orange)" }}>{message}</p>
            )}
          </form>
        )}
      </article>
    </div>
  );
}

export default DemoCallWidget;

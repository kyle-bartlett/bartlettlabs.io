"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

type FormStatus = "idle" | "submitting" | "success";

const SERVICE_OPTIONS = [
  ...services.map((service) => service.title),
  "Not sure yet",
] as const;

const GHL_FORM_URL = "https://services.leadconnectorhq.com/funnels/submit";

const fieldStyle = {
  borderColor: "var(--color-border)",
  color: "var(--color-text-heading)",
  backgroundColor: "rgba(247, 242, 233, 0.95)",
} as const;

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(GHL_FORM_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const jsonBody: Record<string, string> = {};
      formData.forEach((value, key) => {
        jsonBody[key] = value.toString();
      });

      const jsonResponse = await fetch(GHL_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonBody),
      }).catch(() => null);

      if (jsonResponse?.ok) {
        setStatus("success");
        form.reset();
        return;
      }
    } catch {
      // If GHL fails entirely, fall back to mailto below.
    }

    const name = formData.get("name")?.toString() ?? "";
    const email = formData.get("email")?.toString() ?? "";
    const phone = formData.get("phone")?.toString() ?? "";
    const service = formData.get("service_interest")?.toString() ?? "";
    const message = formData.get("message")?.toString() ?? "";

    const subject = encodeURIComponent(`New Bartlett Labs inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "",
        service ? `Service Interest: ${service}` : "",
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    form.reset();
  };

  if (status === "success") {
    return (
      <div className="card-warm p-8 text-center md:p-10">
        <div
          className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full"
          style={{ backgroundColor: "rgba(46, 124, 123, 0.1)" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-cyan-dark)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2
          className="text-3xl"
          style={{
            color: "var(--color-text-heading)",
            fontFamily: "var(--font-display)",
          }}
        >
          Thanks, I got your note.
        </h2>
        <p className="mt-4 text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
          I&apos;ll take a look and follow up soon. If you would rather skip the
          inbox, you can also use the calendar below.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-semibold"
          style={{ color: "var(--color-burnt-orange)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-warm space-y-5 p-8 md:p-9"
    >
      <div>
        <span className="eyebrow">Contact Form</span>
        <h2
          className="mt-4 text-3xl md:text-4xl"
          style={{
            color: "var(--color-text-heading)",
            fontFamily: "var(--font-display)",
          }}
        >
          Send me a note.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
          A short message with the business, the pain point, and what you want
          to improve is plenty to get started.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Name <span style={{ color: "var(--color-burnt-orange)" }}>*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors"
            style={fieldStyle}
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Email <span style={{ color: "var(--color-burnt-orange)" }}>*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors"
            style={fieldStyle}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-phone"
            className="mb-1.5 block text-sm font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Phone (optional)
          </label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors"
            style={fieldStyle}
            placeholder={siteConfig.phone.display}
          />
          <p
            className="mt-2 text-xs leading-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            Phone is optional — share it only if you&apos;d like a call back.
            This form is not used to sign up for text messages.
          </p>
        </div>

        <div>
          <label
            htmlFor="contact-service"
            className="mb-1.5 block text-sm font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Service interest
          </label>
          <select
            id="contact-service"
            name="service_interest"
            className="w-full appearance-none rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors"
            style={{
              ...fieldStyle,
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%235a6778%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "2.5rem",
            }}
            defaultValue=""
          >
            <option value="">Select one</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Message <span style={{ color: "var(--color-burnt-orange)" }}>*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={7}
          className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition-colors"
          style={fieldStyle}
          placeholder="Tell me what feels broken, what you want to improve, and any timing that matters."
        />
      </div>

      <div
        className="rounded-2xl border p-5"
        style={{ borderColor: "var(--color-border)", backgroundColor: "rgba(255, 255, 255, 0.72)" }}
      >
        <p className="text-xs leading-6" style={{ color: "var(--color-text-muted)" }}>
          This form does not sign you up for text messages. To opt in to SMS,
          use the chat widget on our{" "}
          <a href="/" className="site-link">
            homepage
          </a>
          , which collects explicit SMS consent. See our{" "}
          <a href="/sms-opt-in" className="site-link">
            SMS Opt-In
          </a>{" "}
          policy for details.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
        <p className="text-sm leading-7" style={{ color: "var(--color-text-muted)" }}>
          Prefer email? Write directly at{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            style={{ color: "var(--color-burnt-orange)" }}
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

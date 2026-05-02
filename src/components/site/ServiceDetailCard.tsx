"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { Service } from "@/content/services";
import { ServiceDemoModal } from "./ServiceDemoModal";

type ServiceDetailCardProps = {
  service: Service;
};

/**
 * Detailed service card used on the /services page. Includes the four
 * "who it's for / what you provide / what I deliver / pricing" panels
 * plus a primary "Watch the demo" button that opens ServiceDemoModal.
 *
 * Falls back to a "demo coming soon" treatment when the service has no
 * configured demo asset.
 */
export function ServiceDetailCard({ service }: ServiceDetailCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      id={service.id}
      className="card-warm overflow-hidden px-7 py-8 md:px-9 md:py-10"
    >
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <span className="proof-badge">{service.priceRange}</span>
          <h2
            className="mt-5 text-4xl leading-tight md:text-5xl"
            style={{
              color: "var(--color-text-heading)",
              fontFamily: "var(--font-heading)",
            }}
          >
            {service.title}
          </h2>
          <p
            className="mt-5 text-lg leading-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            {service.summary}
          </p>
          <p
            className="mt-5 text-sm uppercase tracking-[0.16em]"
            style={{
              color: "var(--color-text-light)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {service.timeline}
          </p>

          <button
            type="button"
            className="btn-primary mt-7"
            onClick={() => setIsOpen(true)}
            aria-label={`Watch the ${service.title} demo`}
          >
            <Play aria-hidden="true" size={16} />
            Watch the demo
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="site-panel p-5">
            <h3 className="eyebrow">Who it&apos;s for</h3>
            <ul className="mt-4 grid gap-3">
              {service.whoItsFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--color-cyan-dark)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-panel p-5">
            <h3 className="eyebrow">What you provide</h3>
            <ul className="mt-4 grid gap-3">
              {service.whatYouProvide.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--color-cyan-dark)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-panel p-5 md:col-span-2">
            <h3 className="eyebrow">What I deliver</h3>
            <ul className="mt-4 grid gap-3">
              {service.whatIDeliver.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 rounded-full"
                    style={{ backgroundColor: "var(--color-burnt-orange)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ServiceDemoModal
        id={service.id}
        title={service.title}
        description={service.summary}
        eyebrow={service.priceRange}
        demo={service.demo}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        detailsHref={`/services#${service.id}`}
      />
    </article>
  );
}

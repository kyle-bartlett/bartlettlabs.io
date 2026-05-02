"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { demoShowcase } from "@/content/growth-system";
import { ServiceDemoModal } from "./ServiceDemoModal";

/**
 * Client-side wrapper around the homepage demo cards.
 *
 * Renders the original `growth-demo-card` markup, but each card is now a
 * button that opens `ServiceDemoModal`. We keep this as a small client
 * component so `GrowthSystemHome` can stay a server component.
 */
export function HomepageDemoGrid() {
  const [openDemoId, setOpenDemoId] = useState<string | null>(null);

  return (
    <div className="growth-demo-grid">
      {demoShowcase.map((demo) => {
        const Icon = demo.icon;
        const isOpen = openDemoId === demo.id;

        return (
          <article key={demo.id} className="growth-demo-card">
            <button
              type="button"
              className="growth-video-frame growth-video-frame-button"
              onClick={() => setOpenDemoId(demo.id)}
              aria-label={`Watch the ${demo.title} demo`}
            >
              <Icon aria-hidden="true" size={34} />
              <span>{demo.label}</span>
              <span className="growth-video-frame-play" aria-hidden="true">
                <Play size={14} />
                Watch demo
              </span>
            </button>
            <h3>{demo.title}</h3>
            <p>{demo.description}</p>

            <ServiceDemoModal
              id={demo.id}
              title={demo.title}
              description={demo.description}
              eyebrow={demo.label}
              demo={demo.demo}
              isOpen={isOpen}
              onClose={() => setOpenDemoId(null)}
            />
          </article>
        );
      })}
    </div>
  );
}

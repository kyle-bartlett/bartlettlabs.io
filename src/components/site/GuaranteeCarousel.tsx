"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { guarantees } from "@/content/guarantees";

type GuaranteeCarouselProps = {
  /**
   * Auto-advance interval in milliseconds. Set to 0 to disable
   * auto-advance entirely. Defaults to 6000ms (6 seconds).
   */
  autoAdvanceMs?: number;
  /**
   * Optional eyebrow text shown above the carousel.
   * Defaults to "Guarantees".
   */
  eyebrow?: string;
  /**
   * Optional section heading displayed above the slides.
   * Pass null to render the carousel without a heading.
   */
  title?: string | null;
};

/**
 * Auto-rotating carousel of brand guarantees with manual prev/next
 * controls, dot indicators, pause-on-hover, and prefers-reduced-motion
 * support.
 *
 * Designed to drop into the homepage just below the proof strip or
 * above the Final CTA without needing additional layout wrapping.
 */
export function GuaranteeCarousel({
  autoAdvanceMs = 6000,
  eyebrow = "Guarantees",
  title = "What you can count on, in writing.",
}: GuaranteeCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = guarantees.length;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      setActiveIndex(next);
    },
    [total],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Respect prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handle = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    mq.addEventListener?.("change", handle);
    return () => mq.removeEventListener?.("change", handle);
  }, []);

  // Auto-advance.
  useEffect(() => {
    if (autoAdvanceMs <= 0 || isPaused || prefersReducedMotion) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % total);
    }, autoAdvanceMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoAdvanceMs, isPaused, prefersReducedMotion, total]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  }

  return (
    <section
      className="guarantee-carousel"
      aria-roledescription="carousel"
      aria-label="Bartlett Labs guarantees"
    >
      <div className="container-bl">
        <header className="guarantee-carousel-header">
          <span className="eyebrow">{eyebrow}</span>
          {title ? (
            <h2
              className="guarantee-carousel-title"
              style={{
                color: "var(--color-text-heading)",
                fontFamily: "var(--font-display)",
              }}
            >
              {title}
            </h2>
          ) : null}
        </header>

        <div
          className="guarantee-carousel-stage"
          tabIndex={0}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onKeyDown={handleKeyDown}
        >
          <button
            type="button"
            className="guarantee-carousel-arrow guarantee-carousel-arrow-prev"
            onClick={goPrev}
            aria-label="Previous guarantee"
          >
            <ArrowLeft aria-hidden="true" size={18} />
          </button>

          <div className="guarantee-carousel-track" aria-live="polite">
            {guarantees.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;
              return (
                <article
                  key={item.id}
                  className={`guarantee-carousel-slide${isActive ? " is-active" : ""}`}
                  aria-hidden={!isActive}
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${total}: ${item.eyebrow}`}
                >
                  <div className="guarantee-carousel-slide-icon" aria-hidden="true">
                    <Icon size={26} />
                  </div>
                  <span className="proof-badge guarantee-carousel-slide-eyebrow">
                    {item.eyebrow}
                  </span>
                  <h3 className="guarantee-carousel-slide-title">{item.headline}</h3>
                  <p className="guarantee-carousel-slide-body">{item.body}</p>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="guarantee-carousel-arrow guarantee-carousel-arrow-next"
            onClick={goNext}
            aria-label="Next guarantee"
          >
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>

        <div
          className="guarantee-carousel-dots"
          role="tablist"
          aria-label="Choose guarantee"
        >
          {guarantees.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show guarantee ${index + 1}: ${item.eyebrow}`}
                className={`guarantee-carousel-dot${isActive ? " is-active" : ""}`}
                onClick={() => goTo(index)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

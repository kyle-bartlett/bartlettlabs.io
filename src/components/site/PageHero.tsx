"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";

type PageHeroProps = {
  eyebrow?: string; // Kept for compatibility but unused in new design
  title?: string;
  description?: string;
  actions?: ReactNode;
  aside?: ReactNode;
};

// FadeIn Component
function FadeIn({
  delay,
  duration = 1000,
  children,
}: {
  delay: number;
  duration?: number;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="transition-opacity transition-transform"
      style={{
        transitionDuration: `${duration}ms`,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(10px)",
      }}
    >
      {children}
    </div>
  );
}

// AnimatedHeading Component
function AnimatedHeading({ text }: { text: string }) {
  const lines = text.split("\n");
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnimation(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1
      className="mb-4 text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl"
      style={{ letterSpacing: 0, color: "white" }}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="block">
          {line.split("").map((char, charIndex) => {
            const charDelay = 30;
            const delay = startAnimation
              ? lineIndex * line.length * charDelay + charIndex * charDelay
              : 0;

            return (
              <span
                key={charIndex}
                className="inline-block transition-all duration-500 ease-out"
                style={{
                  opacity: startAnimation ? 1 : 0,
                  transform: startAnimation ? "translateX(0)" : "translateX(-18px)",
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </div>
      ))}
    </h1>
  );
}

export function PageHero({
  title = "Turn Missed Calls\nInto Booked Jobs",
  description = "Custom automation systems for Crosby area HVAC, Plumbing & Electrical businesses. Stop losing jobs because you were under a sink or in an attic.",
  actions,
  aside,
}: PageHeroProps) {
  const heroActions = actions ?? (
    <>
      <a
        href={siteConfig.booking.path}
        className="rounded-lg bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-gray-100"
      >
        See How It Works
      </a>
      <Link
        href="/services"
        className="liquid-glass rounded-lg border border-white/20 px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
      >
        View Services
      </Link>
    </>
  );

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Hero Content positioned at the bottom */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-12 pt-32 md:px-12 lg:px-16 lg:pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:items-end">
          {/* Left Column - Main content */}
          <div className="max-w-3xl">
            <AnimatedHeading text={title} />

            <FadeIn delay={800} duration={1000}>
              <p className="mb-8 text-base text-gray-300 md:text-lg">
                {description}
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                {heroActions}
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Tag */}
          <div className="mt-12 flex justify-start lg:mt-0 lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              {aside ?? (
                <div className="liquid-glass rounded-xl border border-white/20 px-6 py-3">
                  <span className="text-lg font-light text-white md:text-xl lg:text-2xl">
                    Automating. Building. Supporting.
                  </span>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

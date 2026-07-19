"use client";

import { useEffect, useRef } from "react";

/**
 * HeroForgeVideo — looping video background for the growth hero.
 *
 * Layers (bottom → top, all pointer-events: none, all behind the hero copy):
 *   1. <video>  — seamless 5s loop of the hammer striking the horseshoe.
 *                 Poster + the section's CSS background keep the original
 *                 still image as the instant-paint / no-JS / error fallback.
 *   2. scrim    — the exact same darkening gradients the still image gets,
 *                 so text contrast is identical to the current design.
 *   3. canvas   — a burst of 3D sparks that spray toward the viewer each
 *                 time the hammer connects, synced to the video loop.
 *
 * Honors prefers-reduced-motion (CSS hides the whole layer → static image),
 * and pauses the video when the hero is scrolled out of view.
 */

const VIDEO_SRC = "/videos/anvil-forge-loop.mp4";
const POSTER_SRC = "/images/hero/anvil-forge.jpg";

/**
 * Moments in the loop when the hammer meets the horseshoe.
 * `power` scales the size of the canvas spark burst (1 = full blast).
 * Timed against the final 4.67s seamless-loop encode of the video.
 */
const STRIKES = [
  { time: 0.72, power: 1 },
  { time: 3.55, power: 0.5 },
];

/** Horseshoe position inside the 16:9 video frame (fraction of frame). */
const ORIGIN_X = 0.45;
const ORIGIN_Y = 0.54;
const VIDEO_AR = 16 / 9;

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  growth: number;
  life: number;
  maxLife: number;
};

export function HeroForgeVideo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!root || !video || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return; // CSS hides the layer; don't play or animate.

    const ctx = canvas.getContext("2d");
    let sparks: Spark[] = [];
    let raf = 0;
    let lastFrame = 0;
    const fired = STRIKES.map(() => false);
    let lastTime = 0;
    let flash = 0;
    let width = 0;
    let height = 0;

    // React doesn't always serialize `muted` into SSR markup, which can block
    // autoplay until hydration — set it imperatively before calling play().
    video.muted = true;
    video.defaultMuted = true;
    const tryPlay = () => video.play().catch(() => {});

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    /** Map the horseshoe's in-frame position through object-fit: cover. */
    const strikeOrigin = () => {
      const containerAR = width / Math.max(1, height);
      if (containerAR < VIDEO_AR) {
        const dispW = height * VIDEO_AR;
        return {
          x: (width - dispW) / 2 + ORIGIN_X * dispW,
          y: ORIGIN_Y * height,
        };
      }
      const dispH = width / VIDEO_AR;
      return {
        x: ORIGIN_X * width,
        y: (height - dispH) / 2 + ORIGIN_Y * dispH,
      };
    };

    const burst = (power: number) => {
      const { x, y } = strikeOrigin();
      const base = Math.max(width, height) / 900; // scale physics to viewport
      const count = Math.round(54 * power);
      for (let i = 0; i < count; i += 1) {
        const towardViewer = Math.random() < 0.35;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.7;
        const speed = (180 + Math.random() * 620) * base * (0.6 + 0.4 * power);
        sparks.push({
          x: x + (Math.random() - 0.5) * 26 * base,
          y: y + (Math.random() - 0.5) * 12 * base,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.85,
          size: (towardViewer ? 2.2 : 1.1) + Math.random() * 1.6,
          growth: towardViewer ? 2.6 + Math.random() * 3.4 : 0.4,
          life: 0,
          maxLife: 0.55 + Math.random() * 0.75,
        });
      }
      flash = power;
      if (!raf) {
        lastFrame = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    const step = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      if (flash > 0) {
        const { x, y } = strikeOrigin();
        const r = Math.max(width, height) * 0.16;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(255, 214, 160, ${0.5 * flash})`);
        g.addColorStop(0.4, `rgba(255, 89, 16, ${0.22 * flash})`);
        g.addColorStop(1, "rgba(255, 89, 16, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
        flash = Math.max(0, flash - dt * 6);
      }

      sparks = sparks.filter((s) => {
        s.life += dt;
        if (s.life >= s.maxLife) return false;
        const t = s.life / s.maxLife;
        const px = s.x;
        const py = s.y;
        s.vy += 620 * dt; // gravity
        s.vx *= 1 - 0.6 * dt; // drag
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.size += s.growth * dt * 10;

        const alpha = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
        const warm = Math.min(1, t * 1.6);
        ctx.strokeStyle = `rgba(255, ${Math.round(220 - warm * 130)}, ${Math.round(
          150 - warm * 130,
        )}, ${alpha})`;
        ctx.lineWidth = s.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        return true;
      });

      ctx.globalCompositeOperation = "source-over";
      if (sparks.length > 0 || flash > 0) {
        raf = requestAnimationFrame(step);
      } else {
        ctx.clearRect(0, 0, width, height);
        raf = 0;
      }
    };

    const onTimeUpdate = () => {
      const t = video.currentTime;
      if (t < lastTime - 0.5) fired.fill(false); // looped back around
      lastTime = t;
      STRIKES.forEach((strike, i) => {
        if (!fired[i] && t >= strike.time && t < strike.time + 0.6) {
          fired[i] = true;
          burst(strike.power);
        }
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(root);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("canplay", tryPlay, { once: true });
    tryPlay();

    return () => {
      io.disconnect();
      ro.disconnect();
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("canplay", tryPlay);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="growth-hero-media" ref={rootRef} aria-hidden="true">
      <video
        ref={videoRef}
        className="growth-hero-video"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
        onError={(event) => {
          // Missing/broken video → drop the layer, CSS background image shows.
          event.currentTarget.parentElement?.style.setProperty(
            "display",
            "none",
          );
        }}
      />
      <div className="growth-hero-scrim" />
      <canvas ref={canvasRef} className="growth-hero-sparks" />
    </div>
  );
}

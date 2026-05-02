"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import type { ServiceDemo } from "@/content/services";
import { siteConfig } from "@/content/site";

export type ServiceDemoModalProps = {
  /**
   * DOM id used to wire aria-labelledby on the dialog. Should be unique
   * per service / demo on the page.
   */
  id: string;
  /** Display title — usually the service name. */
  title: string;
  /** One-sentence description shown above the video. */
  description: string;
  /** Optional eyebrow shown above the title (e.g. price range). */
  eyebrow?: string;
  /** The actual demo asset definition. Optional so we can render a
   * "Walkthrough coming soon" placeholder when the video is not yet
   * recorded. */
  demo?: ServiceDemo;
  /** Whether the modal is currently open. */
  isOpen: boolean;
  /** Called when the user dismisses the modal (close button, escape, or
   * backdrop click). */
  onClose: () => void;
  /**
   * Optional path to the full service detail page (e.g. /services#websites).
   * When omitted, only the primary CTA is shown.
   */
  detailsHref?: string;
  /**
   * When true, render the placeholder regardless of whether a demo asset
   * is configured. Useful in tests and previews.
   */
  forcePlaceholder?: boolean;
  /**
   * When false, render the placeholder even if a demo asset is configured.
   * Wired up so the parent can call `hasPublicAsset` server-side and pass
   * the result down. Defaults to true (assume the asset will load).
   */
  assetsAvailable?: boolean;
};

const FOCUSABLE_SELECTOR =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';

/**
 * Accessible modal that plays a single demo recording.
 *
 * Built on the native `<dialog>` element so we get browser-built focus
 * trap, escape-to-close, and backdrop dismiss out of the box. Layered on
 * top: spring-style animation, brand-consistent CTAs, and a graceful
 * "Walkthrough coming soon" state for demos whose video has not been
 * recorded yet.
 */
export function ServiceDemoModal({
  id,
  title,
  description,
  eyebrow,
  demo,
  isOpen,
  onClose,
  detailsHref,
  forcePlaceholder = false,
  assetsAvailable = true,
}: ServiceDemoModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [hasError, setHasError] = useState(false);

  const showPlaceholder =
    forcePlaceholder || !demo || !assetsAvailable || hasError;

  // Open / close the native dialog and keep React state in sync.
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;

    if (isOpen && !node.open) {
      try {
        node.showModal();
      } catch {
        // showModal throws if already open — safe to ignore.
      }
      // Move focus to the close button on open for keyboard users.
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else if (!isOpen && node.open) {
      node.close();
    }
  }, [isOpen]);

  // Pause the video and reset error state whenever the modal closes.
  useEffect(() => {
    if (!isOpen) {
      videoRef.current?.pause();
      setHasError(false);
    }
  }, [isOpen]);

  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      onClose();
    }
  }

  // Lightweight focus trap fallback for browsers/tests that don't fully
  // implement <dialog> inert behavior.
  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => !el.hasAttribute("hidden"));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const titleId = `service-demo-${id}-title`;
  const eyebrowSuffix = demo
    ? `${demo.durationSec}s walkthrough`
    : "Walkthrough coming soon";

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleDialogClick}
      onKeyDown={handleKeyDown}
      aria-labelledby={titleId}
      className="service-demo-dialog"
    >
      <div className="service-demo-frame">
        <header className="service-demo-frame-header">
          <div className="service-demo-frame-meta">
            {eyebrow ? <span className="proof-badge">{eyebrow}</span> : null}
            <span className="service-demo-eyebrow" aria-hidden="true">
              {eyebrowSuffix}
            </span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="service-demo-close"
            onClick={onClose}
            aria-label="Close demo"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </header>

        <h2 id={titleId} className="service-demo-title">
          {title}
        </h2>
        <p className="service-demo-summary">{description}</p>

        <div className="service-demo-stage">
          {showPlaceholder || !demo ? (
            <DemoPlaceholder caption={demo?.caption ?? "Walkthrough coming soon."} />
          ) : (
            <video
              ref={videoRef}
              className="service-demo-video"
              controls
              playsInline
              preload="metadata"
              poster={demo.posterPath}
              onError={() => setHasError(true)}
            >
              {demo.videoPathWebm ? (
                <source src={demo.videoPathWebm} type="video/webm" />
              ) : null}
              <source src={demo.videoPath} type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          )}
        </div>

        {demo?.caption && !showPlaceholder ? (
          <p className="service-demo-caption">{demo.caption}</p>
        ) : null}

        <footer className="service-demo-actions">
          <Link
            href={siteConfig.booking.path}
            className="btn-primary"
            onClick={onClose}
          >
            Book a 15-min call
          </Link>
          {detailsHref ? (
            <Link
              href={detailsHref}
              className="btn-secondary"
              onClick={onClose}
            >
              See full service details
            </Link>
          ) : null}
        </footer>
      </div>
    </dialog>
  );
}

function DemoPlaceholder({ caption }: { caption: string }) {
  return (
    <div className="service-demo-placeholder" role="status" aria-live="polite">
      <div className="service-demo-placeholder-inner">
        <div className="service-demo-placeholder-frame" aria-hidden="true">
          <div className="service-demo-placeholder-stripes" />
          <div className="service-demo-placeholder-badge">Demo</div>
        </div>
        <p className="service-demo-placeholder-title">Walkthrough coming soon</p>
        <p className="service-demo-placeholder-copy">{caption}</p>
      </div>
    </div>
  );
}

"use client";

/**
 * Browser side of the Google photos on the proposal pages (src/lib/place-photos.ts).
 * The page renders with its stock images. Once the watched section is within reach, this asks
 * /api/place-photos once and swaps in each Google photo only after it has loaded, so a slow,
 * failed or capped request leaves the stock image in place.
 */
import { useEffect, useState, type RefObject } from "react";
import type { ShownPhoto } from "@/lib/place-photos";

const REQUEST_TIMEOUT_MS = 8_000;
const IMAGE_TIMEOUT_MS = 10_000;

/** Resolves once the browser has the image, so the swap never shows a broken picture. */
export function loadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const timer = window.setTimeout(
      () => reject(new Error("timeout")),
      IMAGE_TIMEOUT_MS,
    );
    img.onload = () => {
      window.clearTimeout(timer);
      resolve();
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("load"));
    };
    img.src = src;
  });
}

/** Slot i holds a loaded Google photo, or null to keep the stock image. */
export function useGooglePhotos(
  slug: string,
  watch: RefObject<HTMLElement | null>,
): (ShownPhoto | null)[] {
  const [photos, setPhotos] = useState<(ShownPhoto | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | undefined;

    async function load() {
      try {
        const res = await fetch(
          `/api/place-photos?slug=${encodeURIComponent(slug)}`,
          { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) },
        );
        const body = (await res.json()) as {
          ok?: boolean;
          photos?: ShownPhoto[];
        };
        if (!body.ok || !Array.isArray(body.photos)) return;
        body.photos.forEach((photo, i) => {
          loadImage(photo.src)
            .then(() => {
              if (cancelled) return;
              setPhotos((prev) => {
                const next = [...prev];
                next[i] = photo;
                return next;
              });
            })
            .catch(() => {});
        });
      } catch {
        // Stock images stay.
      }
    }

    const el = watch.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      void load();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer?.disconnect();
          void load();
        },
        { rootMargin: "800px 0px" },
      );
      observer.observe(el);
    }
    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [slug, watch]);

  return photos;
}

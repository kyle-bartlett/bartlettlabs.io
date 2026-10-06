"use client";

/**
 * Browser side of the Google photos on the proposal pages (src/lib/place-photos.ts).
 * Once the watched section is within reach, this asks /api/place-photos once, preloads every
 * photo, and hands back the ones that loaded, all at once so the gallery doesn't jump. A slow,
 * failed or capped request returns nothing and the gallery stays hidden. Google's photo URLs
 * are short-lived, so a photo that breaks after it was shown can be dropped with `drop`.
 */
import { useCallback, useEffect, useState, type RefObject } from "react";
import type { ShownPhoto } from "@/lib/place-photos";

const REQUEST_TIMEOUT_MS = 8_000;
const IMAGE_TIMEOUT_MS = 10_000;

/** Resolves once the browser has the image, so the gallery never shows a broken picture. */
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

export function useGooglePhotos(
  slug: string,
  watch: RefObject<HTMLElement | null>,
): { photos: ShownPhoto[]; drop: (src: string) => void } {
  const [photos, setPhotos] = useState<ShownPhoto[]>([]);

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
        const all = body.photos;
        const loaded = await Promise.allSettled(
          all.map((photo) => loadImage(photo.src)),
        );
        if (cancelled) return;
        setPhotos(all.filter((_, i) => loaded[i].status === "fulfilled"));
      } catch {
        // No gallery.
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

  const drop = useCallback(
    (src: string) => setPhotos((prev) => prev.filter((p) => p.src !== src)),
    [],
  );

  return { photos, drop };
}

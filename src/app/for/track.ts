/**
 * Browser side of the prospect activity alerts (src/lib/prospect-events.ts).
 * Kyle's devices carry the signed bl_owner cookie (src/lib/owner.ts), set when he taps a
 * proposal link in RepBot's dial list. A device with any bl_owner cookie sends no events; the
 * server checks the signature before treating anyone as Kyle.
 */
type BeaconKind = "view" | "demo_tap" | "estimate";

const VISITOR_KEY = "bl_vid";

export function isOwnerDevice(): boolean {
  return document.cookie.split(/;\s*/).some((c) => c.startsWith("bl_owner="));
}

/** A random id per browser, so the text can say "2 devices so far". */
export function visitorId(): string | null {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = Math.random().toString(36).slice(2, 12) + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

export function track(slug: string, kind: BeaconKind): void {
  if (isOwnerDevice()) return;
  const body = JSON.stringify({ slug, kind, visitor: visitorId() });
  // sendBeacon survives the page handing off to the dialer on a tel: tap.
  if (navigator.sendBeacon?.("/api/prospect-event", body)) return;
  fetch("/api/prospect-event", { method: "POST", body, keepalive: true }).catch(
    () => {},
  );
}

/** Sends one view after the page has been visible for `ms`; returns a cleanup. */
export function trackViewWhenSeen(slug: string, ms = 4000): () => void {
  let timer: number | undefined;
  const arm = () => {
    window.clearTimeout(timer);
    if (document.visibilityState !== "visible") return;
    timer = window.setTimeout(() => {
      document.removeEventListener("visibilitychange", arm);
      track(slug, "view");
    }, ms);
  };
  document.addEventListener("visibilitychange", arm);
  arm();
  return () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", arm);
  };
}

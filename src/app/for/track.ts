/**
 * Browser side of the prospect activity alerts (src/lib/prospect-events.ts).
 * Kyle marks a device as his once by opening any /for/ page with ?me=1; that device never
 * sends events, so his own checks don't text him.
 */
type BeaconKind = "view" | "demo_tap" | "estimate";

const OWNER_COOKIE = "bl_owner=1";
const VISITOR_KEY = "bl_vid";

/** Reads ?me=1 into a year-long cookie and drops it from the address bar. */
export function markOwnerFromUrl(): void {
  const url = new URL(window.location.href);
  if (url.searchParams.get("me") !== "1") return;
  document.cookie = `${OWNER_COOKIE}; max-age=31536000; path=/; samesite=lax`;
  url.searchParams.delete("me");
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
}

export function isOwnerDevice(): boolean {
  return document.cookie.split(/;\s*/).includes(OWNER_COOKIE);
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

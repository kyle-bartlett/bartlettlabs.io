/**
 * Crosby AI landing page lead capture.
 * Files the submission in the Bartlett Labs CRM, sourced to the Alignable
 * Crosby ad so leads from that paid placement are attributable.
 */
export const runtime = "nodejs";

const CRM_LEADS_URL = "https://crm-api.bartlettlabs.io/api/leads";
const CRM_TIMEOUT_MS = 10_000;
const LEAD_SOURCE = "Crosby AI landing page (Alignable ad)";
const SAVE_FAILED = "We couldn't save that. Please email kyle@bartlettlabs.io.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The body comes from the open internet: anything that is not a string counts as empty.
function field(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }
  const body = parsed as Record<string, unknown>;

  // Honeypot (`website`): real users never fill it, so accept bots without saving.
  if (field(body, "website") !== "") {
    return Response.json({ ok: true });
  }

  const name = field(body, "name");
  const email = field(body, "email");
  const business = field(body, "business");
  const phone = field(body, "phone");
  const trade = field(body, "trade").slice(0, 40);

  if (!name || !email) {
    return Response.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const crmKey = process.env.CRM_INBOUND_API_KEY;
  if (!crmKey) {
    console.error("Crosby lead error: CRM_INBOUND_API_KEY is not set.");
    return Response.json({ ok: false, error: SAVE_FAILED }, { status: 503 });
  }

  const notes = [
    "Requested the free Crosby AI Opportunity Audit.",
    trade ? `Trade: ${trade}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch(CRM_LEADS_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": crmKey },
      body: JSON.stringify({
        name,
        email,
        phone,
        company: business,
        source: LEAD_SOURCE,
        notes,
      }),
      signal: AbortSignal.timeout(CRM_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error(`Crosby lead error: CRM answered ${res.status}.`);
      return Response.json({ ok: false, error: SAVE_FAILED }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    // Never log err.message: a rejected header value is echoed there, and that value is the key.
    console.error(
      `Crosby lead error: CRM request failed (${err instanceof Error ? err.name : "unknown"}).`,
    );
    return Response.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

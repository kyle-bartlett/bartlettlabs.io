/**
 * Crosby AI landing page lead capture.
 * Stores the lead, then files it in the Bartlett Labs CRM (src/lib/leads.ts), sourced to the
 * Alignable Crosby ad so leads from that paid placement are attributable.
 */
import { after } from "next/server";
import { retryPendingLeads, submitLead } from "@/lib/leads";

export const runtime = "nodejs";

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

  const notes = [
    "Requested the free Crosby AI Opportunity Audit.",
    trade ? `Trade: ${trade}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const { ok } = await submitLead("crosby-lead", {
    name,
    email,
    phone,
    company: business,
    source: LEAD_SOURCE,
    notes,
  });
  after(() => retryPendingLeads().catch(() => {}));
  return ok
    ? Response.json({ ok: true })
    : Response.json({ ok: false, error: SAVE_FAILED }, { status: 502 });
}

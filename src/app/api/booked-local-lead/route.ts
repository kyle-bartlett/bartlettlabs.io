/**
 * Booked Local proposal page lead capture (/for/<slug>).
 * Stores the "Claim this build" request, then files it in the Bartlett Labs CRM
 * (src/lib/leads.ts). The business comes from the server-side prospect list, never from
 * the request body.
 */
import { after } from "next/server";
import { getProspect } from "@/app/for/prospects";
import { retryPendingLeads, submitLead } from "@/lib/leads";

export const runtime = "nodejs";

const SAVE_FAILED = "We couldn't save that. Please email kyle@bartlettlabs.io.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The body comes from the open internet: anything that is not a string counts as empty.
function field(
  body: Record<string, unknown>,
  key: string,
  max: number,
): string {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function fail(error: string, status: number) {
  return Response.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return fail("Invalid request.", 400);
  }
  const body = parsed as Record<string, unknown>;

  // Honeypot (`companySite`): real users never fill it, so accept bots without saving.
  if (field(body, "companySite", 200) !== "") {
    return Response.json({ ok: true });
  }

  const prospect = getProspect(field(body, "slug", 80));
  if (!prospect) return fail("Invalid request.", 400);

  const name = field(body, "contactName", 80);
  const email = field(body, "email", 160);

  if (!name || !email) return fail("Name and email are required.", 400);
  if (!EMAIL_RE.test(email))
    return fail("Please enter a valid email address.", 400);

  const notes = [
    `Claimed the Booked Local build for ${prospect.name}: ${prospect.packageName}.`,
    "Offer on the page: $995 build ($250 to start, $745 after approval), then $199/month.",
    `Page: https://bartlettlabs.io/for/${prospect.slug}`,
    `Business phone on file: ${prospect.phone}`,
  ].join("\n");

  const { ok } = await submitLead("booked-local-lead", {
    name,
    email,
    // The page asks for no phone (AGENTS.md rule 4: it carries a chat); the business line is on file.
    phone: prospect.phone,
    company: prospect.name,
    source: "Booked Local fence proposal page",
    notes,
  });
  after(() => retryPendingLeads().catch(() => {}));
  return ok ? Response.json({ ok: true }) : fail(SAVE_FAILED, 502);
}

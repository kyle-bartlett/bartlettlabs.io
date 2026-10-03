/**
 * Booked Local proposal page lead capture (/for/<slug>).
 * Files the "Claim this build" request in the Bartlett Labs CRM. The business comes from
 * the server-side prospect list, never from the request body.
 */
import { getProspect } from "@/app/for/prospects";

export const runtime = "nodejs";

const CRM_LEADS_URL = "https://crm-api.bartlettlabs.io/api/leads";
const CRM_TIMEOUT_MS = 10_000;
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
  const phone = field(body, "phone", 30);

  if (!name || !email) return fail("Name and email are required.", 400);
  if (!EMAIL_RE.test(email))
    return fail("Please enter a valid email address.", 400);

  const crmKey = process.env.CRM_INBOUND_API_KEY;
  if (!crmKey) {
    console.error("Booked Local lead error: CRM_INBOUND_API_KEY is not set.");
    return fail(SAVE_FAILED, 503);
  }

  const notes = [
    `Claimed the Booked Local build for ${prospect.name}: ${prospect.packageName}.`,
    "Offer on the page: $995 build ($250 to start, $745 after approval), then $199/month.",
    `Page: https://bartlettlabs.io/for/${prospect.slug}`,
    `Business phone on file: ${prospect.phone}`,
  ].join("\n");

  try {
    const res = await fetch(CRM_LEADS_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": crmKey },
      body: JSON.stringify({
        name,
        email,
        phone,
        company: prospect.name,
        source: "Booked Local fence proposal page",
        notes,
      }),
      signal: AbortSignal.timeout(CRM_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`Booked Local lead error: CRM answered ${res.status}.`);
      return fail(SAVE_FAILED, 502);
    }
    return Response.json({ ok: true });
  } catch (err) {
    // Never log err.message: a rejected header value is echoed there, and that value is the key.
    console.error(
      `Booked Local lead error: CRM request failed (${err instanceof Error ? err.name : "unknown"}).`,
    );
    return fail("Something went wrong. Please try again.", 500);
  }
}

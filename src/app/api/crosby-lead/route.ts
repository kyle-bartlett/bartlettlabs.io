/**
 * Crosby AI landing page — lead capture.
 * Pushes the form submission into GoHighLevel tagged for the Alignable
 * Crosby ad so leads from that $50/mo placement are attributable.
 */
import { findOrCreateContact } from "@/lib/ghl";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CrosbyLeadBody {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  trade?: string;
  website?: string; // honeypot — real users never fill this
}

export async function POST(req: Request) {
  let body: CrosbyLeadBody;
  try {
    body = (await req.json()) as CrosbyLeadBody;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bots without saving.
  if (body.website && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const business = (body.business || "").trim();
  const phone = (body.phone || "").trim();
  const trade = (body.trade || "").trim();

  if (!name || !email) {
    return Response.json(
      { ok: false, error: "Name and email are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(" ") || undefined;

  const tags = ["crosby-ai", "alignable"];
  if (trade) tags.push(`trade:${trade.toLowerCase().slice(0, 40)}`);

  try {
    const contact = await findOrCreateContact({
      firstName,
      lastName,
      email,
      phone: phone || undefined,
      companyName: business || undefined,
      tags,
      source: "crosby-ai-landing",
    });

    if (!contact) {
      return Response.json(
        {
          ok: false,
          error: "We couldn't save that. Please email kyle@bartlettlabs.io.",
        },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Crosby lead error:", err instanceof Error ? err.message : err);
    return Response.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

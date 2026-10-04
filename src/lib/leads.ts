/**
 * One path for every website lead form, so no lead is lost when the CRM is down.
 *
 * submitLead: store the lead in site_leads first, then forward it to the CRM, and text Kyle.
 *  - Stored + CRM ok: Kyle gets a "call now" text (speed to lead: nobody checks the CRM).
 *  - Stored + CRM failed: the row stays pending for retryPendingLeads, and Kyle gets one text.
 *  - Not stored (database down or unset): the CRM alone is enough; if that fails too, Kyle gets
 *    the whole lead by text. Only when all three fail does the visitor see an error.
 *
 * retryPendingLeads: forwards due pending rows. Runs after each lead submission and from
 * POST /api/leads/retry (Coolify scheduled task).
 */
import { leadStore, type CrmLead, type LeadStore } from "@/lib/lead-store";
import { textOwner } from "@/lib/owner-text";

export type { CrmLead };

const CRM_LEADS_URL = "https://crm-api.bartlettlabs.io/api/leads";
const CRM_TIMEOUT_MS = 10_000;
export const RETRY_BATCH = 5;

export type LeadDeps = {
  store: LeadStore | null;
  text: (body: string) => Promise<boolean>;
};

export function defaultLeadDeps(): LeadDeps {
  return { store: leadStore(), text: textOwner };
}

type CrmResult = { ok: true } | { ok: false; error: string };

export async function forwardToCrm(lead: CrmLead): Promise<CrmResult> {
  const crmKey = process.env.CRM_INBOUND_API_KEY;
  if (!crmKey) return { ok: false, error: "CRM_INBOUND_API_KEY is not set" };
  try {
    const res = await fetch(CRM_LEADS_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": crmKey },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(CRM_TIMEOUT_MS),
    });
    return res.ok
      ? { ok: true }
      : { ok: false, error: `CRM answered ${res.status}` };
  } catch (err) {
    // Never record err.message: a rejected header value is echoed there, and that value is the key.
    return {
      ok: false,
      error: `CRM request failed (${err instanceof Error ? err.name : "unknown"})`,
    };
  }
}

function contactLine(lead: CrmLead): string {
  return [lead.name, lead.company, lead.phone, lead.email]
    .filter(Boolean)
    .join(", ");
}

/** The "call now" text for a lead the CRM took. First line of the notes says what they asked for. */
export function newLeadText(lead: CrmLead): string {
  const asked = lead.notes.split("\n")[0]?.trim();
  return [
    `NEW LEAD, call now: ${contactLine(lead)}.`,
    asked,
    `From ${lead.source}.`,
  ]
    .filter(Boolean)
    .join(" ");
}

function log(what: string) {
  return (err: unknown) =>
    console.error(
      `Lead ${what} failed (${err instanceof Error ? err.name : "unknown"}).`,
    );
}

export async function submitLead(
  form: string,
  lead: CrmLead,
  deps: LeadDeps = defaultLeadDeps(),
): Promise<{ ok: boolean }> {
  const id = deps.store
    ? await deps.store.insert(form, lead).catch((err) => {
        log("store")(err);
        return null;
      })
    : null;

  const crm = await forwardToCrm(lead);
  if (!crm.ok) console.error(`Lead CRM forward failed: ${crm.error}.`);

  if (id !== null && deps.store) {
    if (crm.ok) {
      await deps.store.markSent(id).catch(log("mark sent"));
      if (await deps.text(newLeadText(lead)))
        await deps.store.markAlerted(id).catch(log("mark alerted"));
      return { ok: true };
    }
    await deps.store.markFailed(id, crm.error).catch(log("mark failed"));
    const texted = await deps.text(
      `Website lead (${lead.source}): ${contactLine(lead)}. CRM didn't take it (${crm.error}); it's saved and will retry.`,
    );
    if (texted) await deps.store.markAlerted(id).catch(log("mark alerted"));
    return { ok: true };
  }

  if (crm.ok) {
    await deps.text(newLeadText(lead));
    return { ok: true };
  }

  const texted = await deps.text(
    `WEBSITE LEAD NOT SAVED ANYWHERE ELSE, keep this text. ${lead.source}: ${contactLine(lead)}. ${lead.notes}`,
  );
  return { ok: texted };
}

export async function retryPendingLeads(
  deps: LeadDeps = defaultLeadDeps(),
  limit = RETRY_BATCH,
): Promise<{ due: number; sent: number }> {
  if (!deps.store) return { due: 0, sent: 0 };
  const due = await deps.store.claimDue(limit);
  let sent = 0;
  for (const row of due) {
    const { id, name, email, phone, company, source, notes } = row;
    const crm = await forwardToCrm({
      name,
      email,
      phone,
      company,
      source,
      notes,
    });
    if (crm.ok) {
      sent++;
      await deps.store.markSent(id).catch(log("mark sent"));
    } else {
      await deps.store.markFailed(id, crm.error).catch(log("mark failed"));
    }
  }
  return { due: due.length, sent };
}

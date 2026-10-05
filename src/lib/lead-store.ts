/**
 * Durable store for website leads: the `site_leads` table in the outbound Postgres
 * (the database the RepBot app uses; reachable on the Coolify network).
 *
 * Env: LEADS_DATABASE_URL. Unset = no store (leadStore() returns null), and the routes fall
 * back to the CRM and an owner text.
 *
 * A row is written before the CRM is called, so a CRM outage can't lose a lead. Rows stay
 * `pending` until the CRM accepts them; `claimDue` hands each due row to exactly one sweep.
 */
import postgres from "postgres";

export type CrmLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  notes: string;
};

export type StoredLead = CrmLead & { id: number; attempts: number };

export type LeadStore = {
  insert: (form: string, lead: CrmLead) => Promise<number>;
  markSent: (id: number) => Promise<void>;
  markFailed: (id: number, error: string) => Promise<void>;
  markAlerted: (id: number) => Promise<void>;
  /** Claims up to `limit` pending rows whose retry time has come; each row goes to one caller. */
  claimDue: (limit: number) => Promise<StoredLead[]>;
  /**
   * Whether row `id` may text Kyle: false when the same email or phone already texted in the
   * last day, or when LEAD_TEXTS_PER_HOUR lead texts went out in the last hour. The form is
   * public, so this is what keeps a bot from flooding his phone; the lead is stored either way.
   */
  textAllowed: (id: number, lead: CrmLead) => Promise<boolean>;
};

export const LEAD_TEXTS_PER_HOUR = 6;

let sql: ReturnType<typeof postgres> | null = null;
let ready: Promise<unknown> | null = null;

/** The outbound Postgres client (shared pool), or null when LEADS_DATABASE_URL is unset. */
export function db(): ReturnType<typeof postgres> | null {
  const url = process.env.LEADS_DATABASE_URL?.trim();
  if (!url) return null;
  // onnotice: "relation already exists, skipping" from the create-if-missing calls is not news.
  sql ??= postgres(url, {
    max: 3,
    idle_timeout: 20,
    connect_timeout: 5,
    onnotice: () => {},
  });
  return sql;
}

function ensureTable(s: ReturnType<typeof postgres>): Promise<unknown> {
  ready ??= s`
    create table if not exists site_leads (
      id bigserial primary key,
      created_at timestamptz not null default now(),
      form text not null,
      name text not null,
      email text not null,
      phone text,
      company text,
      source text not null,
      notes text,
      crm_status text not null default 'pending',
      crm_attempts int not null default 0,
      crm_last_error text,
      crm_sent_at timestamptz,
      alerted_at timestamptz,
      next_attempt_at timestamptz not null default now() + interval '2 minutes'
    )`.catch((e) => {
    ready = null;
    throw e;
  });
  return ready;
}

export function leadStore(): LeadStore | null {
  const s = db();
  if (!s) return null;
  return {
    async insert(form, lead) {
      await ensureTable(s);
      const [row] = await s<{ id: string }[]>`
        insert into site_leads (form, name, email, phone, company, source, notes)
        values (${form}, ${lead.name}, ${lead.email}, ${lead.phone || null},
                ${lead.company || null}, ${lead.source}, ${lead.notes || null})
        returning id`;
      return Number(row.id);
    },
    async markSent(id) {
      await s`
        update site_leads
        set crm_status = 'sent', crm_sent_at = now(), crm_attempts = crm_attempts + 1,
            crm_last_error = null
        where id = ${id}`;
    },
    async markFailed(id, error) {
      await s`
        update site_leads
        set crm_attempts = crm_attempts + 1, crm_last_error = ${error.slice(0, 200)},
            -- backoff: 10 minutes per attempt, capped at 6 hours
            next_attempt_at = now() + least((crm_attempts + 1) * interval '10 minutes', interval '6 hours')
        where id = ${id}`;
    },
    async markAlerted(id) {
      await s`update site_leads set alerted_at = now() where id = ${id}`;
    },
    async textAllowed(id, lead) {
      const digits = lead.phone.replace(/\D/g, "").slice(-10);
      const [row] = await s<{ hour: number; same: number }[]>`
        select
          count(*) filter (where alerted_at > now() - interval '1 hour')::int as hour,
          count(*) filter (
            where alerted_at > now() - interval '1 day'
              and (lower(email) = lower(${lead.email})
                or (${digits} <> '' and right(regexp_replace(coalesce(phone, ''), '[^0-9]', '', 'g'), 10) = ${digits}))
          )::int as same
        from site_leads
        where alerted_at is not null and id <> ${id}`;
      return row.hour < LEAD_TEXTS_PER_HOUR && row.same === 0;
    },
    async claimDue(limit) {
      await ensureTable(s);
      const rows = await s<
        (CrmLead & {
          id: string;
          crm_attempts: number;
          phone: string | null;
          company: string | null;
          notes: string | null;
        })[]
      >`
        update site_leads
        set next_attempt_at = now() + interval '5 minutes'
        where id in (
          select id from site_leads
          where crm_status = 'pending' and next_attempt_at <= now()
          order by id
          limit ${limit}
          for update skip locked
        )
        returning id, name, email, phone, company, source, notes, crm_attempts`;
      return rows.map((r) => ({
        id: Number(r.id),
        attempts: r.crm_attempts,
        name: r.name,
        email: r.email,
        phone: r.phone ?? "",
        company: r.company ?? "",
        source: r.source,
        notes: r.notes ?? "",
      }));
    },
  };
}

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
};

let sql: ReturnType<typeof postgres> | null = null;
let ready: Promise<unknown> | null = null;

function db(): ReturnType<typeof postgres> | null {
  const url = process.env.LEADS_DATABASE_URL?.trim();
  if (!url) return null;
  sql ??= postgres(url, { max: 3, idle_timeout: 20, connect_timeout: 5 });
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

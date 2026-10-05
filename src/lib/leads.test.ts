// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CrmLead, LeadStore, StoredLead } from "@/lib/lead-store";
import {
  resetLeadTextCap,
  retryPendingLeads,
  submitLead,
  type LeadDeps,
} from "@/lib/leads";

const lead: CrmLead = {
  name: "Dana Reyes",
  email: "dana@example.com",
  phone: "8305550142",
  company: "Reyes HVAC",
  source: "Crosby AI landing page (Alignable ad)",
  notes: "Requested the free Crosby AI Opportunity Audit.",
};

type Row = StoredLead & { status: "pending" | "sent"; alerted: boolean };

/** In-memory stand-in for site_leads; `events` records call order. */
function memoryStore(events: string[]) {
  const rows: Row[] = [];
  const store: LeadStore = {
    async insert(_form, l) {
      events.push("store");
      rows.push({
        ...l,
        id: rows.length + 1,
        attempts: 0,
        status: "pending",
        alerted: false,
      });
      return rows.length;
    },
    async markSent(id) {
      rows[id - 1].status = "sent";
      rows[id - 1].attempts++;
    },
    async markFailed(id) {
      rows[id - 1].attempts++;
    },
    async markAlerted(id) {
      rows[id - 1].alerted = true;
    },
    async claimDue(limit) {
      return rows.filter((r) => r.status === "pending").slice(0, limit);
    },
    // Same rule as site_leads: one text per email a day, LEAD_TEXTS_PER_HOUR an hour.
    async textAllowed(id, l) {
      const others = rows.filter((r) => r.id !== id && r.alerted);
      return others.length < 6 && !others.some((r) => r.email === l.email);
    },
  };
  return { store, rows };
}

const fetchMock = vi.fn();

describe("website leads survive a CRM outage", () => {
  let events: string[];
  let texts: string[];
  let deps: LeadDeps;
  let rows: Row[];

  beforeEach(() => {
    resetLeadTextCap();
    events = [];
    texts = [];
    const mem = memoryStore(events);
    rows = mem.rows;
    deps = {
      store: mem.store,
      text: async (body) => (texts.push(body), true),
    };
    vi.stubEnv("CRM_INBOUND_API_KEY", "test-key");
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it("stores the lead before calling the CRM, marks it sent, and texts Kyle to call now", async () => {
    fetchMock.mockImplementation(
      async () => (events.push("crm"), Response.json({ ok: true })),
    );

    expect(await submitLead("crosby-lead", lead, deps)).toEqual({ ok: true });
    expect(events).toEqual(["store", "crm"]);
    expect(rows[0]).toMatchObject({ status: "sent", alerted: true });
    expect(texts).toEqual([
      "NEW LEAD, call now: Dana Reyes, Reyes HVAC, 8305550142, dana@example.com. Requested the free Crosby AI Opportunity Audit. From Crosby AI landing page (Alignable ad).",
    ]);
  });

  it("still texts Kyle to call now when only the CRM has the lead", async () => {
    deps = { store: null, text: async (body) => (texts.push(body), true) };
    fetchMock.mockResolvedValue(Response.json({ ok: true }));

    expect(await submitLead("crosby-lead", lead, deps)).toEqual({ ok: true });
    expect(texts).toHaveLength(1);
    expect(texts[0]).toMatch(/^NEW LEAD, call now: Dana Reyes/);
  });

  it("keeps the lead pending, texts Kyle once, and still tells the visitor it worked when the CRM is down", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));

    expect(await submitLead("crosby-lead", lead, deps)).toEqual({ ok: true });
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      status: "pending",
      alerted: true,
      name: "Dana Reyes",
    });
    expect(texts).toHaveLength(1);
    expect(texts[0]).toContain("Dana Reyes");
    expect(texts[0]).toContain("8305550142");
  });

  it("forwards the pending lead once the CRM is back", async () => {
    fetchMock.mockResolvedValueOnce(new Response("", { status: 503 }));
    await submitLead("crosby-lead", lead, deps);

    fetchMock.mockResolvedValue(Response.json({ ok: true }));
    expect(await retryPendingLeads(deps)).toEqual({ due: 1, sent: 1 });
    expect(rows[0].status).toBe("sent");
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual(lead);
  });

  it("texts Kyle the whole lead when the database is down too", async () => {
    deps.store!.insert = async () => {
      throw new Error("connect ECONNREFUSED");
    };
    fetchMock.mockResolvedValue(new Response("", { status: 502 }));

    expect(await submitLead("crosby-lead", lead, deps)).toEqual({ ok: true });
    expect(texts[0]).toContain("NOT SAVED ANYWHERE ELSE");
    expect(texts[0]).toContain("dana@example.com");
  });

  it("stores every lead but stops texting a repeat sender or a flood", async () => {
    fetchMock.mockResolvedValue(Response.json({ ok: true }));

    await submitLead("crosby-lead", lead, deps);
    await submitLead("crosby-lead", lead, deps); // same email again
    for (let i = 0; i < 10; i++)
      await submitLead(
        "crosby-lead",
        { ...lead, email: `bot${i}@example.com`, phone: "" },
        deps,
      );

    expect(rows).toHaveLength(12);
    expect(rows.every((r) => r.status === "sent")).toBe(true);
    expect(texts).toHaveLength(6);
  });

  it("puts the phone and email first when the text is the only copy", async () => {
    deps = { store: null, text: async (body) => (texts.push(body), true) };
    fetchMock.mockResolvedValue(new Response("", { status: 502 }));

    await submitLead("crosby-lead", { ...lead, name: "x".repeat(80) }, deps);
    expect(texts[0]).toMatch(
      /^WEBSITE LEAD NOT SAVED ANYWHERE ELSE, keep this text\. 8305550142, dana@example\.com, /,
    );
  });

  it("caps texts in memory when there is no database", async () => {
    deps = { store: null, text: async (body) => (texts.push(body), true) };
    fetchMock.mockResolvedValue(new Response("", { status: 502 }));

    const results = [];
    for (let i = 0; i < 12; i++)
      results.push(await submitLead("crosby-lead", lead, deps));
    expect(texts).toHaveLength(10);
    // past the cap the visitor sees the error and the email address instead
    expect(results.at(-1)).toEqual({ ok: false });
  });

  it("only fails the visitor when the store, the CRM and the text all fail", async () => {
    deps = { store: null, text: async () => false };
    fetchMock.mockResolvedValue(new Response("", { status: 500 }));

    expect(await submitLead("crosby-lead", lead, deps)).toEqual({ ok: false });
  });
});

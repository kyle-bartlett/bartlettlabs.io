// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getProspect, prospects } from "@/app/for/prospects";
import { ownerCookieValue } from "@/lib/owner";
import {
  alertText,
  MAX_TEXTS_PER_HOUR,
  recordProspectEvent,
  resetProspectAlertMemory,
  type EventDeps,
  type EventStore,
  type ProspectEvent,
} from "@/lib/prospect-events";

vi.mock("next/server", () => ({ after: (fn: () => unknown) => fn() }));

const goat = getProspect("goat-fence-company")!;
const view: ProspectEvent = {
  slug: goat.slug,
  kind: "view",
  visitor: "abc12345",
  detail: null,
};
const noPrior = { views: 0, visitors: 0, lastView: null, contactId: null };

describe("prospect activity texts", () => {
  it("says who is looking, how often, and the number to call", () => {
    expect(alertText(goat, view, { ...noPrior, contactId: 5596 })).toBe(
      "GOAT Fence Company is on their page right now (first visit). Call (713) 294-1300 (id 5596).",
    );
    // Sat Oct 3 2026, 4:10pm Central
    const lastView = new Date("2026-10-03T21:10:00Z");
    expect(
      alertText(goat, view, {
        views: 2,
        visitors: 2,
        lastView,
        contactId: null,
      }),
    ).toBe(
      "GOAT Fence Company is on their page right now (3rd visit, last one Sat 4:10pm, 2 devices so far). Call (713) 294-1300.",
    );
    expect(
      alertText(
        goat,
        { ...view, kind: "chat", detail: "how much for cedar" },
        noPrior,
      ),
    ).toContain(
      'trying the chat assistant on their page: "how much for cedar"',
    );
  });
});

describe("recordProspectEvent", () => {
  let texts: string[];
  let deps: EventDeps;
  let alerted: boolean[];
  let recorded: ProspectEvent[];

  beforeEach(() => {
    resetProspectAlertMemory();
    texts = [];
    alerted = [];
    recorded = [];
    const store: EventStore = {
      record: async (e) => (recorded.push(e), recorded.length),
      prior: async () => noPrior,
      // first claim wins the window, later ones lose
      claimAlert: async () => (alerted.push(true), alerted.length === 1),
    };
    deps = {
      store,
      text: async (b) => (texts.push(b), true),
      now: () => new Date("2026-10-05T13:00:00Z"),
    };
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => vi.restoreAllMocks());

  it("stores every view but texts once per window", async () => {
    expect(await recordProspectEvent(goat, view, deps)).toBe(true);
    expect(await recordProspectEvent(goat, view, deps)).toBe(false);
    expect(recorded).toHaveLength(2);
    expect(texts).toHaveLength(1);
  });

  it("stores estimator use without texting", async () => {
    await recordProspectEvent(goat, { ...view, kind: "estimate" }, deps);
    expect(recorded).toHaveLength(1);
    expect(alerted).toEqual([]);
    expect(texts).toEqual([]);
  });

  it("still texts, once per window, when the database is down", async () => {
    deps.store!.prior = async () => {
      throw new Error("connect ECONNREFUSED");
    };
    const demo = { ...view, kind: "demo_tap" as const };
    expect(await recordProspectEvent(goat, demo, deps)).toBe(true);
    expect(await recordProspectEvent(goat, demo, deps)).toBe(false);
    expect(texts[0]).toContain("tapped the demo line");
    // a second device is a second person: Kyle's own visit can't hide the prospect's
    expect(
      await recordProspectEvent(goat, { ...demo, visitor: "zzz98765" }, deps),
    ).toBe(true);
  });

  it("caps texts per page and overall when made-up device ids hammer the beacon", async () => {
    deps.store = null;
    for (const p of prospects)
      for (let i = 0; i < 6; i++)
        await recordProspectEvent(
          p,
          { ...view, slug: p.slug, visitor: `spoof${p.slug.length}${i}xx` },
          deps,
        );
    expect(texts).toHaveLength(MAX_TEXTS_PER_HOUR);
    expect(texts.filter((t) => t.startsWith(prospects[0].name))).toHaveLength(
      4,
    );
  });
});

describe("POST /api/prospect-event", () => {
  const send = vi.fn();
  beforeEach(() => {
    vi.stubEnv("OWNER_MARK_SECRET", "test-secret");
    vi.resetModules();
    vi.doMock("@/lib/prospect-events", async (orig) => ({
      ...(await orig<typeof import("@/lib/prospect-events")>()),
      recordProspectEvent: send.mockResolvedValue(true),
    }));
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    send.mockReset();
    vi.doUnmock("@/lib/prospect-events");
  });

  const beacon = (body: object, headers: Record<string, string> = {}) =>
    new Request("http://localhost/api/prospect-event", {
      method: "POST",
      headers: { "user-agent": "Mozilla/5.0 (iPhone)", ...headers },
      body: JSON.stringify(body),
    });

  it("records a real visitor's view, but not Kyle's devices, bots, chat spoofs or unknown pages", async () => {
    const { POST } = await import("@/app/api/prospect-event/route");
    const ok = { slug: goat.slug, kind: "view", visitor: "abc12345" };

    expect((await POST(beacon(ok))).status).toBe(204);
    expect(send).toHaveBeenCalledWith(
      goat,
      { ...ok, detail: null },
      expect.anything(),
    );

    await POST(
      beacon(ok, {
        cookie: `x=1; bl_owner=${ownerCookieValue("test-secret")}`,
      }),
    );
    // The old unsigned mark no longer counts as Kyle.
    await POST(beacon(ok, { cookie: "bl_owner=1" }));
    await POST(beacon(ok, { "user-agent": "Googlebot/2.1" }));
    await POST(beacon({ ...ok, kind: "chat" }));
    await POST(beacon({ ...ok, slug: "nobody" }));
    expect(send).toHaveBeenCalledTimes(2);
  });
});

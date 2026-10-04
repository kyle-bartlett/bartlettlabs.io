// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { getProspect } from "@/app/for/prospects";
import {
  chatReply,
  MAX_USER_TURNS,
  parseMessages,
  type ChatDeps,
  type ChatMessage,
} from "@/lib/prospect-chat";

const aags = getProspect("aags-solutions")!;
const ask: ChatMessage[] = [{ role: "user", content: "Need a gate fixed" }];

function deps(content: unknown[], spent = 0) {
  const added: number[][] = [];
  const fetchMock = vi.fn(async () =>
    Response.json({ content, usage: { input_tokens: 900, output_tokens: 60 } }),
  );
  const d: ChatDeps = {
    apiKey: "test",
    fetch: fetchMock as unknown as typeof fetch,
    usage: {
      monthUsd: async () => spent,
      add: async (i, o) => void added.push([i, o]),
    },
    monthlyCapUsd: 20,
  };
  return { d, fetchMock, added };
}

describe("prospect chat", () => {
  it("accepts only an alternating conversation that ends on the visitor", () => {
    expect(parseMessages(ask)).toEqual(ask);
    expect(parseMessages([{ role: "assistant", content: "hi" }])).toBeNull();
    expect(
      parseMessages([...ask, { role: "assistant", content: "ok" }]),
    ).toBeNull();
    expect(
      parseMessages([{ role: "user", content: "x".repeat(601) }]),
    ).toBeNull();
    expect(parseMessages("hello")).toBeNull();
  });

  it("returns the lead, strips dashes, and records token usage", async () => {
    const { d, added } = deps([
      { type: "text", text: "Thanks, Dana — AAGS Solutions will call." },
      {
        type: "tool_use",
        name: "record_project_request",
        input: {
          name: "Dana Reyes",
          phone: "832-555-0142",
          project: "Gate repair",
        },
      },
    ]);
    const r = await chatReply(aags, ask, { leadSent: false }, d);
    expect(r).toEqual({
      ok: true,
      reply: "Thanks, Dana, AAGS Solutions will call.",
      lead: {
        name: "Dana Reyes",
        phone: "832-555-0142",
        project: "Gate repair",
      },
    });
    expect(added).toEqual([[900, 60]]);
  });

  it("never calls the model past the monthly cap or the per-chat turn limit", async () => {
    const capped = deps([], 20);
    expect(
      await chatReply(aags, ask, { leadSent: false }, capped.d),
    ).toMatchObject({
      ok: false,
      reason: "limit",
    });
    expect(capped.fetchMock).not.toHaveBeenCalled();

    const long: ChatMessage[] = [];
    for (let i = 0; i <= MAX_USER_TURNS; i++)
      long.push(
        { role: "user", content: "q" },
        { role: "assistant", content: "a" },
      );
    long.pop();
    const many = deps([]);
    expect(
      await chatReply(aags, long, { leadSent: false }, many.d),
    ).toMatchObject({
      reason: "limit",
    });
    expect(many.fetchMock).not.toHaveBeenCalled();
  });

  it("offers no lead tool once a lead was sent", async () => {
    const { d, fetchMock } = deps([
      { type: "text", text: "They'll call you." },
    ]);
    await chatReply(aags, ask, { leadSent: true }, d);
    const body = JSON.parse(
      (fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1]
        .body as string,
    );
    expect(body.tools).toBeUndefined();
    expect(body.model).toBe("claude-haiku-4-5-20251001");
  });
});

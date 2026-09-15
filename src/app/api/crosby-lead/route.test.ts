// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const crmKey = "test-crm-inbound-key";
const fetchMock = vi.fn();

function lead(body: Record<string, string>) {
  return new Request("http://localhost/api/crosby-lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/crosby-lead", () => {
  beforeEach(() => {
    vi.stubEnv("CRM_INBOUND_API_KEY", crmKey);
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    fetchMock.mockReset();
  });

  it("files the lead in the CRM with the inbound key and the Crosby source", async () => {
    fetchMock.mockResolvedValue(Response.json({ ok: true }));

    const res = await POST(
      lead({
        name: "Dana Reyes",
        business: "Reyes HVAC",
        email: "dana@example.com",
        phone: "8305550142",
        trade: "HVAC",
      }),
    );

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://crm-api.bartlettlabs.io/api/leads");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({
      "content-type": "application/json",
      "x-api-key": crmKey,
    });
    expect(JSON.parse(init.body)).toEqual({
      name: "Dana Reyes",
      email: "dana@example.com",
      phone: "8305550142",
      company: "Reyes HVAC",
      source: "Crosby AI landing page (Alignable ad)",
      notes: "Requested the free Crosby AI Opportunity Audit.\nTrade: HVAC",
    });
  });

  it("rejects a body that is not a JSON object without calling the CRM", async () => {
    for (const body of ["null", "[]", '"hello"', "{not json"]) {
      const res = await POST(
        new Request("http://localhost/api/crosby-lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body,
        }),
      );

      expect(res.status).toBe(400);
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("treats non-string fields as empty instead of crashing", async () => {
    const res = await POST(
      new Request("http://localhost/api/crosby-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: 42,
          email: { value: "dana@example.com" },
          website: 7,
        }),
      }),
    );

    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("Name and email are required.");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts honeypot submissions without calling the CRM", async () => {
    const res = await POST(
      lead({ name: "Bot", email: "bot@example.com", website: "spam.example" }),
    );

    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("tells the visitor to email Kyle when the CRM refuses the lead", async () => {
    fetchMock.mockResolvedValue(new Response("Unauthorized", { status: 401 }));

    const res = await POST(
      lead({ name: "Dana Reyes", email: "dana@example.com" }),
    );

    expect(res.status).toBe(502);
    expect((await res.json()).error).toContain("kyle@bartlettlabs.io");
  });

  it("never puts the CRM key in logs or the response when the request throws", async () => {
    fetchMock.mockRejectedValue(
      new TypeError(`Invalid header value: ${crmKey}`),
    );

    const res = await POST(
      lead({ name: "Dana Reyes", email: "dana@example.com" }),
    );

    expect(res.status).toBe(500);
    expect(JSON.stringify(await res.json())).not.toContain(crmKey);
    const logged = vi
      .mocked(console.error)
      .mock.calls.flat()
      .map(String)
      .join(" ");
    expect(logged).not.toContain(crmKey);
  });

  it("refuses to send anything when the CRM key is not configured", async () => {
    vi.stubEnv("CRM_INBOUND_API_KEY", "");

    const res = await POST(
      lead({ name: "Dana Reyes", email: "dana@example.com" }),
    );

    expect(res.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

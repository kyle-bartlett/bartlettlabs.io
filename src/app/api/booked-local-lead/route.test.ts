// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const fetchMock = vi.fn();

function lead(body: Record<string, string>) {
  return new Request("http://localhost/api/booked-local-lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const valid = {
  slug: "goat-fence-company",
  contactName: "Dana Reyes",
  email: "dana@example.com",
  phone: "8305550142",
};

describe("POST /api/booked-local-lead", () => {
  beforeEach(() => {
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

  it("files the lead in the CRM under the prospect looked up from the slug", async () => {
    fetchMock.mockResolvedValue(Response.json({ ok: true }));

    const res = await POST(lead({ ...valid, businessName: "Spoofed Inc" }));

    expect(res.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://crm-api.bartlettlabs.io/api/leads");
    expect(init.headers).toEqual({
      "content-type": "application/json",
      "x-api-key": "test-key",
    });
    const sent = JSON.parse(init.body);
    expect(sent).toMatchObject({
      name: "Dana Reyes",
      email: "dana@example.com",
      phone: "8305550142",
      company: "GOAT Fence Company",
      source: "Booked Local fence proposal page",
    });
    expect(sent.notes).toContain(
      "https://bartlettlabs.io/for/goat-fence-company",
    );
  });

  it("rejects an unknown slug, a missing email and a bad email without calling the CRM", async () => {
    expect((await POST(lead({ ...valid, slug: "nope" }))).status).toBe(400);
    expect((await POST(lead({ ...valid, email: "" }))).status).toBe(400);
    expect((await POST(lead({ ...valid, email: "not-an-email" }))).status).toBe(
      400,
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts honeypot submissions silently without saving", async () => {
    const res = await POST(lead({ ...valid, companySite: "spam.example" }));
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports a failure when the CRM is down or the key is missing", async () => {
    fetchMock.mockResolvedValue(new Response("", { status: 500 }));
    expect((await POST(lead(valid))).status).toBe(502);

    vi.stubEnv("CRM_INBOUND_API_KEY", "");
    expect((await POST(lead(valid))).status).toBe(503);
  });
});

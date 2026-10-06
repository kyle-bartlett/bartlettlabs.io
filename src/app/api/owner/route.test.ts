// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isOwnerRequest, markToken } from "@/lib/owner";
import { GET } from "./route";

const get = (qs: string) =>
  GET(new Request(`https://bartlettlabs.io/api/owner${qs}`));

describe("GET /api/owner", () => {
  beforeEach(() => vi.stubEnv("OWNER_MARK_SECRET", "test-secret"));
  afterEach(() => vi.unstubAllEnvs());

  it("refuses without a valid mark token and sets no cookie", async () => {
    for (const qs of ["", "?t=1.abc", `?t=${markToken("other")}`]) {
      const res = await get(qs);
      expect(res.status).toBe(403);
      expect(res.headers.get("set-cookie")).toBeNull();
    }
  });

  it("marks the device and lands on the proposal page", async () => {
    const res = await get(
      `?t=${markToken("test-secret")}&next=/for/goat-fence-company`,
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/for/goat-fence-company");
    const cookie = res.headers.get("set-cookie") ?? "";
    expect(cookie).toMatch(/^bl_owner=\d+\.[\w-]{43}; Max-Age=31536000;/);
    const value = cookie.split(";")[0];
    expect(
      isOwnerRequest(
        new Request("https://bartlettlabs.io/", { headers: { cookie: value } }),
      ),
    ).toBe(true);
  });

  it("never redirects off the proposal pages", async () => {
    const res = await get(
      `?t=${markToken("test-secret")}&next=https://evil.example/`,
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("location")).toBeNull();
    expect(res.headers.get("set-cookie")).toMatch(/^bl_owner=/);
  });

  it("refuses everyone when the secret isn't set", async () => {
    vi.stubEnv("OWNER_MARK_SECRET", "");
    expect((await get(`?t=${markToken("test-secret")}`)).status).toBe(403);
  });
});

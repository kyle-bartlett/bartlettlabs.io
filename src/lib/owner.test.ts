// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  isOwnerRequest,
  markToken,
  ownerCookieValue,
  validMarkToken,
} from "./owner";

const S = "test-secret";
const NOW = Date.UTC(2026, 9, 6, 17, 0, 0);
const req = (cookie: string) =>
  new Request("https://bartlettlabs.io/for/x", { headers: { cookie } });

describe("owner mark", () => {
  it("matches the token RepBot mints (repbot-ai tests/owner-mark.test.ts)", () => {
    expect(markToken(S, NOW)).toBe(
      "1791306120.lNTfnyiXi3kg52238oU6jltvw7daQpPF93iXYxuUm-0",
    );
  });

  it("accepts a fresh mark token and refuses expired, tampered or foreign ones", () => {
    const t = markToken(S, NOW);
    expect(validMarkToken(t, S, NOW)).toBe(true);
    expect(validMarkToken(t, S, NOW + 121_000)).toBe(false);
    expect(validMarkToken(t, "other", NOW)).toBe(false);
    expect(validMarkToken(t.slice(0, -1) + "A", S, NOW)).toBe(false);
    expect(validMarkToken(ownerCookieValue(S, NOW), S, NOW)).toBe(false);
    expect(validMarkToken(t, undefined, NOW)).toBe(false);
  });

  it("treats only a signed, unexpired cookie as Kyle", () => {
    const c = ownerCookieValue(S, NOW);
    expect(isOwnerRequest(req(`a=1; bl_owner=${c}; b=2`), S, NOW)).toBe(true);
    expect(isOwnerRequest(req("bl_owner=1"), S, NOW)).toBe(false);
    expect(isOwnerRequest(req(`bl_owner=${c}`), "other", NOW)).toBe(false);
    expect(isOwnerRequest(req(`bl_owner=${c}`), undefined, NOW)).toBe(false);
    expect(isOwnerRequest(req(`bl_owner=${markToken(S, NOW)}`), S, NOW)).toBe(
      false,
    );
    expect(
      isOwnerRequest(req(`bl_owner=${c}`), S, NOW + 366 * 86_400_000),
    ).toBe(false);
  });
});

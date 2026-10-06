// @vitest-environment node
import { describe, expect, it } from "vitest";
import { clientIp, ipBucket, isCloudflare } from "@/lib/client-ip";

const h = (init: Record<string, string>) => new Headers(init);

describe("clientIp", () => {
  it("uses the peer address Traefik sets, not what the client sent", () => {
    // Traefik replaces X-Real-Ip and X-Forwarded-For with the TCP peer; a client can still
    // send CF-Connecting-IP, which must not be believed from a non-Cloudflare peer.
    expect(
      clientIp(
        h({
          "x-real-ip": "73.77.88.165",
          "x-forwarded-for": "1.2.3.4",
          "cf-connecting-ip": "9.9.9.9",
        }),
      ),
    ).toBe("73.77.88.165");
  });

  it("believes CF-Connecting-IP only when the peer is a Cloudflare server", () => {
    expect(
      clientIp(
        h({ "x-real-ip": "162.158.1.20", "cf-connecting-ip": "73.77.88.165" }),
      ),
    ).toBe("73.77.88.165");
    expect(
      clientIp(
        h({
          "x-real-ip": "2606:4700:10::6816:1",
          "cf-connecting-ip": "2001:db8::1",
        }),
      ),
    ).toBe("2001:db8::1");
    // A Cloudflare peer without a usable header falls back to the peer.
    expect(
      clientIp(
        h({ "x-real-ip": "162.158.1.20", "cf-connecting-ip": "nonsense" }),
      ),
    ).toBe("162.158.1.20");
  });

  it("returns null without proxy headers, and ignores garbage", () => {
    expect(clientIp(h({}))).toBeNull();
    expect(clientIp(h({ "x-forwarded-for": "1.2.3.4" }))).toBeNull();
    expect(clientIp(h({ "x-real-ip": "not an ip" }))).toBeNull();
  });

  it("folds IPv4-mapped IPv6 to IPv4", () => {
    expect(clientIp(h({ "x-real-ip": "::ffff:73.77.88.165" }))).toBe(
      "73.77.88.165",
    );
  });
});

describe("isCloudflare", () => {
  it("knows Cloudflare's published ranges", () => {
    expect(isCloudflare("104.16.0.1")).toBe(true);
    expect(isCloudflare("2a06:98c7::1")).toBe(true);
    expect(isCloudflare("149.28.249.119")).toBe(false);
    expect(isCloudflare("73.77.88.165")).toBe(false);
    expect(isCloudflare("nope")).toBe(false);
  });
});

describe("ipBucket", () => {
  it("keeps IPv4 addresses whole", () => {
    expect(ipBucket("73.77.88.165")).toBe("73.77.88.165");
  });

  it("groups an IPv6 /64, however the address is written", () => {
    const a = ipBucket("2001:db8:abcd:12:1:2:3:4");
    expect(a).toBe("2001:db8:abcd:12::/64");
    expect(ipBucket("2001:0db8:abcd:0012::99")).toBe(a);
    expect(ipBucket("2001:db8:abcd:13::1")).not.toBe(a);
    expect(ipBucket("2001:db8::1")).toBe("2001:db8:0:0::/64");
    expect(ipBucket("::1")).toBe("0:0:0:0::/64");
  });
});

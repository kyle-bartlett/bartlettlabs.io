/**
 * The visitor's IP address, taken only from headers the proxy in front of the app controls.
 *
 * Production chain, checked on the server 2026-10-05 with tcpdump between Traefik and the app:
 * bartlettlabs.io resolves straight to the origin (DNS only, Cloudflare does not proxy it), and
 * Coolify's Traefik terminates TLS. Traefik trusts no forwarded headers, so it drops any
 * X-Forwarded-For or X-Real-Ip a client sends and sets both to the TCP peer. A client-sent
 * CF-Connecting-IP passes through untouched, so it is believed only when that peer is a
 * Cloudflare server, which overwrites the header. That case only matters if the Cloudflare proxy
 * is ever switched on; without it every visitor behind one Cloudflare edge would share a limit.
 */
import { BlockList, isIP } from "node:net";

// https://www.cloudflare.com/ips-v4 and /ips-v6, 2026-10-05.
const CLOUDFLARE_V4 = [
  "173.245.48.0/20",
  "103.21.244.0/22",
  "103.22.200.0/22",
  "103.31.4.0/22",
  "141.101.64.0/18",
  "108.162.192.0/18",
  "190.93.240.0/20",
  "188.114.96.0/20",
  "197.234.240.0/22",
  "198.41.128.0/17",
  "162.158.0.0/15",
  "104.16.0.0/13",
  "104.24.0.0/14",
  "172.64.0.0/13",
  "131.0.72.0/22",
];
const CLOUDFLARE_V6 = [
  "2400:cb00::/32",
  "2606:4700::/32",
  "2803:f800::/32",
  "2405:b500::/32",
  "2405:8100::/32",
  "2a06:98c0::/29",
  "2c0f:f248::/32",
];

const cloudflare = new BlockList();
for (const range of CLOUDFLARE_V4) {
  const [net, bits] = range.split("/");
  cloudflare.addSubnet(net, Number(bits), "ipv4");
}
for (const range of CLOUDFLARE_V6) {
  const [net, bits] = range.split("/");
  cloudflare.addSubnet(net, Number(bits), "ipv6");
}

/** A single valid IP address from a header value, IPv4-mapped IPv6 folded to IPv4, or null. */
function parseIp(raw: string | null): string | null {
  const v = raw?.trim().toLowerCase();
  if (!v) return null;
  const mapped = v.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1];
  if (mapped && isIP(mapped) === 4) return mapped;
  return isIP(v) ? v : null;
}

export function isCloudflare(ip: string): boolean {
  const family = isIP(ip);
  if (!family) return false;
  return cloudflare.check(ip, family === 4 ? "ipv4" : "ipv6");
}

/** The visitor's IP, or null when the proxy headers are missing (local development). */
export function clientIp(headers: Headers): string | null {
  const peer = parseIp(headers.get("x-real-ip"));
  if (!peer) return null;
  if (isCloudflare(peer)) {
    const visitor = parseIp(headers.get("cf-connecting-ip"));
    if (visitor) return visitor;
  }
  return peer;
}

/** The first 64 bits of an IPv6 address, as four hex groups. */
function v6Prefix64(ip: string): string {
  const [head, tail] = ip.split("::");
  const groups = (s: string | undefined) => (s ? s.split(":") : []);
  const width = (gs: string[]) =>
    gs.reduce((n, g) => n + (g.includes(".") ? 2 : 1), 0);
  const h = groups(head);
  const t = groups(tail);
  const full =
    tail === undefined
      ? h
      : [...h, ...Array(Math.max(0, 8 - width(h) - width(t))).fill("0"), ...t];
  return full
    .slice(0, 4)
    .map((g) => Number.parseInt(g || "0", 16).toString(16))
    .join(":");
}

/**
 * The key a per-visitor limit counts against: the IPv4 address, or the IPv6 /64, since one home
 * or phone gets a whole /64 and can rotate through it freely.
 */
export function ipBucket(ip: string): string {
  return isIP(ip) === 6 ? `${v6Prefix64(ip)}::/64` : ip;
}

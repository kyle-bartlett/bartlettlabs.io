/**
 * Demo chat assistant on the fence proposal pages (src/lib/prospect-chat.ts).
 * Every visitor message is also a "chat" prospect event, so Kyle gets a text when an owner
 * tries it (src/lib/prospect-events.ts). Kyle's own devices (bl_owner cookie) can chat but
 * aren't recorded.
 */
import { isOwnerRequest } from "@/lib/owner";
import { after } from "next/server";
import { getProspect } from "@/app/for/prospects";
import { chatReply, defaultChatDeps, parseMessages } from "@/lib/prospect-chat";
import { recordProspectEvent } from "@/lib/prospect-events";

export const runtime = "nodejs";

const PER_IP_PER_DAY = 40;
const DAY_MS = 24 * 60 * 60 * 1000;
const perIp = new Map<string, { count: number; since: number }>();

function overDailyLimit(ip: string, now: number): boolean {
  const entry = perIp.get(ip);
  if (!entry || now - entry.since > DAY_MS) {
    if (perIp.size > 5000) perIp.clear();
    perIp.set(ip, { count: 1, since: now });
    return false;
  }
  return ++entry.count > PER_IP_PER_DAY;
}

const bad = () =>
  Response.json({ ok: false, error: "Invalid request." }, { status: 400 });

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return bad();
    body = parsed as Record<string, unknown>;
  } catch {
    return bad();
  }
  const prospect = getProspect(typeof body.slug === "string" ? body.slug : "");
  const messages = parseMessages(body.messages);
  if (!prospect || !messages) return bad();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (overDailyLimit(ip, Date.now()))
    return Response.json({
      ok: false,
      reply: `That's all I can do for today. Call ${prospect.shortName} at ${prospect.phone}.`,
    });

  const result = await chatReply(
    prospect,
    messages,
    { leadSent: body.leadSent === true },
    defaultChatDeps(),
  );

  const owner = isOwnerRequest(req);
  if (!owner) {
    const visitor =
      typeof body.visitor === "string" && /^[a-z0-9]{8,32}$/i.test(body.visitor)
        ? body.visitor
        : null;
    const said = messages[messages.length - 1].content.slice(0, 160);
    after(() =>
      recordProspectEvent(prospect, {
        slug: prospect.slug,
        kind: "chat",
        visitor,
        detail: said,
      }).catch(() => {}),
    );
  }

  return Response.json(
    result.ok
      ? { ok: true, reply: result.reply, lead: result.lead }
      : { ok: false, reply: result.reply },
  );
}

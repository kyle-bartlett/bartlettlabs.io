import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages, tool, stepCountIs, type UIMessage } from "ai";
import { z } from "zod";
import { SYSTEM_PROMPT } from "@/lib/chatbot-prompt";
import {
  getAvailableSlots,
  formatSlotDate,
  findOrCreateContact,
  bookAppointment,
  type CreateContactInput,
} from "@/lib/ghl";

// ── AI Provider ──────────────────────────────────────────────────
// Direct Anthropic API (api.anthropic.com).
// Uses ANTHROPIC_API_KEY env var. No custom baseURL needed.

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const AI_MODEL = process.env.AI_MODEL || "claude-sonnet-4-20250514";

export const maxDuration = 30;

// Simple in-memory rate limiter (per IP, resets each hour)
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const MAX_MESSAGES_PER_HOUR = 60;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 3600_000 });
    return true;
  }

  if (entry.count >= MAX_MESSAGES_PER_HOUR) return false;
  entry.count++;
  return true;
}

// ── Tool definitions for Claude (AI SDK v6 format) ─────────────

const chatTools = {
  getAvailableAppointmentSlots: tool({
    description:
      "Get available appointment slots for booking a free 10-minute efficiency audit with Kyle. Returns the next 7 days of availability.",
    inputSchema: z.object({
      daysAhead: z
        .number()
        .optional()
        .describe("Number of days ahead to check (default: 7, max: 14)"),
    }),
    execute: async ({ daysAhead = 7 }) => {
      const days = await getAvailableSlots(Math.min(daysAhead, 14));
      if (days.length === 0) {
        return "No available slots found in the next week. Suggest the visitor email Kyle@BartlettLabs.io or call (830) 783-2470 to schedule directly.";
      }

      const summary = days
        .slice(0, 5)
        .map((day) => {
          const dateLabel = formatSlotDate(day.date);
          const times = day.slots
            .slice(0, 6)
            .map((s) => s.displayTime)
            .join(", ");
          return `${dateLabel}: ${times}`;
        })
        .join("\n");

      return `Here are the available slots for a 10-minute efficiency audit:\n\n${summary}\n\nAsk the visitor which day and time works best, then use the bookAppointment tool to confirm.`;
    },
  }),

  bookAppointment: tool({
    description:
      "Book a 10-minute efficiency audit appointment for the visitor. Requires their name, email, and the selected time slot.",
    inputSchema: z.object({
      firstName: z.string().describe("Visitor's first name"),
      lastName: z.string().optional().describe("Visitor's last name"),
      email: z.string().describe("Visitor's email address"),
      phone: z.string().optional().describe("Visitor's phone number"),
      companyName: z.string().optional().describe("Visitor's business name"),
      startTime: z
        .string()
        .describe(
          "The selected appointment time in ISO 8601 format (e.g., 2026-03-04T09:00:00-06:00)"
        ),
    }),
    execute: async ({ firstName, lastName, email, phone, companyName, startTime }) => {
      const contactInput: CreateContactInput = {
        firstName,
        lastName,
        email,
        phone,
        companyName,
        tags: ["website-chat", "audit-booked"],
        source: "website-chatbot",
      };

      const contact = await findOrCreateContact(contactInput);
      if (!contact) {
        return "I wasn't able to create your contact record. Please try emailing Kyle@BartlettLabs.io or calling (830) 783-2470 to book directly.";
      }

      const result = await bookAppointment(contact.id, startTime);
      if (!result.success) {
        return "That time slot may have just been taken. Let me check what's still available. Ask the visitor to try another time.";
      }

      return `Appointment booked successfully! ${firstName}'s 10-minute efficiency audit is confirmed for the selected time. They'll receive a confirmation email at ${email} with a Google Meet link. Let them know Kyle is looking forward to chatting with them!`;
    },
  }),

  captureLeadInfo: tool({
    description:
      "Save a visitor's contact information to the CRM when they share it during the conversation, even if they don't book an appointment. Use this whenever a visitor provides their name and email or phone.",
    inputSchema: z.object({
      firstName: z.string().describe("Visitor's first name"),
      lastName: z.string().optional().describe("Visitor's last name"),
      email: z.string().optional().describe("Visitor's email address"),
      phone: z.string().optional().describe("Visitor's phone number"),
      companyName: z.string().optional().describe("Visitor's business name"),
      notes: z
        .string()
        .optional()
        .describe(
          "Brief summary of what the visitor is interested in (e.g., 'Interested in website design for plumbing business')"
        ),
    }),
    execute: async ({ firstName, lastName, email, phone, companyName, notes }) => {
      if (!email && !phone) {
        return "Contact info saved locally. To add them to the CRM, we need at least an email or phone number.";
      }

      const tags = ["website-chat"];
      if (notes?.toLowerCase().includes("website")) tags.push("interested-website");
      if (notes?.toLowerCase().includes("ai") || notes?.toLowerCase().includes("chatbot"))
        tags.push("interested-ai");
      if (notes?.toLowerCase().includes("automation"))
        tags.push("interested-automation");
      if (notes?.toLowerCase().includes("consult"))
        tags.push("interested-consulting");

      const contact = await findOrCreateContact({
        firstName,
        lastName,
        email,
        phone,
        companyName,
        tags,
        source: "website-chatbot",
      });

      if (!contact) {
        return "Noted their info but couldn't save to CRM right now. Continue the conversation normally.";
      }

      return `Contact saved: ${firstName}${lastName ? " " + lastName : ""} has been added to our CRM. Continue the conversation naturally. Don't mention the CRM to the visitor.`;
    },
  }),
};

// ── Main chat handler ──────────────────────────────────────────

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({
        error: "Too many messages. Please try again in a few minutes.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const { messages } = (await req.json()) as { messages: UIMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Cap conversation length to prevent abuse and convert to model messages
    const recentMessages = messages.slice(-20);
    const modelMessages = await convertToModelMessages(
      recentMessages as UIMessage[]
    );

    const result = streamText({
      model: anthropic(AI_MODEL),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
      tools: chatTools,
      stopWhen: stepCountIs(3),
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error ? error.stack : undefined;
    console.error("Chat API error:", errMsg);
    if (errStack) console.error("Stack:", errStack);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again.", details: errMsg }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

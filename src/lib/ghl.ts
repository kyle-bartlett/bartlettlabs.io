/**
 * GoHighLevel API v2 Client
 *
 * Handles contact creation, calendar slot lookups, and appointment booking
 * for the Bartlett Labs chatbot integration.
 */

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

// These are read from server-side env vars only
function getApiKey(): string {
  const key = process.env.GHL_API_KEY;
  if (!key) throw new Error("GHL_API_KEY is not set");
  return key;
}

function getLocationId(): string {
  const id = process.env.GHL_LOCATION_ID;
  if (!id) throw new Error("GHL_LOCATION_ID is not set");
  return id;
}

function getCalendarId(): string {
  return process.env.GHL_CALENDAR_ID || "tnWattFiELBGpctlleU8";
}

async function ghlFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${GHL_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  return res;
}

// ── Contact Types ──────────────────────────────────────────────

export interface GHLContact {
  id: string;
  locationId: string;
  contactName: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  tags: string[];
  source: string | null;
  dateAdded: string;
}

export interface CreateContactInput {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  tags?: string[];
  source?: string;
}

// ── Contact Operations ─────────────────────────────────────────

/**
 * Search for an existing contact by email or phone.
 * Returns the first match or null.
 */
export async function findContact(
  email?: string,
  phone?: string
): Promise<GHLContact | null> {
  const locationId = getLocationId();
  const params = new URLSearchParams({ locationId });
  if (email) params.set("email", email);
  if (phone) params.set("phone", phone);

  const res = await ghlFetch(`/contacts/?${params.toString()}`);
  if (!res.ok) return null;

  const data = await res.json();
  const contacts = data.contacts as GHLContact[];
  return contacts.length > 0 ? contacts[0] : null;
}

/**
 * Create a new contact in GHL.
 * Automatically adds "website-chat" tag and sets source.
 */
export async function createContact(
  input: CreateContactInput
): Promise<GHLContact | null> {
  const locationId = getLocationId();
  const tags = ["website-chat", ...(input.tags || [])];

  const body = {
    locationId,
    firstName: input.firstName || undefined,
    lastName: input.lastName || undefined,
    name: input.name || undefined,
    email: input.email || undefined,
    phone: input.phone || undefined,
    companyName: input.companyName || undefined,
    tags,
    source: input.source || "website-chatbot",
  };

  const res = await ghlFetch("/contacts/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Failed to create GHL contact:", await res.text());
    return null;
  }

  const data = await res.json();
  return data.contact as GHLContact;
}

/**
 * Find or create a contact. Searches by email first, then phone.
 * Creates a new contact if none found.
 */
export async function findOrCreateContact(
  input: CreateContactInput
): Promise<GHLContact | null> {
  // Try to find existing contact
  const existing = await findContact(input.email, input.phone);
  if (existing) return existing;

  // Create new contact
  return createContact(input);
}

// ── Calendar Types ─────────────────────────────────────────────

export interface CalendarSlot {
  date: string; // "2026-03-04"
  time: string; // "2026-03-04T07:30:00-06:00"
  displayTime: string; // "7:30 AM"
}

export interface CalendarDay {
  date: string;
  slots: CalendarSlot[];
}

// ── Calendar Operations ────────────────────────────────────────

/**
 * Get available appointment slots for the next N days.
 * Returns slots grouped by day with human-readable times.
 */
export async function getAvailableSlots(
  daysAhead: number = 7
): Promise<CalendarDay[]> {
  const calendarId = getCalendarId();
  const now = new Date();
  // Start from tomorrow
  const start = new Date(now);
  start.setDate(start.getDate() + 1);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + daysAhead);
  end.setHours(23, 59, 59, 999);

  const startMs = start.getTime();
  const endMs = end.getTime();

  const res = await ghlFetch(
    `/calendars/${calendarId}/free-slots?startDate=${startMs}&endDate=${endMs}`
  );

  if (!res.ok) {
    console.error("Failed to fetch calendar slots:", await res.text());
    return [];
  }

  const data = await res.json();
  const days: CalendarDay[] = [];

  for (const [date, value] of Object.entries(data)) {
    if (date === "traceId") continue;
    const dateSlots = (value as { slots: string[] }).slots || [];

    // Filter to reasonable business hours only (8 AM - 6 PM)
    const filteredSlots = dateSlots.filter((timeStr) => {
      const hour = parseInt(timeStr.split("T")[1].split(":")[0], 10);
      return hour >= 8 && hour < 18;
    });

    if (filteredSlots.length === 0) continue;

    days.push({
      date,
      slots: filteredSlots.map((timeStr) => ({
        date,
        time: timeStr,
        displayTime: formatSlotTime(timeStr),
      })),
    });
  }

  return days.sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Book an appointment for a contact.
 * Contact must exist in GHL first (use findOrCreateContact).
 */
export async function bookAppointment(
  contactId: string,
  startTime: string,
  title?: string
): Promise<{ success: boolean; appointmentId?: string; error?: string }> {
  const calendarId = getCalendarId();
  const locationId = getLocationId();

  const body = {
    calendarId,
    locationId,
    contactId,
    startTime,
    title: title || "10-Minute Efficiency Audit | Bartlett Labs",
  };

  const res = await ghlFetch("/calendars/events/appointments", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Failed to book appointment:", errText);
    return { success: false, error: errText };
  }

  const data = await res.json();
  return { success: true, appointmentId: data.id || data.event?.id };
}

// ── Helpers ────────────────────────────────────────────────────

function formatSlotTime(isoTime: string): string {
  // Parse "2026-03-04T07:30:00-06:00" → "7:30 AM"
  const timePart = isoTime.split("T")[1]; // "07:30:00-06:00"
  const [hh, mm] = timePart.split(":");
  let hour = parseInt(hh, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;
  return `${hour}:${mm} ${ampm}`;
}

/**
 * Format a date string for display: "2026-03-04" → "Tuesday, March 4"
 */
export function formatSlotDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00"); // noon to avoid timezone issues
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

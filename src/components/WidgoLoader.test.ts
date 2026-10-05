// @vitest-environment node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { chatAllowed } from "./WidgoLoader";

const SRC = join(__dirname, "..");
const PHONE_INPUT = /type="tel"|name="phone"|autoComplete="tel"/;

/** Every file that renders a phone input, and the route that shows it. */
const PHONE_FORMS: Record<string, string> = {
  "components/ContactForm.tsx": "/contact",
  "app/crosby-ai/CrosbyLeadForm.tsx": "/crosby-ai",
};

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return files(p);
    return /\.tsx$/.test(name) && !/\.test\.tsx$/.test(name) ? [p] : [];
  });
}

describe("Widgo chat placement (AGENTS.md rule 4)", () => {
  it("knows every page that collects a phone number", () => {
    const found = files(SRC)
      .filter((f) => PHONE_INPUT.test(readFileSync(f, "utf8")))
      .map((f) => relative(SRC, f))
      .sort();
    // A new phone field fails here: add its file and route to PHONE_FORMS, and the route to
    // NO_CHAT_ROUTES in WidgoLoader.tsx.
    expect(found).toEqual(Object.keys(PHONE_FORMS).sort());
  });

  it("stays off phone and SMS consent pages", () => {
    for (const route of [
      ...Object.values(PHONE_FORMS),
      "/sms-opt-in",
      "/sms-opt-out",
      "/contact/",
    ])
      expect([route, chatAllowed(route)]).toEqual([route, false]);
  });

  it("loads on the form-free pages, including the fence proposal pages", () => {
    for (const route of ["/", "/services", "/about", "/for/goat-fence-company"])
      expect([route, chatAllowed(route)]).toEqual([route, true]);
    expect(chatAllowed("/contacts-of-note")).toBe(true);
  });
});

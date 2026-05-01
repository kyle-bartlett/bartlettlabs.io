import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { siteConfig } from "@/content/site";
import BookPage from "./page";

describe("BookPage", () => {
  it("keeps the calendar embedded and surfaces compliance links next to it", () => {
    renderWithProviders(<BookPage />);

    expect(
      screen.getByRole("heading", { name: /Pick.*time.*context/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByTitle("Bartlett Labs booking calendar"),
    ).toHaveAttribute("src", siteConfig.booking.externalUrl);
    expect(
      screen
        .getAllByRole("link", { name: "Privacy Policy" })
        .some((link) => link.getAttribute("href") === "/privacy"),
    ).toBe(true);
    expect(
      screen
        .getAllByRole("link", { name: "Terms of Service" })
        .some((link) => link.getAttribute("href") === "/terms"),
    ).toBe(true);
    expect(
      screen
        .getAllByRole("link", { name: "SMS Opt-Out" })
        .some((link) => link.getAttribute("href") === "/sms-opt-out"),
    ).toBe(true);
    expect(
      screen
        .getAllByRole("link", { name: "Email Opt-Out" })
        .some((link) => link.getAttribute("href") === "/email-opt-out"),
    ).toBe(true);
  });
});

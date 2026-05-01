import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import SMSOptOutPage from "./page";

describe("SMSOptOutPage", () => {
  it("keeps STOP as the primary path and removes stale timing/account promises", () => {
    renderWithProviders(<SMSOptOutPage />);

    expect(
      screen.getByRole("heading", { name: /SMS.*Opt-Out/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: /Reply.*STOP/i }).length).toBeGreaterThan(0);
    expect(screen.queryByText(/24 hours/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/2FA/i)).not.toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "SMS Opt-In" })
        .every((link) => link.getAttribute("href") === "/sms-opt-in"),
    ).toBe(true);
  });
});

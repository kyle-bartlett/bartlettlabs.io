import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import SMSOptInPage from "./page";

describe("SMSOptInPage", () => {
  it("uses truthful consent copy without the old fake opt-in form language", () => {
    renderWithProviders(<SMSOptInPage />);

    expect(
      screen.getByRole("heading", { name: /SMS.*Opt-In/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Bartlett Labs does not use this page to collect promotional SMS consent\./i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/2FA|OTP|account verification/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Opt In to Text Messages/i }),
    ).not.toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "SMS Opt-Out" })
        .every((link) => link.getAttribute("href") === "/sms-opt-out"),
    ).toBe(true);
  });
});

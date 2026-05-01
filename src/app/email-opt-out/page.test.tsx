import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { siteConfig } from "@/content/site";
import EmailOptOutPage from "./page";

describe("EmailOptOutPage", () => {
  it("gives visitors a dedicated email opt-out page with direct instructions", () => {
    renderWithProviders(<EmailOptOutPage />);

    expect(
      screen.getByRole("heading", { name: /Email.*Opt-Out/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The fastest option is the unsubscribe link in any email from Bartlett Labs\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Email.*Kyle/i }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining(`mailto:${siteConfig.email}?subject=Email%20Opt-Out`),
    );
    expect(
      screen
        .getAllByRole("link", { name: "SMS Opt-Out" })
        .every((link) => link.getAttribute("href") === "/sms-opt-out"),
    ).toBe(true);
  });
});

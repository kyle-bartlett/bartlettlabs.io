import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import TermsPage from "./page";

describe("TermsPage", () => {
  it("binds users of Google Maps content to Google's terms and privacy policy", () => {
    renderWithProviders(<TermsPage />);
    expect(
      screen.getByRole("heading", { name: "8. Google Maps Content" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Google Maps/Google Earth Additional Terms of Service",
      }),
    ).toHaveAttribute("href", "https://maps.google.com/help/terms_maps.html");
    expect(
      screen.getByRole("link", { name: "Google Terms of Service" }),
    ).toHaveAttribute("href", "https://policies.google.com/terms");
    expect(
      screen.getByRole("link", { name: "Google Privacy Policy" }),
    ).toHaveAttribute("href", "https://policies.google.com/privacy");
    // Renumbered sections still run in order.
    expect(
      screen.getByRole("heading", { name: "15. Contact Information" }),
    ).toBeInTheDocument();
  });
});

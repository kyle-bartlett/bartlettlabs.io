import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { siteConfig } from "@/content/site";
import CalculatorPage from "./page";

describe("CalculatorPage", () => {
  it("uses the rebuilt shell and canonical proof instead of inflated or invented claims", () => {
    renderWithProviders(<CalculatorPage />);

    expect(
      screen.getByRole("heading", { name: /ROI.*Calculator/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(siteConfig.metrics.automations)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`${siteConfig.metrics.experienceYears} years`, "i"),
      ),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "SMS Opt-Out" })
        .some((link) => link.getAttribute("href") === "/sms-opt-out"),
    ).toBe(true);

    expect(screen.queryByText("200+")).not.toBeInTheDocument();
    expect(screen.queryByText(/15\+ years/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Fencing Contractor, Crosby TX/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Restaurant, Houston TX/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/HVAC Company, Baytown TX/i),
    ).not.toBeInTheDocument();
  });
});

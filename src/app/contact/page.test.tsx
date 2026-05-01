import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import ContactPage from "./page";

describe("ContactPage", () => {
  it("uses the new contact framing, correct contact details, and routes booking through /book", () => {
    renderWithProviders(<ContactPage />);

    expect(
      screen.getByRole("heading", { name: /Start.*useful.*system/i }),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "kyle@bartlettlabs.io" })
        .some((link) => link.getAttribute("href") === "mailto:kyle@bartlettlabs.io"),
    ).toBe(true);
    expect(
      screen
        .getAllByRole("link", { name: "(832) 630-4317" })
        .some((link) => link.getAttribute("href") === "tel:+18326304317"),
    ).toBe(true);
    expect(
      screen.queryByRole("option", { name: /Social Media Management/i }),
    ).not.toBeInTheDocument();

    expect(
      screen
        .getAllByRole("link", { name: "Request Audit" })
        .some((link) => link.getAttribute("href") === "/book"),
    ).toBe(true);

    expect(
      screen.getByText(/This booking flow is powered by HighLevel\./i),
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "SMS Opt-Out" })
        .some((link) => link.getAttribute("href") === "/sms-opt-out"),
    ).toBe(true);
  });
});

import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("renders the industry/service-area navigation and audit CTA", () => {
    renderWithProviders(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: "Request Audit" }),
    ).toHaveAttribute("href", "/book");

    expect(
      screen.getByRole("button", { name: "Industries" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Service Areas" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "HVAC" }).some((link) => link.getAttribute("href") === "/industries/hvac"),
    ).toBe(true);
    expect(
      screen.getAllByRole("link", { name: "Houston" }).some((link) => link.getAttribute("href") === "/areas/houston"),
    ).toBe(true);
    expect(screen.getByRole("link", { name: "How it works" })).toHaveAttribute(
      "href",
      "/#how",
    );
    expect(screen.getByRole("link", { name: "Demos" })).toHaveAttribute(
      "href",
      "/#demos",
    );
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "href",
      "/work",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});

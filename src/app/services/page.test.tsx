import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import ServicesPage from "./page";

describe("ServicesPage", () => {
  it("shows only the approved operating-system offers", () => {
    renderWithProviders(<ServicesPage />);

    expect(
      screen.getByRole("heading", { name: "Missed Call Text-Back" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Automated Follow-Ups" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Simple CRM Dashboard" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Consulting & Advisory" }),
    ).toBeInTheDocument();

    expect(screen.queryByText("Social Media Management")).not.toBeInTheDocument();
    expect(screen.queryByText("Digital Products")).not.toBeInTheDocument();
    expect(screen.queryByText("Growth")).not.toBeInTheDocument();
    expect(screen.queryByText("Enterprise")).not.toBeInTheDocument();
  });
});

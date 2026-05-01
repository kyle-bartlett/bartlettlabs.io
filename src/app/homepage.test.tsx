import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import HomePage from "./page";

describe("HomePage", () => {
  it("uses the audit-first growth-system homepage and removes fake proof", () => {
    renderWithProviders(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "Stop losing jobs to the company that answered first.",
      }),
    ).toBeInTheDocument();

    for (const link of screen.getAllByRole("link", {
      name: /Request a 15-Min Audit|Request Audit/i,
    })) {
      expect(link).toHaveAttribute("href", "/book");
    }

    expect(screen.queryByText("David R.")).not.toBeInTheDocument();
    expect(screen.queryByText("Social Media Management")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "One operating system. Three engines. No loose ends.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Built for the trades that keep Houston running.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "The part they are missing: show the system working.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("GoHighLevel command center"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Purdue engineering meets small-town handshake.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Houston-area pages that can actually rank and sell.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Pick the first system. Scale when it proves itself.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Your data stays yours. Period.",
      }),
    ).toBeInTheDocument();
  });
});

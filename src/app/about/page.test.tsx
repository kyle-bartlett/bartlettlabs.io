import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("uses first-person copy, includes Belk, and removes the old AI-team framing", () => {
    renderWithProviders(<AboutPage />);

    expect(screen.getByRole("heading", { name: /About/i })).toBeInTheDocument();
    expect(screen.getByText(/I'm Kyle Bartlett\./)).toBeInTheDocument();
    expect(screen.getByText(/Sears, then Belk, then Apple, and now Anker/i)).toBeInTheDocument();
    expect(screen.getByText(/Operations-first thinking/i)).toBeInTheDocument();
    expect(screen.queryByText(/AI-powered team/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Demo Sites Built/i)).not.toBeInTheDocument();
  });
});

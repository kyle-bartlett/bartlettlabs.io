import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import WorkPage from "./page";

describe("WorkPage", () => {
  it("labels the current work honestly as demos", () => {
    renderWithProviders(<WorkPage />);

    expect(
      screen.getByRole("heading", { name: "Honest proof beats invented metrics." }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Demo").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Demo preview slot").length).toBeGreaterThan(0);
  });
});

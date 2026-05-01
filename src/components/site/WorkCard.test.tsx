import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { workItems } from "@/content/work";
import { WorkCard } from "./WorkCard";

describe("WorkCard", () => {
  it("shows the honest demo label and screenshot placeholder copy", () => {
    renderWithProviders(<WorkCard item={workItems[0]} />);

    expect(screen.getByText("Demo")).toBeInTheDocument();
    expect(
      screen.getByText("Homepage and service-page screenshots coming soon"),
    ).toBeInTheDocument();
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
  });
});

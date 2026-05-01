import { screen } from "@testing-library/react";
import { vi } from "vitest";
import { renderWithProviders } from "@/test/render";

vi.mock("@/lib/blog/posts", async () => {
  const actual = await vi.importActual<typeof import("@/lib/blog/posts")>(
    "@/lib/blog/posts",
  );

  return {
    ...actual,
    getAllPosts: () => [actual.blogPosts[0]],
  };
});

import BlogPage from "./page";

describe("BlogPage", () => {
  it("uses the rebuilt shell and sends booking through /book", () => {
    renderWithProviders(<BlogPage />);

    expect(screen.getAllByRole("link", { name: "Work" }).length).toBeGreaterThan(0);
    expect(
      screen.queryByRole("link", { name: "Testimonials" }),
    ).not.toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Request Audit" })
        .some((link) => link.getAttribute("href") === "/book"),
    ).toBe(true);
    expect(screen.queryByText(/The blog is mid-refresh too/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/useful systems and clearer operations/i),
    ).toBeInTheDocument();
  });
});

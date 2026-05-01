import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import { getAllPosts } from "@/lib/blog/posts";
import BlogPostPage from "./page";

describe("BlogPostPage", () => {
  it("uses the rebuilt shell and routes article CTAs through /book", async () => {
    const post = getAllPosts()[0];
    const page = await BlogPostPage({
      params: Promise.resolve({ slug: post.slug }),
    });

    renderWithProviders(page);

    expect(screen.getAllByRole("link", { name: "Work" }).length).toBeGreaterThan(0);
    expect(
      screen.queryByRole("link", { name: "Testimonials" }),
    ).not.toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "Request Audit" })
        .some((link) => link.getAttribute("href") === "/book"),
    ).toBe(true);
    expect(
      screen.queryByText(/Some blog posts predate the site rebuild/i),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/directional guidance, not a fixed quote/i),
    ).toBeInTheDocument();
  });
});

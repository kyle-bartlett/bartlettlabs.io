import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/test/render";
import { guarantees } from "@/content/guarantees";
import { GuaranteeCarousel } from "./GuaranteeCarousel";

describe("GuaranteeCarousel", () => {
  it("renders all guarantee slides with the first one active", () => {
    renderWithProviders(<GuaranteeCarousel autoAdvanceMs={0} />);

    const slides = document.querySelectorAll(".guarantee-carousel-slide");
    expect(slides.length).toBe(guarantees.length);
    expect(slides[0].classList.contains("is-active")).toBe(true);
  });

  it("advances to the next slide when the next arrow is clicked", () => {
    renderWithProviders(<GuaranteeCarousel autoAdvanceMs={0} />);

    fireEvent.click(screen.getByRole("button", { name: /next guarantee/i }));

    const slides = document.querySelectorAll(".guarantee-carousel-slide");
    expect(slides[0].classList.contains("is-active")).toBe(false);
    expect(slides[1].classList.contains("is-active")).toBe(true);
  });

  it("supports jumping to a specific slide via dot indicators", () => {
    renderWithProviders(<GuaranteeCarousel autoAdvanceMs={0} />);

    const dots = screen.getAllByRole("tab");
    expect(dots.length).toBe(guarantees.length);

    fireEvent.click(dots[2]);
    const slides = document.querySelectorAll(".guarantee-carousel-slide");
    expect(slides[2].classList.contains("is-active")).toBe(true);
  });

  it("wraps around past the end of the list", () => {
    renderWithProviders(<GuaranteeCarousel autoAdvanceMs={0} />);

    const prev = screen.getByRole("button", { name: /previous guarantee/i });
    fireEvent.click(prev);

    const slides = document.querySelectorAll(".guarantee-carousel-slide");
    expect(slides[guarantees.length - 1].classList.contains("is-active")).toBe(true);
  });
});

import { fireEvent, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/render";
import { ServiceDemoModal } from "./ServiceDemoModal";

// jsdom doesn't implement HTMLDialogElement methods — stub them.
beforeAll(() => {
  if (typeof HTMLDialogElement !== "undefined") {
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function showModal() {
        this.setAttribute("open", "");
      };
    }
    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function close() {
        this.removeAttribute("open");
      };
    }
  }
});

const baseProps = {
  id: "missed-call",
  title: "Missed Call Text-Back",
  description:
    "If you don't answer, you don't get the job. Instantly text back missed calls.",
  eyebrow: "$500 setup + $99/mo",
  detailsHref: "/services#websites",
};

describe("ServiceDemoModal", () => {
  it("renders the placeholder treatment when no demo asset is configured", () => {
    renderWithProviders(
      <ServiceDemoModal {...baseProps} isOpen onClose={vi.fn()} />,
    );

    expect(
      screen.getByRole("heading", { name: baseProps.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Walkthrough coming soon")).toBeInTheDocument();
    expect(screen.queryByText(/your browser does not support/i)).not.toBeInTheDocument();
  });

  it("renders the video element when a demo asset is provided", () => {
    renderWithProviders(
      <ServiceDemoModal
        {...baseProps}
        isOpen
        onClose={vi.fn()}
        demo={{
          videoPath: "/demos/missed-call-text-back.mp4",
          videoPathWebm: "/demos/missed-call-text-back.webm",
          posterPath: "/demos/missed-call-text-back.jpg",
          caption: "Missed call to booked estimate in under 2 minutes.",
          durationSec: 60,
        }}
      />,
    );

    const video = document.querySelector("video.service-demo-video");
    expect(video).not.toBeNull();
    expect(video?.querySelectorAll("source").length).toBe(2);
    expect(screen.getByText(/booked estimate in under 2 minutes/i)).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    renderWithProviders(
      <ServiceDemoModal {...baseProps} isOpen onClose={onClose} />,
    );

    fireEvent.click(screen.getByRole("button", { name: /close demo/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("offers a Book a 15-min call CTA that closes the modal on click", () => {
    const onClose = vi.fn();
    renderWithProviders(
      <ServiceDemoModal {...baseProps} isOpen onClose={onClose} />,
    );

    const bookLink = screen.getByRole("link", { name: /book a 15-min call/i });
    fireEvent.click(bookLink);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

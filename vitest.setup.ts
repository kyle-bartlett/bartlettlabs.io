import "@testing-library/jest-dom/vitest";
import { createElement } from "react";
import { vi } from "vitest";

const storageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(globalThis, "localStorage", {
  value: storageMock,
  writable: true,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const alt = props.alt;
    const src = props.src;
    const sizes = props.sizes;
    const rest = { ...props };

    delete rest.alt;
    delete rest.src;
    delete rest.fill;
    delete rest.priority;
    delete rest.placeholder;
    delete rest.blurDataURL;
    delete rest.quality;
    delete rest.loader;
    delete rest.unoptimized;
    delete rest.sizes;

    return createElement("img", {
      alt,
      src,
      sizes,
      ...rest,
    });
  },
}));

import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test/render";
import PrivacyPage from "./page";

describe("PrivacyPage", () => {
  it("names the Google Maps Platform and incorporates Google's privacy policy", () => {
    renderWithProviders(<PrivacyPage />);
    const entry = screen.getByText("Google Maps Platform:").closest("li")!;
    expect(entry).toHaveTextContent(/part of this policy by reference/);
    expect(
      entry.querySelector('a[href="https://policies.google.com/privacy"]'),
    ).not.toBeNull();
    expect(
      entry.querySelector(
        'a[href="https://maps.google.com/help/terms_maps.html"]',
      ),
    ).not.toBeNull();
  });
});

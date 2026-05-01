import { beforeEach, describe, expect, it, vi } from "vitest";

const { redirect } = vi.hoisted(() => ({
  redirect: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect,
}));

import DistributionPage from "./distribution/page";
import EnergyPage from "./energy/page";
import HealthcarePage from "./healthcare/page";
import ProfessionalServicesPage from "./professional-services/page";

describe("legacy industry routes", () => {
  beforeEach(() => {
    redirect.mockReset();
  });

  it.each([
    ["distribution", DistributionPage],
    ["energy", EnergyPage],
    ["healthcare", HealthcarePage],
    ["professional services", ProfessionalServicesPage],
  ])("redirects %s to /services", (_label, Page) => {
    Page();

    expect(redirect).toHaveBeenCalledWith("/services");
  });
});

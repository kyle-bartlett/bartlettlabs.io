import path from "node:path";
import nextConfig from "../../next.config";

describe("next config", () => {
  it("pins turbopack.root to the repo so builds stop inferring the wrong workspace root", () => {
    expect(nextConfig.turbopack?.root).toBe(path.resolve(process.cwd()));
  });
});

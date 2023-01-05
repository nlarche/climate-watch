import { ClimateWatchDomain } from "./domain/index";
import { OpenMeteoRepository } from "./infrastructure/openMeteoRepository";

describe("Should get Should get temperatures for a coordinates", () => {
  it("should return men temperature for coordinates", async () => {
    const domain = new ClimateWatchDomain(new OpenMeteoRepository());
    const result = await domain.getDataForCoordinate({
      latitude: 47.22,
      longitude: -1.55,
    });
    console.log(result);
    expect(result).not.toBe(null);
  });
});

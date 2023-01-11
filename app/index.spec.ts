import { ClimateWatchDomain } from "./index";
import { OpenMeteoArchiveRepository } from "./infrastructure/openMeteoArchiveRepository";
import { OpenMeteoGeocodingRepository } from "./infrastructure/openMeteoGeocodingRepository";

describe("Should watch climate", () => {
  let domain: ClimateWatchDomain;
  beforeEach(() => {
    domain = new ClimateWatchDomain(
      new OpenMeteoArchiveRepository(),
      new OpenMeteoGeocodingRepository()
    );
  });
  it("should return list of cities according to a name", async () => {
    const result = await domain.getCitiesByNameOrPostalCode("nant");
    console.log(result);
    expect(result).not.toBe(null);
  });
  it("should return list of cities according to a postal code", async () => {
    const result = await domain.getCitiesByNameOrPostalCode("44000");
    console.log(result);
    expect(result).not.toBe(null);
  });
  it("should return men temperature for coordinates", async () => {
    const result = await domain.getDataForCoordinate({
      latitude: 47.22,
      longitude: -1.55,
    });
    console.log(result);
    expect(result).not.toBe(null);
  });
});

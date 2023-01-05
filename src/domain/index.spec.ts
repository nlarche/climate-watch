import { ClimateWatchDomain } from "./index";
import { ClimateDataRepository } from "./repository/climateDataRepository";

describe("Should get Should get temperatures for a coordinates", () => {
  it("should return men temperature for coordinates", async () => {
    const data = [
      {
        period: { start: "2023-01-01", end: "2023-01-31" },
        meanTemperature: 10,
        medianTemperature: 10,
      },
      {
        period: { start: "2022-01-01", end: "2022-01-31" },
        meanTemperature: 9,
        medianTemperature: 9,
      },
      {
        period: { start: "2013-01-01", end: "2013-01-31" },
        meanTemperature: 5,
        medianTemperature: 5,
      },
      {
        period: { start: "1973-01-01", end: "1973-01-31" },
        meanTemperature: 5,
        medianTemperature: 5,
      },
    ];
    let i = 0;
    const climateDataRepository: ClimateDataRepository = {
      getData: () => {
        const mockData = data[i];
        i++;
        return Promise.resolve(mockData);
      },
    };
    const domain = new ClimateWatchDomain(climateDataRepository);
    const result = await domain.getDataForCoordinate({
      latitude: 47.22,
      longitude: -1.55,
    });
    expect(result).toStrictEqual(data);
  });
});

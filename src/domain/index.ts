import { Coordinates } from "./model/Coordinates";
import { ClimateDataRepository } from "./repository/climateDataRepository";
import { TemperatureData } from "./model/data";
import { GetPastTemperatureForACoordinates } from "./query/getPastTemperatureForACoordinates";

export class ClimateWatchDomain {
  private getPastTemperatureForACoordinatesQuery: GetPastTemperatureForACoordinates;

  constructor(private climateDataRepository: ClimateDataRepository) {
    this.getPastTemperatureForACoordinatesQuery =
      new GetPastTemperatureForACoordinates(climateDataRepository);
  }

  getDataForCoordinate(coordinates: Coordinates): Promise<TemperatureData[]> {
    return this.getPastTemperatureForACoordinatesQuery.get(coordinates);
  }
}

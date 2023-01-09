import { Coordinates } from "./domain/model/Coordinates";
import { ClimateDataRepository } from "./domain/repository/climateDataRepository";
import { TemperatureData } from "./domain/model/data";
import { GetPastTemperatureForACoordinates } from "./domain/query/getPastTemperatureForACoordinates";
import { GeocodingRepository } from "./domain/repository/geocodingRepository";
import { GetCitiesByNameOrPostalCode } from "./domain/query/getCitiesByNameOrPostalCode";
import { City } from "./domain/model/City";

export class ClimateWatchDomain {
  private getPastTemperatureForACoordinatesQuery: GetPastTemperatureForACoordinates;
  private getCitiesByNameOrPostalCodeQuery: GetCitiesByNameOrPostalCode;

  constructor(
    private climateDataRepository: ClimateDataRepository,
    private geocodingRepository: GeocodingRepository
  ) {
    this.getPastTemperatureForACoordinatesQuery =
      new GetPastTemperatureForACoordinates(climateDataRepository);
    this.getCitiesByNameOrPostalCodeQuery = new GetCitiesByNameOrPostalCode(
      geocodingRepository
    );
  }

  getDataForCoordinate(coordinates: Coordinates): Promise<TemperatureData[]> {
    return this.getPastTemperatureForACoordinatesQuery.get(coordinates);
  }

  getCitiesByNameOrPostalCode(nameOrCoordinate: string): Promise<City[]> {
    return this.getCitiesByNameOrPostalCodeQuery.get(nameOrCoordinate);
  }
}

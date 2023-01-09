import { ClimateDataRepository } from "../repository/climateDataRepository";
import { Query } from "../../core/Query";
import { Coordinates } from "../model/Coordinates";
import {
  fiftyYearBefore,
  firstDayOfMonth,
  formatToISO8601,
  lastYear,
  tenYearBefore,
  yesterdayOrLastDayOfMonth,
} from "../../utils/date";
import { TemperatureData } from "../model/data";
import { City } from "../model/City";
import { GeocodingRepository } from "../repository/geocodingRepository";

export class GetCitiesByNameOrPostalCode implements Query<string, City[]> {
  constructor(private geocodingRepository: GeocodingRepository) {}

  async get(nameOrPostalCode: string): Promise<City[]> {
    return this.geocodingRepository.searchByNameOrPostalCode(nameOrPostalCode);
  }
}

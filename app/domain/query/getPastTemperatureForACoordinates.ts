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

export class GetPastTemperatureForACoordinates
  implements Query<Coordinates, TemperatureData[]>
{
  constructor(private climateDataRepository: ClimateDataRepository) {}

  async #getData(
    date: Date,
    coordinates: Coordinates
  ): Promise<TemperatureData> {
    return await this.climateDataRepository.getData(coordinates, {
      start: formatToISO8601(firstDayOfMonth(date)),
      end: formatToISO8601(yesterdayOrLastDayOfMonth(date)),
    });
  }

  async get(coordinates: Coordinates): Promise<TemperatureData[]> {
    const currentDate = lastYear(new Date());
    const currentMonthData = await this.#getData(currentDate, coordinates);
    const lastYearData = await this.#getData(
      lastYear(currentDate),
      coordinates
    );
    const tenYearBeforeData = await this.#getData(
      tenYearBefore(currentDate),
      coordinates
    );
    const fiftyYearBeforeData = await this.#getData(
      fiftyYearBefore(currentDate),
      coordinates
    );
    return [
      currentMonthData,
      lastYearData,
      tenYearBeforeData,
      fiftyYearBeforeData,
    ];
  }
}

import { ClimateDataRepository } from "../domain/repository/climateDataRepository";
import { Coordinates } from "../domain/model/Coordinates";
import { Period } from "../domain/model/Period";
import { TemperatureData } from "../domain/model/data";
import { mapToTemperatureData } from "./acl/OpenMeteoToTemperatureDataMapper";

export class OpenMeteoArchiveRepository implements ClimateDataRepository {
  apiUrl = `https://archive-api.open-meteo.com/v1/archive`;
  dailyParameters = "&daily=temperature_2m_max,temperature_2m_min";

  getData(coordinates: Coordinates, period: Period): Promise<TemperatureData> {
    const dates = `&start_date=${period.start}&end_date=${period.end}`;
    return fetch(
      `${this.apiUrl}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}${dates}${this.dailyParameters}&timezone=auto`
    )
      .then((r) => {
        if (!r.ok) {
          // catch error
          console.error(`error while calling ${this.apiUrl}`, r);
        }
        return r.json();
      })
      .then(mapToTemperatureData(period))
      .catch((e) => {
        console.error(e);
        return {} as any;
      });
  }
}

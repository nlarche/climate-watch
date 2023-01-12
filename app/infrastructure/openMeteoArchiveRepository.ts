import { ClimateDataRepository } from "../domain/repository/climateDataRepository";
import { Coordinates } from "../domain/model/Coordinates";
import { Period } from "../domain/model/Period";
import { TemperatureData } from "../domain/model/data";
import { mapToTemperatureData } from "./acl/OpenMeteoToTemperatureDataMapper";
import { RepoUrl } from "./utils/repoUrl";

export class OpenMeteoArchiveRepository implements ClimateDataRepository {
  apiUrl = new RepoUrl(`https://archive-api.open-meteo.com/v1/archive`);

  constructor() {
    this.apiUrl.addParams("daily", [
      "temperature_2m_max",
      "temperature_2m_min",
    ]);
    this.apiUrl.addParams("timezone", "auto");
  }

  getData(coordinates: Coordinates, period: Period): Promise<TemperatureData> {
    this.apiUrl.addParams("start_date", period.start);
    this.apiUrl.addParams("end_date", period.end);
    this.apiUrl.addParams("latitude", coordinates.latitude.toString());
    this.apiUrl.addParams("longitude", coordinates.longitude.toString());
    return fetch(this.apiUrl.toURL())
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

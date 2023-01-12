import { GeocodingRepository } from "../domain/repository/geocodingRepository";
import { City } from "../domain/model/City";
import { mapToCities } from "./acl/openMeteoCityToCityMapper";
import { RepoUrl } from "./utils/repoUrl";

export class OpenMeteoGeocodingRepository implements GeocodingRepository {
  apiUrl = new RepoUrl(`https://geocoding-api.open-meteo.com/v1/search`);

  searchByNameOrPostalCode(nameOrPostalCode: string): Promise<City[]> {
    this.apiUrl.addParams("name", nameOrPostalCode);
    this.apiUrl.addParams("format", "json");
    this.apiUrl.addParams("language", "fr");
    return fetch(this.apiUrl.toURL())
      .then((res) => {
        if (!res.ok) {
          console.error(`error while calling ${this.apiUrl}`, res);
        }
        return res.json();
      })
      .then(mapToCities);
  }
}

import { GeocodingRepository } from "../domain/repository/geocodingRepository";
import { City } from "../domain/model/City";
import { mapToCities } from "./acl/openMeteoCityToCityMapper";

export class OpenMeteoGeocodingRepository implements GeocodingRepository {
  apiUrl = `https://geocoding-api.open-meteo.com/v1/search`;

  searchByNameOrPostalCode(nameOrPostalCode: String): Promise<City[]> {
    return fetch(
      `${this.apiUrl}?name=${nameOrPostalCode}&format=json&language=fr`
    )
      .then((res) => {
        if (!res.ok) {
          console.error(`error while calling ${this.apiUrl}`, res);
        }
        return res.json();
      })
      .then(mapToCities);
  }
}

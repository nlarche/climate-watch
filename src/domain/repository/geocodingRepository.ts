import { Coordinates } from "../model/Coordinates";
import { TemperatureData } from "../model/data";
import { Period } from "../model/Period";
import { City } from "../model/City";

export interface GeocodingRepository {
  searchByNameOrPostalCode: (nameOrPostalCode: String) => Promise<City[]>;
}

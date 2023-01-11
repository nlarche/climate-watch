import { Coordinates } from "../model/Coordinates";
import { TemperatureData } from "../model/data";
import { Period } from "../model/Period";

export interface ClimateDataRepository {
  getData: (
    coordinates: Coordinates,
    period: Period
  ) => Promise<TemperatureData>;
}

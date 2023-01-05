import { Period } from "./Period";

export interface TemperatureData {
  period: Period;
  meanTemperature: number;
  medianTemperature: number;
}

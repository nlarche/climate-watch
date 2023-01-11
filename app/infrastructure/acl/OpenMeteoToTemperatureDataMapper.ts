import { Period } from "../../domain/model/Period";
import { mean, median } from "../../utils/math";

interface Daily {
  temperature_2m_max: (number | null)[];
  temperature_2m_min: (number | null)[];
}

export interface OpenMeteoData {
  daily: Daily;
}

export function mapToTemperatureData(period: Period) {
  return (openMeteoData: OpenMeteoData) => {
    return {
      period,
      meanTemperature: mean([
        ...openMeteoData.daily.temperature_2m_max,
        ...openMeteoData.daily.temperature_2m_min,
      ]),
      medianTemperature: median([
        ...openMeteoData.daily.temperature_2m_max,
        ...openMeteoData.daily.temperature_2m_min,
      ]),
    };
  };
}

import { City } from "../../domain/model/City";

export interface OpenMeteoGeocodingResponse {
  results: OpenMeteoCity[];
}

export interface OpenMeteoCity {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export function mapToCities(response: OpenMeteoGeocodingResponse): City[] {
  return response.results.map(mapToCity);
}

export function mapToCity(city: OpenMeteoCity): City {
  return {
    name: city.name,
    country: city.country,
    coordinates: {
      latitude: city.latitude,
      longitude: city.longitude,
    },
  };
}

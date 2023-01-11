import { GetCitiesByNameOrPostalCode } from "./getCitiesByNameOrPostalCode";
import { GeocodingRepository } from "../repository/geocodingRepository";

it("should return a list of city for a name", async () => {
  const data = [
    {
      name: "Nantes",
      country: "France",
      coordinates: { latitude: 47.21725, longitude: -1.55336 },
    },
    {
      name: "Nanterre",
      country: "France",
      coordinates: { latitude: 48.89198, longitude: 2.20675 },
    },
  ];
  const geocodingRepository: GeocodingRepository = {
    searchByNameOrPostalCode: () => {
      return Promise.resolve(data);
    },
  };
  const query = new GetCitiesByNameOrPostalCode(geocodingRepository);
  const result = await query.get("na");
  expect(result).toStrictEqual(data);
});

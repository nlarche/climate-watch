import { ClimateWatchDomain } from "./index";
import { OpenMeteoArchiveRepository } from "./infrastructure/openMeteoArchiveRepository";
import { OpenMeteoGeocodingRepository } from "./infrastructure/openMeteoGeocodingRepository";

const domain = new ClimateWatchDomain(
  new OpenMeteoArchiveRepository(),
  new OpenMeteoGeocodingRepository()
);

export { domain };

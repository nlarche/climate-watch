import "./App.css";
import { SearchCityInput } from "./components/SearchCityInput";
import { City } from "@climate-watch/app/domain/model/City";
import { useEffect, useState } from "react";
import { TemperatureData } from "@climate-watch/app/domain/model/data";
import { domain } from "@climate-watch/app/domain";
import { TemperatureGraph } from "./components/TemperatureGraph";

export type CityTemperatureData = Map<City, TemperatureData[]>;

function useTemperatureData(
  selectedCity?: City
): [CityTemperatureData, (city: City) => void] {
  const [cityData, setCityData] = useState<CityTemperatureData>(new Map([]));
  useEffect(() => {
    if (selectedCity) {
      domain
        .getTemperatureDataForCoordinate(selectedCity.coordinates)
        .then((data) => {
          if (!cityData.has(selectedCity)) {
            cityData.set(selectedCity, data);
            setCityData(new Map(cityData));
          }
        });
    }
  }, [selectedCity]);

  function removeData(city: City) {
    cityData.delete(city);
    setCityData(new Map(cityData));
  }

  return [cityData, removeData];
}

function App() {
  const [selectedCity, setSelectedCity] = useState<City>();
  const [temperatureData, removeData] = useTemperatureData(selectedCity);

  function handleCitiesChange(city: City) {
    setSelectedCity(city);
  }

  function handleDelete(city: City) {
    removeData(city);
  }

  return (
    <div className="App">
      <h2>Climate Watch</h2>
      <SearchCityInput handleChange={handleCitiesChange}></SearchCityInput>
      <div className="grid">
        {[...temperatureData.keys()].map((city: City) => (
          <div key={city.name}>
            <div>
              {city.name}
              <span onClick={() => handleDelete(city)}>x</span>
            </div>
            {temperatureData.has(city) ? (
              <TemperatureGraph
                inputs={temperatureData.get(city)!}
              ></TemperatureGraph>
            ) : (
              <span>No data</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

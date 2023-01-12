import AsyncSelect from "react-select/async";
import { domain } from "@climate-watch/app/domain";
import { City } from "@climate-watch/app/domain/model/City";
import { SingleValue } from "react-select";

interface SearchInputProps {
  handleChange: (city: City) => void;
}

export function SearchCityInput({ handleChange }: SearchInputProps) {
  const loadOptions = (inputValue: string) =>
    domain.getCitiesByNameOrPostalCode(inputValue).then((cities) =>
      cities.map((city: City) => ({
        value: city,
        label: `${city.name} - ${city.country}`,
      }))
    );

  const setSelectedOption = (selectedOptions: SingleValue<{ value: City }>) => {
    selectedOptions && handleChange(selectedOptions.value);
  };
  return (
    <AsyncSelect
      loadOptions={loadOptions}
      onChange={setSelectedOption}
    ></AsyncSelect>
  );
}

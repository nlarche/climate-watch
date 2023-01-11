import { FormEvent, useEffect, useState } from "react";
import { domain } from "@climate-watch/app/domain";
import { City } from "@climate-watch/app/domain/model/City";

export function SearchInput() {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([] as City[]);

  useEffect(() => {
    if (search.length >= 2) {
      domain.getCitiesByNameOrPostalCode(search).then((cities) => {
        setCities(cities);
      });
    }
  }, [search]);

  function onChange(e: FormEvent<HTMLInputElement>) {
    setSearch(e.currentTarget.value);
  }

  function onClear() {
    setSearch("");
    setCities([]);
  }

  return (
    <div>
      <input value={search} onChange={onChange} />
      <button onClick={onClear}>X</button>
      <ul>
        {cities.map((city: City) => (
          <li>
            {city.name} - {city.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

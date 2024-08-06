import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../Api";
import "./Search.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      let response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      let json = await response.json();

      return {
        options: json.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (error) {
      console.log("No results found");
      console.log(error);
      return {
        options: [],
      };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setSearch(" ");
  };

  return (
    <AsyncPaginate
      className="search"
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;

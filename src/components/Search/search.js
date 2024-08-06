import { useState, useCallback } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../Api";
import "./Search.css";

const cache = {}; //cache object to store results of recent searches

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadOptions = async (inputValue) => {
    //before making fetch call checks if input value is in cache and returns it
    if (cache[inputValue]) {
      return cache[inputValue];
    }

    setLoading(true); //Set loading to true before fetching data

    try {
      let response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      const json = await response.json();
      const options = {
        options: json.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };

      cache[inputValue] = options;
      return options;
    } catch (error) {
      console.log("No results found");
      console.log(error);
      return {
        options: [],
      };
    } finally {
      setLoading(false); //Set loading to fasle after fetching data
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setSearch(null);
  };

  return (
    <div className="search-container">
      <AsyncPaginate
        className="search"
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={useCallback(loadOptions, [])} //wrapped useCallback to memoize function and avoid re-renders
      />
      {loading}{" "}
    </div>
  );
};

export default Search;

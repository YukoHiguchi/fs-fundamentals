import { useEffect, useState } from "react";
import countryService from "./services/countries";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    countryService.getAll().then((allcountries) => setCountries(allcountries));
  }, []);

  useEffect(() => {
    if (!searchValue || !countries) return;
    const filteredCountries = countries.filter(
      (country) =>
        country.name.common
          .toLowerCase()
          .indexOf(searchValue.toLocaleLowerCase()) >= 0
    );
    setFilteredCountries(filteredCountries);
  }, [countries, searchValue]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Filter searchValue={searchValue} handleChange={handleChange} />
      {filteredCountries.length >= 10 ? (
        <p>Too meny matches, specify another filter</p>
      ) : (
        filteredCountries.length > 1 && (
          <Countries countries={filteredCountries} />
        )
      )}
      {filteredCountries.length === 1 && (
        <CountryDetail country={filteredCountries[0]} />
      )}
    </>
  );
}

export default App;

import { useState } from "react";
import countryService from "../services/countries";
import CountryDetail from "./CountryDetail";

const Countries = ({ countries }) => {
  const [country, setCountry] = useState(null);
  const handleClick = (name) => {
    countryService.getCountry(name).then((response) => {
      setCountry(response);
    });
  };
  return (
    <div>
      {countries.map((country) => (
        <p key={country.name.common}>
          {country.name.common}{" "}
          <button
            onClick={() => {
              handleClick(country.name.common);
            }}
          >
            show
          </button>
        </p>
      ))}
      <CountryDetail country={country} />
    </div>
  );
};

export default Countries;

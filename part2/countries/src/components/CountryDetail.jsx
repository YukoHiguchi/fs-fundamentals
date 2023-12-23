import Weather from "./Weather";

const CountryDetail = ({ country }) => {
  if (!country) return null;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        capital {country.capital[0]}
        <br />
        area {country.area}
      </p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} />

      <Weather capital={country.capital[0]} />
    </div>
  );
};

export default CountryDetail;

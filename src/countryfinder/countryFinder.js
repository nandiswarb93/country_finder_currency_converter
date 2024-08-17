import axios from "axios";
import React, { useState } from "react";

const CountryFinder = () => {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = async (country) => {
    try {
      const { data, status } = await axios.get(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`
      );
      if (status === 200) {
        setCountryData(data);
        setError(false);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (country.length > 0) {
      fetchData(country);
    } else {
      setCountryData([]);
      setError(false);
    }
  };
  console.log(countryData);
  return (
    <>
      <h3>County Finder find here</h3>
      <form>
        <input
          type="text"
          placeholder="searchCountry"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={submitHandler}> Search</button>
      </form>
      {error ? (
        <h5>Loading</h5>
      ) : (
        <>
          {countryData.map((eachCountry) => (
            <div key={eachCountry.ccn3}>
              <p>Country Name : {eachCountry.name.common}</p>
              <img
                src={eachCountry.flags.svg}
                alt={eachCountry.name.common}
                width={200}
                height={200}
              ></img>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default CountryFinder;

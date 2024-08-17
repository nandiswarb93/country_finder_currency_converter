// import axios from "axios";
// import React, { useState } from "react";
// import "./countryFinder.css";

// const CountryFinder = () => {
//   const [country, setCountry] = useState("");
//   const [countryData, setCountryData] = useState([]);
//   const [error, setError] = useState(false);
//   const [array, setArray] = useState([]);

//   const fetchData = async (country) => {
//     try {
//       const { data, status } = await axios.get(
//         `https://restcountries.com/v3.1/name/${country}?fullText=true`
//       );
//       if (status === 200) {
//         setCountryData(data);

//         setError(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setError(true);
//     }
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (country.length > 0) {
//       fetchData(country);
//       const suggestions = () => {
//         if (!array.includes(country)) {
//           return [...array, country];
//         } else {
//           alert("already searched see the recent search history");
//           return array;
//         }
//       };
//       setArray(suggestions);
//     } else {
//       setCountryData([]);
//       setError(false);
//       alert("please enter city correctly");
//     }
//   };
//   console.log(countryData);
//   console.log(array);

//   const deleteHandler = (each) => {
//     const deleted = array.filter((country, idx) => idx !== each);
//     setArray(deleted);
//   };

//   const recentSearch = (name) => {
//     fetchData(name);
//   };
//   return (
//     <>
//       <h3>County Finder find here</h3>
//       <form>
//         <input
//           type="text"
//           placeholder="searchCountry"
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//         />
//         <button onClick={submitHandler}> Search</button>
//       </form>
//       {array.length > 0 && (
//         <div>
//           <h5>recent search</h5>
//           {array.map((eachData, idx) => (
//             <>
//               <h5
//                 key={idx}
//                 onClick={() => {
//                   recentSearch(eachData);
//                 }}
//               >
//                 {eachData}
//               </h5>
//               <button
//                 onClick={() => {
//                   deleteHandler(idx);
//                 }}
//               >
//                 delete
//               </button>
//             </>
//           ))}
//         </div>
//       )}
//       {error ? (
//         <h5>Loading</h5>
//       ) : (
//         <>
//           {countryData.map((eachCountry) => (
//             <div key={eachCountry.ccn3}>
//               <img
//                 src={eachCountry.flags.svg}
//                 alt={eachCountry.name.common}
//                 width={200}
//                 height={200}
//               ></img>
//               <p>Country Name : {eachCountry.name.common}</p>
//               {/* <p>official : {eachCountry.name.nativeName.eng.official}</p> */}
//               <p>Capital : {eachCountry.capital[0]}</p>
//               <p>Continent : {eachCountry.continents[0]}</p>
//               <p>Population : {eachCountry.population}</p>
//             </div>
//           ))}
//         </>
//       )}
//     </>
//   );
// };

// export default CountryFinder;

import axios from "axios";
import React, { useState } from "react";
import "./CountryFinder.css";

const CountryFinder = () => {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [error, setError] = useState(false);
  const [array, setArray] = useState([]);

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
      const suggestions = () => {
        if (!array.includes(country)) {
          return [...array, country];
        } else {
          alert("Already searched, see the recent search history");
          return array;
        }
      };
      setArray(suggestions);
    } else {
      setCountryData([]);
      setError(false);
      alert("Please enter the country name correctly");
    }
  };

  const deleteHandler = (idx) => {
    const deleted = array.filter((_, i) => i !== idx);
    setArray(deleted);
  };

  const recentSearch = (name) => {
    fetchData(name);
  };

  return (
    <div className="container">
      <h3 className="title">Country Finder</h3>
      <form className="form">
        <input
          type="text"
          placeholder="Search Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="search-input"
        />
        <button onClick={submitHandler} className="search-button">
          Search
        </button>
      </form>
      {array.length > 0 && (
        <div className="recent-search">
          <h5>Recent Searches</h5>
          {array.map((eachData, idx) => (
            <div key={idx} className="recent-item">
              <h5
                onClick={() => {
                  recentSearch(eachData);
                }}
                className="recent-item-text"
              >
                {eachData}
              </h5>
              <button
                onClick={() => {
                  deleteHandler(idx);
                }}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {error ? (
        <h5 className="loading-text">Loading...</h5>
      ) : (
        <>
          {countryData.map((eachCountry) => (
            <div className="country-card" key={eachCountry.ccn3}>
              <img
                src={eachCountry.flags.svg}
                alt={eachCountry.name.common}
                className="country-flag"
              />
              <p className="country-name">
                Country Name: {eachCountry.name.common}
              </p>
              <p className="country-capital">
                Capital: {eachCountry.capital[0]}
              </p>
              <p className="country-continent">
                Continent: {eachCountry.continents[0]}
              </p>
              <p className="country-population">
                Population: {eachCountry.population}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CountryFinder;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function Detail() {
  const { ID } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/countries/${ID}`)
      .then((response) => {
        setCountry(response.data);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  }, [ID]);

  return (
    <div>
      <div>
        <Link to={'/home'}>
          <button>Home</button>
        </Link>
      </div>
      <div>
        {country ? (
          <div>
            <img src={country.flags} alt={country.name} />
            <p>Name: {country.name}</p>
            <p>Continent:{country.continents} </p>
            <p>Capital: {country.capital}</p>
            <p>Subregion: {country.subregion} </p>
            <p>Area: {country.area}</p>
            <p>Population: {country.population}</p>
          </div>
        ) : (
          <p>Loading country details...</p>
        )}
      </div>
    </div>
  );
}

export default Detail;

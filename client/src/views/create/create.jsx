import { useState, useEffect } from "react";
import { getAllCountries } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import axios from 'axios';

function Create() {
  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: [],
    countries: [],
  });

  const [selectedCountries, setSelectedCountries] = useState([]); // Estado para los países seleccionados
  

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (name === "season") {
      if (input.season.includes(value)) {
        setInput({
          ...input,
          season: input.season.filter((season) => season !== value),
        });
      } else {
        setInput({
          ...input,
          season: [...input.season, value],
        });
      }
    } else if (name === "countries") {
      const selectedCountryValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setSelectedCountries(selectedCountryValues);
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const dispatch = useDispatch()

  const allCountries = useSelector((state) => state.allCountries)

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...input,
      countries: selectedCountries, // Usa los países seleccionados
    };

    axios
      .post('http://localhost:3001/activity', dataToSend)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  }

  return (
    <div>
      <h1>Create activity</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <div>
            <input
              placeholder="Activity name..."
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <div>
            <select
              name="difficulty"
              value={input.difficulty}
              onChange={handleChange}
            >
              <option value="">Select difficulty</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="duration">Duration</label>
          <div>
            <select
              name="duration"
              value={input.duration}
              onChange={handleChange}
            >
              <option value="">Select duration</option>
              <option value="1hs">1hs</option>
              <option value="2hs">2hs</option>
              <option value="3hs">3hs</option>
              <option value="4hs">4hs</option>
              <option value="5hs">5hs</option>
              <option value="6hs">6hs</option>
              <option value="7hs">7hs</option>
              <option value="8hs">8hs</option>
              <option value="9hs">9hs</option>
              <option value="10hs">10hs</option>
            </select>
          </div>
        </div>
        <br />
        <div>
          <label>Season</label>
          <div>
            <label htmlFor="spring">Spring</label>
            <input
              type="checkbox"
              name="season"
              value="spring"
              checked={input.season.includes("spring")}
              onChange={handleChange}
            />
            <label htmlFor="summer">Summer</label>
            <input
              type="checkbox"
              name="season"
              value="summer"
              checked={input.season.includes("summer")}
              onChange={handleChange}
            />
            <label htmlFor="autumn">Autumn</label>
            <input
              type="checkbox"
              name="season"
              value="autumn"
              checked={input.season.includes("autumn")}
              onChange={handleChange}
            />
            <label htmlFor="winter">Winter</label>
            <input
              type="checkbox"
              name="season"
              value="winter"
              checked={input.season.includes("winter")}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="countries">Countries</label>
          <div>
            <select
              name="countries"
              value={selectedCountries}
              onChange={handleChange}
              multiple
            >
              {allCountries.map((country) => (
                <option key={country.ID} value={country.ID}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <h2>Selected Countries:</h2>
          <ul>
            {selectedCountries.map((countryId) => {
              const country = allCountries.find((c) => c.ID === countryId);
              return (
                <li key={country.ID}>{country.name}</li>
              );
            })}
          </ul>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Create;

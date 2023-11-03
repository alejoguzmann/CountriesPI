import { useState, useEffect } from "react";
import axios from 'axios';
import { getAllCountries } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            value={input.difficulty}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            name="duration"
            value={input.duration}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Season</label>
          <div>
            <input
              type="checkbox"
              name="season"
              value="spring"
              checked={input.season.includes("spring")}
              onChange={handleChange}
            />
            <label htmlFor="spring">Spring</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="season"
              value="summer"
              checked={input.season.includes("summer")}
              onChange={handleChange}
            />
            <label htmlFor="summer">Summer</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="season"
              value="autumn"
              checked={input.season.includes("autumn")}
              onChange={handleChange}
            />
            <label htmlFor="autumn">Autumn</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="season"
              value="winter"
              checked={input.season.includes("winter")}
              onChange={handleChange}
            />
            <label htmlFor="winter">Winter</label>
          </div>
        </div>

        <div>
          <label htmlFor="countries">Countries</label>
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

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Create;

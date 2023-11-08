import React, { useState, useEffect } from "react";
import { getAllCountries, getAllActivities} from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom'

import './create.css'

function Create() {
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const allActivities = useSelector((state) => state.allActivities);
  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: [],
    countries: [],
  });
  
  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllActivities()); 
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (type === 'checkbox') {
      handleCheckboxChange(name, value);
    } else if (type === 'select-multiple') {
      handleSelectChange(name, options);
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }

    const validationErrors = validateFields(input);
    setErrors(validationErrors);
  };

  const handleCheckboxChange = (name, value) => {
    const currentValues = [...input[name]];
    if (currentValues.includes(value)) {
      currentValues.splice(currentValues.indexOf(value), 1);
    } else {
      currentValues.push(value);
    }
    setInput({
      ...input,
      [name]: currentValues,
    });
  };

  const handleSelectChange = (name, options) => {
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedCountries(selectedValues);
  };


  useEffect(() => {
    const validationErrors = validateFields(input);
    setErrors(validationErrors);
  }, [input]);

  useEffect(() => {
    const validationErrors = validateFields({
      ...input,
      countries: selectedCountries,
    });
    setErrors(validationErrors);
  }, [selectedCountries]);

  const validateFields = (data) => {
    const { name, difficulty, duration, season, countries } = data;
    const validationErrors = {};

    if (!/^[A-Za-z\s]+$/.test(name)) {
      validationErrors.name = "The name can only contain letters.";
    }
    if (!/^[1-5]$/.test(difficulty)) {
      validationErrors.difficulty = "Select difficulty.";
    }
    if (duration.trim() === '') {
      validationErrors.duration = "select duration.";
    }
    if (season.length === 0) {
      validationErrors.season = "Select at least one station.";
    }
    if (countries.length === 0) {
      validationErrors.countries = "Select at least one country.";
    }
    if (allActivities.some((activity) => activity.name === name)) {
      validationErrors.name = "This activity already exists.";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...input,
      countries: selectedCountries,
    };

    axios
      .post('http://localhost:3001/activity', dataToSend)
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        setInput({
          name: '',
          difficulty: '',
          duration: '',
          season: [],
          countries: [],
        });
        setSelectedCountries([]);
        setErrors({});
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  };

  const isSubmitButtonDisabled = () => {
    for (const errorKey in errors) {
      if (errors[errorKey]) {
        return true;
      }
    }
    if (
      input.name.trim() === '' ||
      input.difficulty.trim() === '' ||
      input.duration.trim() === '' ||
      input.season.length === 0 ||
      selectedCountries.length === 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="create">
      <div className="homee">
        <Link to={'/home'} ><button>Home</button></Link>
      </div>
      <div className="form" >
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
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
          </div>
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
              {errors.difficulty && <p className="error">{errors.difficulty}</p>}
            </div>
          </div>
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
            {errors.duration && <p className="error">{errors.duration}</p>}
          </div>
          <div>
            <label>Season</label>
            <div className="season">
              <div className="checkbox">
                <label htmlFor="spring">Spring</label>
                <input
                  type="checkbox"
                  name="season"
                  value="spring"
                  checked={input.season.includes("spring")}
                  onChange={handleChange}
                />
              </div>
              <div className="checkbox">
                <label htmlFor="summer">Summer</label>
                <input
                  type="checkbox"
                  name="season"
                  value="summer"
                  checked={input.season.includes("summer")}
                  onChange={handleChange}
                />
              </div>
              <div className="checkbox">
                <label htmlFor="autumn">Autumn</label>
                <input
                  type="checkbox"
                  name="season"
                  value="autumn"
                  checked={input.season.includes("autumn")}
                  onChange={handleChange}
                />
              </div>
              <div className="checkbox">
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
            {errors.season && <p className="error">{errors.season}</p>}
          </div>
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
              {errors.countries && <p className="error">{errors.countries}</p>}
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
          <button type="submit" disabled={isSubmitButtonDisabled()}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Create;

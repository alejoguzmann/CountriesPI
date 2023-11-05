import React, { useState, useEffect } from "react";
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
  
  const [selectedCountries, setSelectedCountries] = useState([]);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({}); // Estado para almacenar erroresad
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  
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

    // Validar los campos y actualizar los errores
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
    dispatch(getAllCountries());
  }, [dispatch]);

  useEffect(() => {
    // Llamar a la validación de campos cada vez que cambie el estado 'input'
    const validationErrors = validateFields(input);
    setErrors(validationErrors);
  }, [input]);
  
  // ...
  
  useEffect(() => {
    // Llamar a la validación de campos cada vez que cambie el estado 'selectedCountries'
    const validationErrors = validateFields({
      ...input,
      countries: selectedCountries,
    });
    setErrors(validationErrors);
  }, [selectedCountries]);

  const validateFields = (data) => {
    const { name, difficulty, duration, season, countries } = data;
    const validationErrors = {};

    // Realizar validaciones y agregar errores si es necesario
    if (!/^[A-Za-z\s]+$/.test(name)) {
      validationErrors.name = "El nombre no puede contener números.";
    }
    if (!/^[1-5]$/.test(difficulty)) {
      validationErrors.difficulty = "Seleccione la dificultad.";
    }
    if (duration.trim() === '') { // Validación para campo obligatorio
      validationErrors.duration = "La duración es obligatoria.";
    }
    if (season.length === 0) {
      validationErrors.season = "Seleccione al menos una estación.";
    }
    if (countries.length === 0) {
      validationErrors.countries = "Seleccione al menos un país.";
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
        setIsButtonDisabled(true);
        setErrors({}); // Restablecer errores después del envío exitoso
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  };

  const isSubmitButtonDisabled = () => {
    // Verificar si hay errores en el estado 'errors'
    for (const errorKey in errors) {
      if (errors[errorKey]) {
        return true; // Botón deshabilitado si se encuentra un error
      }
    }
  
    // Verificar si hay campos requeridos vacíos
    if (
      input.name.trim() === '' ||
      input.difficulty.trim() === '' ||
      input.duration.trim() === '' ||
      input.season.length === 0 ||
      selectedCountries.length === 0
    ) {
      return true; // Botón deshabilitado si hay campos requeridos vacíos
    }
  
    return false; // Botón habilitado si no hay errores ni campos requeridos vacíos
  };

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
            {errors.name && <p className="error">{errors.name}</p>}
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
            {errors.difficulty && <p className="error">{errors.difficulty}</p>}
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
          {errors.duration && <p className="error">{errors.duration}</p>}
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
            
            {errors.season && <p className="error">{errors.season}</p>}
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
  );
}

export default Create;

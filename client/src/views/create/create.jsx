import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Create() {
  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    countries: '',
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/activity', input)
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  }

  return (
    <div>
      <Link to={'/home'}>
          <button>Home</button>
        </Link>
      <h1>Create activity</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
x            name="name" 
            value={input.name} 
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <input 
            type="text" 
            name="difficulty" 
            value={input.difficulty} 
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <input 
            type="text" 
            name="duration" 
            value={input.duration} 
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="season">Season</label>
          <input 
            type="text" 
            name="season" 
            value={input.season} 
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="countries">Countries</label>
          <input 
            type="text" 
            name="countries" 
            value={input.countries} 
            onChange={handleChange} />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Create;

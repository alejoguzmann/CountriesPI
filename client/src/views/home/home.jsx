import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllCountries, getByName, getByContinent, getAllActivites, countriesOrder, populationOrder } from '../../redux/actions'

import NavBar from '../../components/navBar/navBar'
import Cards from '../../components/cards/cards'

import './home.css'

function Home() {

  const dispatch = useDispatch()
  const allCountries = useSelector((state) => state.allCountries)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10
  const [searchString, setSearchString] = useState('')
  const [selectedContinent, setSelectedContinent] = useState(''); // Estado para el continente seleccionado
  const filteredCountries = useSelector((state) => state.filteredCountries)
  const allActivities = useSelector((state) => state.allActivities)

    const handleid = (e) => {
        const index = e.target.selectedIndex
        const optionElement = e.target.childNodes[index]
        const optionElementId = optionElement.getAttribute('id')

        if (optionElementId === "All") {
            dispatch(getAllCountries())
        } else {
            dispatch(countriesOrder(optionElementId))
            dispatch(populationOrder(optionElementId))
    }}

    const jandleid = (e) => {
      const index = e.target.selectedIndex
      const optionElement = e.target.childNodes[index]
      const optionElementId = optionElement.getAttribute('id')

      if (optionElementId === "All") {
          dispatch(getAllCountries())
      } else {
          dispatch(populationOrder(optionElementId))
  }}


  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getByName(searchString))
  }

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  const uniqueContinents = [...new Set(allCountries.map(country => country.continents))];

  const handleContinentChange = (e) => {
    const selectedContinent = e.target.value;
    setSelectedContinent(selectedContinent);

    if (selectedContinent) {
      dispatch(getByContinent(selectedContinent)); // Llama a la acción con el continente seleccionado
    }
  };

  return (
    <div className='home'>
      <h1 className='home-title'>Countries</h1>

      <Link to={'/create'} ><button>Create activity</button></Link>

      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />

      <select name="continent" id="continent" onChange={handleContinentChange}>
        <option value="">All Continents</option>
        {uniqueContinents.map((continent, index) => (
          <option key={index} value={continent}>
            {continent}
          </option>
        ))}
      </select>

      <select name="activities" id="activities" >
        <option value="">filtrar por actividad</option>
        {allActivities.map((activity, index) => (
          <option key={index} value={activity}>
            {activity.name}
          </option>
        ))}
      </select>

      <select onChange={(e) => handleid(e)}>
                <option key = "All" id = "All" >Orden</option>
                <option key = "Asc" id = "Asc" >A - Z</option>
                <option key = "Des" id = "Des" >Z - A</option>
      </select>

      <select onChange={(e) => jandleid(e)}>
                <option key = "All" id = "All" >Orden</option>
                <option key = "Asc" id = "Asc" >asc</option>
                <option key = "Des" id = "Des" >desc</option>
      </select>

      <Cards
        allCountries={filteredCountries.length ? filteredCountries : allCountries}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage} />

      <div className='buttons'>
        <br />
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previus page
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= allCountries.length}
        >
          Next page
        </button>
      </div>
    </div>
  );
}

export default Home

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getAllCountries, getByName, getByContinent, getAllActivites, countriesOrder, populationOrder, getByActivity, clearFilter } from '../../redux/actions'

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
  const [selectedActivity, setSelectedActivity] = useState(''); // Estado para la ctivity seleccionado



  const handleid = (e) => {
    const index = e.target.selectedIndex
    const optionElement = e.target.childNodes[index]
    const optionElementId = optionElement.getAttribute('id')

    if (optionElementId === "All") {
      dispatch(getAllCountries())
    } else {
      dispatch(countriesOrder(optionElementId))
    }
  }

  const jandleid = (e) => {
    const index = e.target.selectedIndex
    const optionElement = e.target.childNodes[index]
    const optionElementId = optionElement.getAttribute('id')

    if (optionElementId === "All") {
      dispatch(getAllCountries())
    } else {
      dispatch(populationOrder(optionElementId))
    }
  }


  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getByName(searchString))
  }
  useEffect(() => {
    dispatch(getAllActivites())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])

  const uniqueContinents = [...new Set(allCountries.map(country => country.continents))];

  const handleContinentChange = (e) => {
    const selectedContinent = e.target.value;

    if (selectedContinent === "") {
      dispatch(clearFilter());
      setSelectedContinent(""); 
    } else {
      dispatch(getByContinent(selectedContinent));
      setSelectedContinent(selectedContinent);
    }
  };

  const handleActivityChange = (e) => {
    const selectedActivity = e.target.value;

    if (selectedActivity === "") {
      dispatch(clearFilter())
      setSelectedActivity("")
    } else {
      dispatch(getByActivity(selectedActivity)); // Llama a la acción con la actividad seleccionada
      setSelectedActivity(selectedActivity)
    }
  };

  return (
    <div className='home'>

      <div className='sup'>
        <Link to={'/home'}><h1 className='home-title'>Countries</h1></Link>
        <div className='nav'>
        <NavBar className='create' handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
      </div>

      <div className='filter'>
        <select name="continent" id="continent" onChange={handleContinentChange}>
          <option value="">Filter by Continents</option>
          {uniqueContinents.map((continent, index) => (
            <option key={index} value={continent}>
              {continent}
            </option>
          ))}
        </select>
        <select name="activities" id="activities" onChange={handleActivityChange}>
          <option value="">Filter by activity</option>
          {allActivities.map((activity, index) => (
            <option key={index} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>
        <select name='alphabetical order' onChange={(e) => handleid(e)}>
          <option key="All" id="All" >Alphabetical order</option>
          <option key="Asc" id="Asc" >A - Z</option>
          <option key="Des" id="Des" >Z - A</option>
        </select>
        <select onChange={(e) => jandleid(e)}>
          <option key="All" id="All" >Order by population</option>
          <option key="Asc" id="Asc" >Ascending order</option>
          <option key="Des" id="Des" >Descending order</option>
        </select>
      </div>
      <div>
        <Cards
          allCountries={filteredCountries.length ? filteredCountries : allCountries}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage} />
      </div>

      <div className='buttons'>
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

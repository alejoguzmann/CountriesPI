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
  const filteredCountries = useSelector((state) => state.filteredCountries)
  const allActivities = useSelector((state) => state.allActivities)
  const [selectedContinent, setSelectedContinent] = useState(''); 
  const [selectedActivity, setSelectedActivity] = useState(''); 

  
  useEffect(() => {
    dispatch(getAllActivites())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllCountries())
  }, [dispatch])
  
  const handleAlphabetical = (e) => {
    const index = e.target.selectedIndex
    const optionElement = e.target.childNodes[index]
    const optionElementId = optionElement.getAttribute('id')

    if (optionElementId === "All") {
      dispatch(getAllCountries())
    } else {
      dispatch(countriesOrder(optionElementId))
    }
  }

  const handlePopulation = (e) => {
    const index = e.target.selectedIndex
    const optionElement = e.target.childNodes[index]
    const optionElementId = optionElement.getAttribute('id')

    if (optionElementId === "All") {
      dispatch(getAllCountries())
    } else {
      dispatch(populationOrder(optionElementId))
    }
  }

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
      dispatch(getByActivity(selectedActivity)); 
      setSelectedActivity(selectedActivity)
    }
  };

  return (
    <div className='home'>

      <div className='sup'>
        <Link to={'/home'}><h1 className='home-title'>Countries</h1></Link>
        <div className='nav'>
        <NavBar className='create'  />
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
        <select name='alphabetical order' onChange={(e) => handleAlphabetical(e)}>
          <option key="All" id="All" >Alphabetical order</option>
          <option key="Asc" id="Asc" >A - Z</option>
          <option key="Des" id="Des" >Z - A</option>
        </select>
        <select onChange={(e) => handlePopulation(e)}>
          <option key="All" id="All" >Order by population</option>
          <option key="Asc" id="Asc" >Ascending order</option>
          <option key="Des" id="Des" >Descending order</option>
        </select>
      </div>
      <div>
        <Cards  tCountries={filteredCountries.length ? filteredCountries : allCountries} />
      </div>
    </div>
  );
}

export default Home

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllCountries, getByContinent, getAllActivities, countriesOrder, populationOrder, getByActivity, clearFilter, setCurrentPage } from '../../redux/actions'

function FilterAndOrder({ allCountries, dispatch }) {
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const allActivities = useSelector((state) => state.allActivities);

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const uniqueContinents = [...new Set(allCountries.map(country => country.continents))]

  const handleContinentChange = (selectedContinent) => {
    dispatch(setCurrentPage(1))
    if (selectedContinent === "") {
      dispatch(clearFilter());
      setSelectedContinent("");
    } else {
      dispatch(getByContinent(selectedContinent));
      setSelectedContinent(selectedContinent);
    }
  };

  const handleActivityChange = (selectedActivity) => {
    dispatch(setCurrentPage(1))
    if (selectedActivity === "") {
      dispatch(clearFilter())
      setSelectedActivity("")
    } else {
      dispatch(getByActivity(selectedActivity));
      setSelectedActivity(selectedActivity)
    }
  };

  const handleAlphabeticalChange = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute('id');
    dispatch(setCurrentPage(1))

    if (optionElementId === "All") {
      dispatch(getAllCountries())
    } else {
      dispatch(countriesOrder(optionElementId))
    }
  }

  const handlePopulationChange = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute('id');
    dispatch(setCurrentPage(1))

    if (optionElementId === "All") {
      dispatch(getAllCountries())
    } else {
      dispatch(populationOrder(optionElementId))
    }
  }

  return (
    <div className='filter'>
      <select name="continent" id="continent" onChange={(e) => handleContinentChange(e.target.value)}>
        <option>Filter by Continents</option>
        <option value="">All Countries</option>
        {uniqueContinents.map((continent, index) => (
          <option key={index} value={continent}>
            {continent}
          </option>
        ))}
      </select>
      <select name="activities" id="activities" onChange={(e) => handleActivityChange(e.target.value)}>
        <option>Filter by activity</option>
        <option value="">All Countries</option>
        {allActivities.map((activity, index) => (
          <option key={index} value={activity.name}>
            {activity.name}
          </option>
        ))}
      </select>
      <select name='alphabetical order' onChange={handleAlphabeticalChange}>
        <option key="All" id="All">Alphabetical order</option>
        <option key="Asc" id="Asc">A - Z</option>
        <option key="Des" id="Des">Z - A</option>
      </select>
      <select onChange={handlePopulationChange}>
        <option key="All" id="All">Order by population</option>
        <option key="Asc" id="Asc">Ascending order</option>
        <option key="Des" id="Des">Descending order</option>
      </select>
    </div>
  );
}

export default FilterAndOrder

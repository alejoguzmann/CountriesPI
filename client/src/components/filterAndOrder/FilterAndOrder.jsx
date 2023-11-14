import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllCountries, getByContinent, getAllActivities, countriesOrder, populationOrder, getByActivity, clearFilter, setCurrentPage } from '../../redux/actions';

function FilterAndOrder({ dispatch, selectedContinent, selectedActivity, alphabeticalOrder, populationOrder }) {
  const allCountries = useSelector((state) => state.allCountries);
  const allActivities = useSelector((state) => state.allActivities);

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const uniqueContinents = [...new Set(allCountries.map(country => country.continents))];

  const handleContinentChange = (selectedContinent) => {
    dispatch(setCurrentPage(1));
    if (selectedContinent === "") {
      dispatch(clearFilter());
    } else {
      dispatch(getByContinent(selectedContinent));
    }
  };

  const handleActivityChange = (selectedActivity) => {
    dispatch(setCurrentPage(1));
    if (selectedActivity === "") {
      dispatch(clearFilter());
    } else {
      dispatch(getByActivity(selectedActivity));
    }
  };

  const handleAlphabeticalChange = (e) => {
    dispatch(setCurrentPage(1));
    const orderType = e.target.value;
    if (orderType === "All") {
      dispatch(countriesOrder(orderType));
    } else {
      dispatch(countriesOrder(orderType));
    }
  };

  const handlePopulationChange = (e) => {
    dispatch(setCurrentPage(1));
    const orderType = e.target.value;
    if (orderType === "All") {
      dispatch(populationOrder(orderType));
    } else {
      dispatch(populationOrder(orderType));
    }
  };

  return (
    <div className='filter'>
      <select name="continent" id="continent" onChange={(e) => handleContinentChange(e.target.value)} value={selectedContinent}>
        <option>Filter by Continents</option>
        <option value="">All Countries</option>
        {uniqueContinents.map((continent, index) => (
          <option key={index} value={continent}>
            {continent}
          </option>
        ))}
      </select>
      <select name="activities" id="activities" onChange={(e) => handleActivityChange(e.target.value)} value={selectedActivity}>
        <option>Filter by activity</option>
        <option value="">All Countries</option>
        {allActivities.map((activity, index) => (
          <option key={index} value={activity.name}>
            {activity.name}
          </option>
        ))}
      </select>
      <select name='alphabetical order' onChange={handleAlphabeticalChange} value={alphabeticalOrder}>
        <option key="All" value="All">Alphabetical order</option>
        <option key="Asc" value="Asc">A - Z</option>
        <option key="Des" value="Des">Z - A</option>
      </select>
      <select onChange={handlePopulationChange} value={populationOrder}>
        <option key="All" value="All">Order by population</option>
        <option key="Asc" value="Asc">Ascending order</option>
        <option key="Des" value="Des">Descending order</option>
      </select>
    </div>
  );
}

export default FilterAndOrder;

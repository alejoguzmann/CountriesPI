import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getByContinent,
  getAllActivities,
  countriesOrder,
  getByActivity,
  clearFilter,
  setCurrentPage,
} from '../../redux/actions';

function FilterAndOrder({ selectedContinent, selectedActivity, alphabeticalOrder }) {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const allActivities = useSelector((state) => state.allActivities);

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const uniqueContinents = [...new Set(allCountries.map((country) => country.continents))];

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
    if (e.target.value === "") {
      if (selectedContinent) {
        getByContinent(selectedContinent)
      }
    }
    dispatch(countriesOrder(e.target.value));
  };

  return (
    <div className='filter'>
      <select
        name="continent"
        id="continent"
        onChange={(e) => handleContinentChange(e.target.value)}
        value={selectedContinent}
      >
        <option value="">Filter by Continents</option>
        {uniqueContinents.map((continent, index) => (
          <option key={index} value={continent}>
            {continent}
          </option>
        ))}
      </select>

      <select
        name="activities"
        id="activities"
        onChange={(e) => handleActivityChange(e.target.value)}
        value={selectedActivity}
      >
        <option value="">Filter by Activity</option>
        {allActivities.map((activity, index) => (
          <option key={index} value={activity.name}>
            {activity.name}
          </option>
        ))}
      </select>

      <select
        name='alphabetical order'
        onChange={handleAlphabeticalChange}
        value={alphabeticalOrder}
      >
        <option value="">Alphabetical order</option>
        <option key="Asc" value="Asc">
          A - Z
        </option>
        <option key="Des" value="Des">
          Z - A
        </option>
      </select>
    </div>
  );
}

export default FilterAndOrder;

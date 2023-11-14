import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllCountries } from '../../redux/actions';
import NavBar from '../../components/navBar/navBar';
import Cards from '../../components/cards/cards';
import FilterAndOrder from '../../components/filterAndOrder/FilterAndOrder';

import './home.css';

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const filteredCountries = useSelector((state) => state.filteredCountries);
  const selectedContinent = useSelector((state) => state.selectedContinent);
  const selectedActivity = useSelector((state) => state.selectedActivity);
  const alphabeticalOrder = useSelector((state) => state.alphabeticalOrder);
  const populationOrder = useSelector((state) => state.populationOrder);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='sup'>
        <Link to={'/home'}>
          <h1 className='home-title'>Countries</h1>
        </Link>
        <div className='nav'>
          <NavBar className='create' />
        </div>
      </div>
      <FilterAndOrder
        allCountries={allCountries}
        dispatch={dispatch}
        selectedContinent={selectedContinent}
        selectedActivity={selectedActivity}
        alphabeticalOrder={alphabeticalOrder}
        populationOrder={populationOrder}
      />
      <div>
        <Cards tCountries={filteredCountries.length ? filteredCountries : allCountries} />
      </div>
    </div>
  );
}

export default Home;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearFilter, getAllCountries } from '../../redux/actions';

import NavBar from '../../components/navBar/navBar';
import Cards from '../../components/cards/cards';
import FilterAndOrder from '../../components/filterAndOrder/FilterAndOrder';

import './home.css';

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const filteredCountries = useSelector((state) => state.filteredCountries)
  const selectedContinent = useSelector((state) => state.selectedContinent);
  const selectedActivity = useSelector((state) => state.selectedActivity);
  const alphabeticalOrder = useSelector((state) => state.alphabeticalOrder);

  useEffect(() => {
    dispatch(clearFilter())
    dispatch(getAllCountries());
  }, [dispatch]);


  return (
    <div className='home'>
      <div className='sup'>
        <h1 className='home-title'>Countries</h1>
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
      />
      <div>
        <Cards tCountries={filteredCountries} />
      </div>
    </div>
  );
}

export default Home;

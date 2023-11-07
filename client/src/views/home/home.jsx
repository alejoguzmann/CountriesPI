import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllCountries} from '../../redux/actions';
import NavBar from '../../components/navBar/navBar';
import Cards from '../../components/cards/cards';
import FilterAndOrder from '../../components/filterAndOrder/FilterAndOrder';

import './home.css';

function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.allCountries);
  const filteredCountries = useSelector((state) => state.filteredCountries);

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
      />
      <div>
        <Cards tCountries={filteredCountries.length ? filteredCountries : allCountries} />
      </div>
    </div>
  );
}

export default Home;

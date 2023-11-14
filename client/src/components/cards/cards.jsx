import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/card';
import Pagination from '../pagination/pagination';
import { setCurrentPage } from '../../redux/actions'; 
import './cards.css';

function Cards({tCountries}) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);

  const countriesForPage = 10;
  const ultIndex = currentPage * countriesForPage;
  const primerIndex = ultIndex - countriesForPage;

  const currentCountries = tCountries.slice(primerIndex, ultIndex);

  useEffect(() => {
  }, [currentPage]);

  const clickPag = (numeroPag) => {
    dispatch(setCurrentPage(numeroPag));
  };

  return (
    <div>
      <div className='card-list'>
        {currentCountries.map((country) => (
          <div key={country.ID}>
            <Link to={`/detail/${country.ID}`}>
              <Card country={country} />
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Pagination
          countriesForPage={countriesForPage}
          allCountries={tCountries.length}
          clickPag={clickPag}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default Cards;

import Card from '../../components/card/card'
import { Link } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import { useState } from 'react';
import './cards.css'

function Cards({tCountries}) {

  const [currentPage, setCurrentPage] = useState(1)


  const countriesForPage = 10
  const ultIndex = currentPage * countriesForPage
  const primerIndex = ultIndex - countriesForPage

  const currentCountries = tCountries.slice(
    primerIndex,
    ultIndex
  )

  const clickPag = (numeroPag) => {
    setCurrentPage(numeroPag)
  }

  return (

    <div>
      <div className='card-list'>
        {currentCountries.map((country) => (
          <div key={country.ID} >
            <Link to={`/detail/${country.ID}`}>
              <Card country={country} />
            </Link>
          </div>
        ))}
      </div>
      <p className='cp'>Page: {currentPage}</p>
      <div>
        <Pagination countriesForPage={countriesForPage} allCountries={tCountries.length} clickPag={clickPag} currentPage={currentPage} />
      </div>
    </div>
  )
}

export default Cards

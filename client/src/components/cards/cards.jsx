import Card from '../../components/card/card'
import { Link } from 'react-router-dom';

import './cards.css'

function Cards({allCountries, currentPage, itemsPerPage}) {

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCountries.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className='card-list'>
        {currentItems.map((country) => (
          <div key={country.ID} >
            <Link to={`/detail/${country.ID}`}>
            <Card  country={country}/>
            </Link>
          </div>
        ))}
      </div>
    )
  }
  
  export default Cards
  
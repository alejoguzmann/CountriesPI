import Card from '../../components/card/card'
import './cards.css'

function Cards({allCountries, currentPage, itemsPerPage}) {

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allCountries.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className='card-list'>
        {currentItems.map((country) => (
          <Card key={country.ID} country={country}/>
        ))}
      </div>
    )
  }
  
  export default Cards
  
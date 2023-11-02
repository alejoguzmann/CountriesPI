import { useEffect, useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import {Link, useLocation} from 'react-router-dom'

import { getAllCountries, getByName } from '../../redux/actions'

import NavBar from '../../components/navBar/navBar'
import Cards from '../../components/cards/cards'

import './home.css'

function Home() {

  const dispatch = useDispatch()
  const allCountries = useSelector((state) => state.allCountries)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10
  const [searchString, setSearchString] = useState('')

  const handleChange = (e) => {
    e.preventDefault();
      setSearchString(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getByName(searchString))
  }

  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])

  return (
    <div className='home'>
      <h1 className='home-title'>Countries</h1>

      <Link to={'/create'} ><button>Create activity</button></Link>
      
      <NavBar handleChange={handleChange} handleSubmit={handleSubmit} />
      
      <Link to={'/detail'}>
        <Cards allCountries={allCountries} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      </Link>
      
      <div className='buttons'>
        <br />
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previus page
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= allCountries.length}
        >
          Next page
        </button>
      </div>
    </div>
  );
}
  
  export default Home
  
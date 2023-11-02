import { useEffect, useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import {Link, useLocation} from 'react-router-dom'


import { getAllCountries } from '../../redux/actions'

import NavBar from '../../components/navBar/navBar'
import Cards from '../../components/cards/cards'

import './home.css'

function Home() {

  const dispatch = useDispatch()
  const allCountries = useSelector((state) => state.allCountries)

  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10

  return (
    <div className='home'>
      <h1 className='home-title'>Countries</h1>

      <NavBar />
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
  
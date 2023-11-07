import './navBar.css'

import {getByName} from '../../redux/actions'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

function NavBar() {
  const dispatch = useDispatch()
  const [searchString, setSearchString] = useState('')

  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getByName(searchString))
  }

    return (
      <div className="searchbar">
        <form onChange={handleChange}>
          <input className='input' type="text" placeholder="Country name..." />
          <button className='button' type='submit' onClick={handleSubmit} >Buscar</button>
          <Link to={'/create'} ><button>Create activity</button></Link>
        </form>
      </div>
    )
  }
  
  export default NavBar
  
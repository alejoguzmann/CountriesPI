import './navBar.css'

import { Link } from 'react-router-dom'

function NavBar({handleChange, handleSubmit}) {

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
  
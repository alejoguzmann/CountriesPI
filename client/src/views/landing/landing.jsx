import {Link} from 'react-router-dom'
import './landing.css'

function Landing() {

    return (
      <div id='BG'>
      <div className='landing' >
        <Link to={'/home'}>
          <button id='button'>Home</button>
        </Link>
      </div>
      </div>
    )
  }


  export default Landing
  
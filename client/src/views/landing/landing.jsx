import {Link, useLocation} from 'react-router-dom'

function Landing() {

    return (
      <div>
        <h1>Countries</h1>
        <Link to={'/home'}>
          <button>Home</button>
        </Link>
      </div>
    )
  }


  export default Landing
  
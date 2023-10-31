import NavBar from '../../components/navBar/navBar'
import Cards from '../../components/cards/cards'
import './home.css'

function Home() {

    return (
      <div className='home'>
        <h1 className='home-title'>Countries</h1>
        <NavBar></NavBar>
        <Cards></Cards>
      </div>
    )
  }
  
  export default Home
  
import './navBar.css'

function NavBar({handleChange, handleSubmit}) {

    return (
      <div className="searchbar">
        <form onChange={handleChange}>
          <input type="text" placeholder="Country name..." />
          <button type='submit' onClick={handleSubmit} >Buscar</button>
        </form>
      </div>
    )
  }
  
  export default NavBar
  
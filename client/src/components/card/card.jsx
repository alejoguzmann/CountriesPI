import './card.css'

function Card({country}) {

  const { flags, name, continents, population, ID} = country

    return (
      <div className='card-container' key={ID} >
        <img src={flags} alt={name} width={230} height={150}/>
        <p className='name'>{name}</p>
        <p>{continents}</p>
        {/* <p>{population}</p> */}
      </div>
    )
  }
  
  export default Card
  
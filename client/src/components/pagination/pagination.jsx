import './pagination.css'

const Pagination = ({ countriesForPage , allCountries , clickPag , currentPage }) => {

    const totalPages = Math.ceil(allCountries / countriesForPage)
    const pageNumbers = []

    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i + 1)
    }

    return (
            <div className='paginationContainer'>
              <button
                className='paginationButton'
                onClick={() => {
                  if (currentPage > 1) clickPag(currentPage - 1);
                }}
                disabled={currentPage === 1}
              >
                Prev
              </button>
                
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => clickPag(pageNumber)}
                  className={`numbers ${pageNumber === currentPage ? 'activePage' : ''}`}
                  disabled={pageNumber === currentPage}
                  >
                  {pageNumber}
                </button>
              ))}
                
              <button
                onClick={() => {
                  if (currentPage < totalPages) clickPag(currentPage + 1);
                }}
                className='paginationButton'
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
    )
}

export default Pagination

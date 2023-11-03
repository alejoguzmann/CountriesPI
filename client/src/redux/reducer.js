import { GET_ALL_COUNTRIES, GET_BY_CONTINENT, GET_BY_NAME } from "./types";

const initialState = {
      allCountries: [],
      filteredCountries: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
          };
        case GET_BY_NAME:
            return{
                ...state,
                filteredCountries: action.payload
            }
        case GET_BY_CONTINENT:
            return{
                ...state,
                filteredCountries: action.payload                
        }
        default:
            return state
    }
}

export default reducer
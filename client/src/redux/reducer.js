import { GET_ALL_COUNTRIES, GET_BY_NAME } from "./types";

const initialState = {
      allCountries: []
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
                allCountries: action.payload,
            }
        default:
            return state
    }
}

export default reducer
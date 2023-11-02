import { GET_ALL_COUNTRIES } from "./types";

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
        default:
            return state
    }
}

export default reducer
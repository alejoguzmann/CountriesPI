import { 
    GET_ALL_COUNTRIES, 
    GET_BY_CONTINENT, 
    GET_BY_NAME, 
    GET_ALL_ACTIVITIES, 
    COUTRIES_ORDER, 
    POPULATION_ORDER,
    GET_BY_ID,
    GET_BY_ACTIVITY,
    CLEAR_DETAIL,
    CLEAR_FILTER,
    ACTIVITY_BY_CONTRIES
} from "./types";

const initialState = {
      allCountries: [],
      filteredCountries: [],
      allActivities: [],
      countryDetails: null,
      activityCountryDetails: []
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
        case GET_BY_ID:
            return{
                ...state,
                countryDetails: action.payload                
        }
        case ACTIVITY_BY_CONTRIES:
            return{
                ...state,
                activityCountryDetails: action.payload
            }
        case CLEAR_DETAIL: 
            return{
                ...state,
                countryDetails: null,
                activityCountryDetails: []
            }  
        case CLEAR_FILTER:
            return{
                ...state,
                filteredCountries: []
            }
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
          };
        case GET_BY_ACTIVITY: 
          return{
            ...state,
            filteredCountries: action.payload
          }
        case COUTRIES_ORDER:
            let order = action.payload === "Asc"
                ? state.allCountries.sort(function (a, b) {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                })
                : state.allCountries.sort(function (a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })
            return {
                ...state,
                allCountries: order.concat([])
        }
        case POPULATION_ORDER:
            let population = action.payload === "Asc"
                ? state.allCountries.sort(function (a, b) {
                    if (a.population > b.population) return 1;
                    if (b.population > a.population) return -1;
                    return 0;
                })
                : state.allCountries.sort(function (a, b) {
                    if (a.population > b.population) return -1;
                    if (b.population > a.population) return 1;
                    return 0;
                })
            return {
                ...state,
                allCountries: population.concat([])
        }
        default:
            return state
    }
}

export default reducer
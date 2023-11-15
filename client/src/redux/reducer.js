import {
    GET_ALL_COUNTRIES,
    GET_BY_CONTINENT,
    GET_BY_NAME,
    GET_ALL_ACTIVITIES,
    COUTRIES_ORDER,
    GET_BY_ID,
    GET_BY_ACTIVITY,
    CLEAR_DETAIL,
    CLEAR_FILTER,
    ACTIVITY_BY_CONTRIES,
    SET_CURRENT_PAGE
} from "./types";

const initialState = {
    allCountries: [],
    filteredCountries: [],
    allActivities: [],
    countryDetails: null,
    activityCountryDetails: [],
    currentPage: 1,
    selectedContinent: "",
    selectedActivity: "",
    alphabeticalOrder: "",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                filteredCountries: action.payload
            };
        case GET_BY_NAME:
            return {
                ...state,
                filteredCountries: action.payload
            }
        case GET_BY_CONTINENT:
            return {
                ...state,
                filteredCountries: action.payload,
                selectedContinent: action.payload ? action.payload[0].continents : ""
            }
        case GET_BY_ID:
            return {
                ...state,
                countryDetails: action.payload
            }
        case ACTIVITY_BY_CONTRIES:
            return {
                ...state,
                activityCountryDetails: action.payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                countryDetails: null,
                activityCountryDetails: []
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filteredCountries: state.allCountries,
                selectedActivity: "",
                selectedContinent: "",
                alphabeticalOrder: ""
            }
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload,
            };
        case GET_BY_ACTIVITY:
            return {
                ...state,
                filteredCountries: action.payload,
                selectedActivity: action.payload ? action.payload[0].activity : ""
            }
        case COUTRIES_ORDER:
            const orderType = action.payload;
            let sortedCountries;
            if (orderType === "") {
                sortedCountries = state.allCountries
            } else if (orderType === "Asc") {
                sortedCountries = [...state.filteredCountries].sort((a, b) => a.name.localeCompare(b.name));
            } else {
                sortedCountries = [...state.filteredCountries].sort((a, b) => b.name.localeCompare(a.name));
            }
            return {
                ...state,
                filteredCountries: sortedCountries,
                alphabeticalOrder: orderType,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            return state
    }
}

export default reducer
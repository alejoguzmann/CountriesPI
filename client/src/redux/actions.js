import axios from 'axios'

import {GET_ALL_COUNTRIES} from './types'

const endpointCountries = "http://localhost:3001/countries";
const endpointActivities = "http://localhost:3001/activities";

export function getAllCountries() {
    return async function (dispatch) {
        const response = await axios (endpointCountries)
        return  dispatch({ 
            type: GET_ALL_COUNTRIES, 
            payload: response.data 
        });
      }
    };

   
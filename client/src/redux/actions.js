import axios from 'axios'

import {GET_ALL_COUNTRIES, GET_BY_NAME, GET_BY_ID} from './types'

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

export function getByName(name) {
  return async function (dispatch) {
    const response = await axios (`${endpointCountries}/name?name=${name}`)
    return  dispatch({ 
        type: GET_BY_NAME, 
        payload: response.data 
    });
  }
}

export function getById(name) {
  return async function (dispatch) {
    const response = await axios (`${endpointCountries}/name?name=${name}`)
    return  dispatch({ 
        type: GET_BY_ID, 
        payload: response.data 
    });
  }
}
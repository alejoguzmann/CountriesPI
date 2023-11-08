import axios from 'axios'

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

export function getByContinent(continents) {
  return async function (dispatch) {
    const response = await axios (`http://localhost:3001/continents?continents=${continents}`)
    return  dispatch({ 
        type: GET_BY_CONTINENT, 
        payload: response.data 
    });
  }
}

export function getAllActivities() {
  return async function (dispatch) {
    const response = await axios (endpointActivities)
    return  dispatch({ 
        type: GET_ALL_ACTIVITIES, 
        payload: response.data 
    });
  }
}

export function getById (ID) {
  return async function (dispatch) {
    const response = await axios (`${endpointCountries}/${ID}`)
    // console.log(response.data);
    return dispatch ({
      type: GET_BY_ID,
      payload: response.data
    });
  }
} 

export function activityByCountry(ID) {
  return async function (dispatch) {
    const response = await axios (`http://localhost:3001/activity/${ID}`)
    // console.log(response.data);
    return dispatch ({
      type: ACTIVITY_BY_CONTRIES,
      payload: response.data
    });
  }}

export function clearDetail () {
  return{
    type: CLEAR_DETAIL
  }
}

export function clearFilter() {
  return{
    type: CLEAR_FILTER
  }
}

export function countriesOrder(order) {
  return{
    type:COUTRIES_ORDER,
    payload: order
  }
}

export function populationOrder(population) {
  return{
    type:POPULATION_ORDER,
    payload: population
  }
}

export function getByActivity(activity) {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/activity?nameActivity=${activity}`);
    return dispatch({
      type: GET_BY_ACTIVITY,
      payload: response.data,
    });
  };
}

import axios from 'axios';

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';
export const LOADING = 'LOADING';
export const GET_COUNTRY_SUMMARY = 'GET_COUNTRY_SUMMARY';
export const FILTER_BY_CONTINENTS = 'FILTER_BY_CONTINENTS';
export const FILTER_ACTIVITY = 'FILTER_ACTIVITY';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const SET_ACTUAL_PAGE = 'SET_ACTUAL_PAGE'
export const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY'

export const loading = () =>{
    return {type:LOADING}
}



export const getAllCountries = () => {
    return async function(dispatch) {
        dispatch(loading());
    const allCountries = await axios.get('/countries')
    return dispatch({type:GET_ALL_COUNTRIES,payload:allCountries.data})
}
}

export const getAllActivities = () => {
  return async function(dispatch) {
  const allActivities = await axios.get('/activities')
  return dispatch({type:GET_ALL_ACTIVITIES,payload:allActivities.data})
}
}

export const getCountryDetail = (id) =>{
    return async function(dispatch){
      dispatch(loading());
        const countryDetail = await axios.get(`/countries/${id}`)
    
                return dispatch({type:GET_COUNTRY_DETAIL, payload: countryDetail.data});
    };
};

// export const createActivity = (values)=>{ 
//     return {type:CREATE_ACTIVITY,payload:{...values}}
// }

export const createActivity = (payload) => {
  return async (dispatch)=> {
    try{
    await axios.post('/activities',payload)
    return dispatch({type: CREATE_ACTIVITY,payload:payload})
    }catch (error){
      console.log(error)
    }
  }
}

export function getCountryName(name) {
    return async function (dispatch) {
        try {
            const response = await axios.get(
                `/countries?name=${name}`
            );
           dispatch({ type: GET_COUNTRY_NAME, payload: response.data });
        } catch (error) {
          dispatch({ type: GET_COUNTRY_NAME, payload: [] });;
        }
    };
}


//Filtros

export function filterCountriesByContinents(payload) {
    return {
      type: FILTER_BY_CONTINENTS,
      payload,
    };
  }
  
  export function FilterActivity(payload) {
    return {
      type: FILTER_ACTIVITY,
      payload,
    };
  }

  export function orderByName(payload) {
    return {
      type: ORDER_BY_NAME,
      payload,
    };
  }
  
  export function orderByPopulation(payload) {
    return {
      type: ORDER_BY_POPULATION,
      payload,
    };
  }

  export const deleteActivity = (payload) => {
    return async (dispatch)=> {
      try{
      await axios.delete(`/activities/${payload}`)
      return dispatch({type: DELETE_ACTIVITY})
      }catch (error){
        console.log(error)
      }
    }
  }

  export function setActualPage(payload) {
    return {
      type: SET_ACTUAL_PAGE,
      payload,
    };
  }

  export const updateActivity = (payload,id) => {
    return async (dispatch)=> {
      try{
      await axios.put(`/activities/${id}`,payload)
      return dispatch({type: UPDATE_ACTIVITY},payload)
      }catch (error){
        console.log(error)
      }
    }
  }
  




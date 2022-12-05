import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DETAIL,
  CREATE_ACTIVITY,
  GET_COUNTRY_NAME,
  LOADING,
  FILTER_BY_CONTINENTS,
  FILTER_ACTIVITY,
  ORDER_BY_POPULATION,
  ORDER_BY_NAME,
  GET_ALL_ACTIVITIES,
  DELETE_ACTIVITY,
  SET_ACTUAL_PAGE,
  UPDATE_ACTIVITY,
} from "../actions/index.js";

const initialState = {
  allCountries:[],
  countries: [],
  activities: [],
  countryDetail: [],
  loading: false,
  actualPage:1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        loading: false,
        countries: action.payload,
        allCountries: action.payload,
      };
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        loading: false,
        countryDetail: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        createActivity: [...state.activities, action.payload],
      };
    case GET_COUNTRY_NAME:
      return {
        ...state,
        countries: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
      }
    case SET_ACTUAL_PAGE:
        return {
          ...state,
          actualPage:action.payload,
    }
    case UPDATE_ACTIVITY:

          return {
            ...state,
            activities:state.activities.map(item => 
              item.id === action.payload.id
                ? action.payload
                : item)
    }


    //Filtros-----------------------------------------------------------------------------------------------------------


    case FILTER_BY_CONTINENTS:
      const continentsFiltered =
        action.payload === "AllContinents"
          ? state.allCountries
          : state.allCountries.filter((el) => action.payload === el.continent);
      return {
        ...state,
        countries: continentsFiltered,
      };

    case ORDER_BY_NAME:
      let sortArr =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortArr,
      };

    case ORDER_BY_POPULATION:
      let sortArr2 =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortArr2,
      };

    case FILTER_ACTIVITY:
      let filter =
        action.payload === "no filter"
          ? state.allCountries
          : state.allCountries.filter((country) => {
              const activities = country.activities.map(
                (activity) => activity.name
              );
              return activities.includes(action.payload);
            });
      return {
        ...state,
        countries: filter,
      };
      
    default:
      return {
        ...state,
      };
  }
};

export default reducer;

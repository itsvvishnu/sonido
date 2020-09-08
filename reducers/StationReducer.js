import {
  FETCH_STATIONS_REQUEST,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_FAIL,
  CHANGE_STATION,
  PLAY_STATION,
  SEARCH_STATION_REQUEST,
  SEARCH_STATION_SUCCESS,
  SEARCH_STATION_FAIL,
  TOGGLE_SELECTION_BAR,
} from "../actions/types";

const initialState = {
  isLoading: true,
  stations: [],
  play: false,
  favourites: [],
  errorMessage: "",
  showSelBar: true,
  searchIsLoading: false,
};

const stationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATIONS_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_STATIONS_FAIL:
      return { ...state, isLoading: false, errorMessage: action.payload };
    case FETCH_STATIONS_SUCCESS:
      return { ...state, isLoading: false, stations: action.payload };
    case SEARCH_STATION_REQUEST:
      return { ...state, searchIsLoading: true };
    case SEARCH_STATION_FAIL:
      return { ...state, searchErr: action.payload, searchIsLoading: false };
    case SEARCH_STATION_SUCCESS:
      return { ...state, stations: action.payload, searchIsLoading: false };
    case TOGGLE_SELECTION_BAR:
      return { ...state, showSelBar: !state.showSelBar };
    default:
      return state;
  }
};

export default stationReducer;

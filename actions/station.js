import {
  CHANGE_STATION,
  PLAY_STATION,
  FETCH_STATIONS_REQUEST,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_FAIL,
  SEARCH_STATION_REQUEST,
  SEARCH_STATION_SUCCESS,
  SEARCH_STATION_FAIL,
  TOGGLE_SELECTION_BAR,
} from "./types";
import AsyncStorage from "@react-native-community/async-storage";

export const fetchStationRequest = () => ({ type: FETCH_STATIONS_REQUEST });

export const fetchStationFail = (err) => ({
  type: FETCH_STATIONS_FAIL,
  payload: err,
});

export const fetchStationSuccess = (json) => ({
  type: FETCH_STATIONS_SUCCESS,
  payload: json,
});

export const fetchStations = (cat = "topclick") => {
  return async (dispatch) => {
    dispatch(fetchStationRequest());
    let count;
    try {
      count = await AsyncStorage.getItem("fetchcount");
      if (count == null) {
        count = "10";
      }
      console.log(count);
    } catch (err) {}
    try {
      let response = await fetch(
        `https://fr1.api.radio-browser.info/json/stations/${cat}/${count}`
      );
      let json = await response.json();
      dispatch(fetchStationSuccess(json));
    } catch (err) {
      dispatch(fetchStationFail(err));
    }
  };
};

export const searchStationRequest = () => ({ type: SEARCH_STATION_REQUEST });

export const searchStationFail = (err) => ({
  type: SEARCH_STATION_FAIL,
  payload: err,
});

export const searchStationSuccess = (json) => ({
  type: SEARCH_STATION_SUCCESS,
  payload: json,
});

export const searchStation = (query) => {
  return async (dispatch) => {
    dispatch(searchStationRequest());
    try {
      let response = await fetch(
        `https://fr1.api.radio-browser.info/json/stations/search?name=${query}`
      );
      let json = await response.json();
      dispatch(searchStationSuccess(json));
    } catch (err) {
      dispatch(searchStationFail(err));
    }
  };
};

export const toggleSelectionBar = () => {
  return async (dispatch) => {
    dispatch({
      type: TOGGLE_SELECTION_BAR,
    });
  };
};

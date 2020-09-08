import { NIGHT_MODE, FETCH_COUNT_CHANGE, FETCH_SETTINGS } from "./types";
import AsyncStorage from "@react-native-community/async-storage";

export const useNightMode = () => ({
  type: NIGHT_MODE,
});

export const nightMode = (status) => {
  return async (dispatch) => {
    dispatch(useNightMode());
    try {
      await AsyncStorage.setItem("darkmode", JSON.stringify(status));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCountChangeInit = (count) => ({
  type: FETCH_COUNT_CHANGE,
  payload: count,
});

export const fetchCountChange = (count) => {
  return async (dispatch) => {
    dispatch(fetchCountChangeInit(count));
    try {
      await AsyncStorage.setItem("fetchcount", count);
    } catch (err) {}
  };
};

export const fetchSettingsInit = (count, mode) => ({
  type: FETCH_SETTINGS,
  count,
  mode,
});

export const fetchSettings = () => {
  return async (dispatch) => {
    let mode;
    let count;
    try {
      let temp = await AsyncStorage.getItem("darkmode");
      console.log(temp);
      temp = JSON.parse(temp);
      console.log(temp);
      let tempCount = await AsyncStorage.getItem("fetchcount");
      if (tempCount != null) {
        count = parseInt(tempCount);
      }
      mode = temp;
    } catch (err) {
      // console.log(err);
    }
    console.log(mode);
    console.log(count);
    dispatch(fetchCountChangeInit(count, mode));
  };
};

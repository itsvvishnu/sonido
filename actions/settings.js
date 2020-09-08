import { NIGHT_MODE, FETCH_COUNT_CHANGE, FETCH_SETTINGS } from "./types";
import AsyncStorage from "@react-native-community/async-storage";

export const useNightMode = () => ({
  type: NIGHT_MODE,
});

export const nightMode = (status) => {
  return async (dispatch) => {
    dispatch(useNightMode());
    // console.log(" from night mode toggler");
    // console.log(JSON.stringify(status));
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
  payload: {
    count,
    mode,
  },
});

export const fetchSettings = () => {
  return async (dispatch) => {
    let mode;
    let count;
    try {
      let temp = await AsyncStorage.getItem("darkmode");
      temp = JSON.parse(temp);
      console.log("temp value = " + temp);
      let tempCount = await AsyncStorage.getItem("fetchcount");
      if (tempCount != null) {
        count = parseInt(tempCount);
      }
      mode = temp;
    } catch (err) {
      console.log(err);
    }
    dispatch(fetchSettingsInit(count, mode));
  };
};

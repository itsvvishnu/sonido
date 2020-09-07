import { NIGHT_MODE, FETCH_COUNT_CHANGE } from "./types";
import AsyncStorage from "@react-native-community/async-storage";

export const useNightMode = () => ({
  type: NIGHT_MODE,
});

export const nightMode = (status) => {
  // console.log("status = ");
  // console.log(status);
  return async (dispatch) => {
    dispatch(useNightMode());
    try {
      await AsyncStorage.setItem("darkmode", JSON.stringify(status));
    } catch (err) {
      console.log(err);
    }
  };
};

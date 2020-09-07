import { NIGHT_MODE, FETCH_COUNT_CHANGE } from "../actions/types";
import AsyncStorage from "@react-native-community/async-storage";

var status = false;
let nightModeStatus = async () => {
  try {
    let temp = await AsyncStorage.getItem("darkmode");
    temp = JSON.parse(temp);
    status = temp;
  } catch (err) {
    // console.log(err);
  }
};
nightModeStatus();
console.log("store theme mode = " + status);

const initialState = {
  nightMode: status,
  fetchCount: 10,
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NIGHT_MODE:
      return { ...state, nightMode: !state.nightMode };
    case FETCH_COUNT_CHANGE:
      return { ...state, fetchCount: action.payload };
    default:
      return { ...state };
  }
};

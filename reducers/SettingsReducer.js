import {
  NIGHT_MODE,
  FETCH_COUNT_CHANGE,
  FETCH_SETTINGS,
} from "../actions/types";

const initialState = {
  nightMode: false,
  count: 10,
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NIGHT_MODE:
      return { ...state, nightMode: !state.nightMode };
    case FETCH_COUNT_CHANGE:
      return { ...state, count: action.payload };
    case FETCH_SETTINGS:
      return { ...state, count: action.count, nightMode: action.mode };
    default:
      return { ...state };
  }
};

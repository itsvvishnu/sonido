import { PLAY_STATION,BACK_TO_HOME, CHANGE_STATION } from "../actions/types";

const initialState = {
  stream: {},
  play:false,
  change:false
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_STATION:
      return {...state,play:true,stream:action.payload};
     case BACK_TO_HOME:
        return {...state,play:false}
     case CHANGE_STATION:
      return {...state,play:true,change:true,stream:action.payload}  
    default:
      return state;
  }
};

export default playerReducer;

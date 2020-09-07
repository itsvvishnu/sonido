import {
    CHANGE_STATION,
    PLAY_STATION,
    BACK_TO_HOME
  } from "./types";

  export const playStation = (station) => ({
      type:PLAY_STATION,
      payload:station
  })

  export const changeStation = (station) =>({
    type:CHANGE_STATION,
    payload:station
  })

  export const backToHome = () =>(
    {
        type:BACK_TO_HOME,
    }
  )
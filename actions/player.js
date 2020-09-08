import { CHANGE_STATION, PLAY_STATION, BACK_TO_HOME } from "./types";

export const playStation = (station) => {
  return async (dispatch) => {
    refStation = {
      id: station.stationuuid,
      stationuuid: station.stationuuid,
      url: station.url,
      favicon: station.favicon,
      artwork: station.favicon,
      country: station.country,
      name: station.name,
      title: station.name,
      artist: station.country,
    };
    dispatch(playStationInit(refStation));
  };
};

export const playStationInit = (station) => ({
  type: PLAY_STATION,
  payload: station,
});

export const changeStation = (station) => ({
  type: CHANGE_STATION,
  payload: station,
});

export const backToHome = () => ({
  type: BACK_TO_HOME,
});

import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  FETCH_FAVOURITES_FAIL,
  FETCH_FAVOURITES,
  FETCH_STATIONS_FAIL,
} from "./types";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("radiodb");

const ExecuteQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(results);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });

export const fetchFavouritesFail = (err) => ({
  type: FETCH_STATIONS_FAIL,
  payload: err,
});

export const fetchFavouritesSuccess = (data) => ({
  type: FETCH_FAVOURITES,
  payload: data,
});

export const addToFavourites = (item) => ({
  type: ADD_TO_FAVOURITES,
  payload: item,
});

export const removeFromFavourites = (item, curr) => ({
  type: REMOVE_FROM_FAVOURITES,
  payload: item,
  prev: curr,
});
export const fetchFavourites = (isActive, query) => {
  return async (dispatch) => {
    let selectQuery = await ExecuteQuery("SELECT * FROM favourites", []);
    var rows = selectQuery.rows;
    let array = rows._array;
    if (isActive) {
      let data = array.filter(
        (l) =>
          l.name.toLowerCase().match(query) ||
          l.country.toLowerCase().match(query)
      );
      dispatch(fetchFavouritesSuccess(data));
    } else {
      dispatch(fetchFavouritesSuccess(array));
    }
  };
};

export const addToFavouritesThenSave = (item, curr) => {
  return async (dispatch) => {
    let find = curr.some(
      (station) => station["stationuuid"] === item["stationuuid"]
    );
    if (!find) {
      console.log("in new item");
      console.log(item);

      dispatch(addToFavourites(item));
      let singleInsert = await ExecuteQuery(
        "INSERT INTO favourites (stationuuid, url,url_resolved, name , country , favicon ) VALUES ( ?,?, ?, ?, ?, ?)",
        [
          item.stationuuid,
          item.url,
          item.url_resolved,
          item.name,
          item.country,
          item.favicon,
        ]
      );
      console.log(singleInsert);
    } else {
      // console.log("exisiting item");
      // console.log(item);
      dispatch(removeFromFavourites(item, curr));
      await ExecuteQuery("DELETE FROM favourites WHERE stationuuid = ?", [
        item.stationuuid,
      ]);
    }
  };
};

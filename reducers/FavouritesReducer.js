import { ADD_TO_FAVOURITES,REMOVE_FROM_FAVOURITES,FETCH_FAVOURITES, ADD_TO_FAVOURITES_SAVE } from "../actions/types";

const initialState = {
    favourites:[]
}

const favouritesReducer = (state=initialState,action) =>{
    switch(action.type){
        case ADD_TO_FAVOURITES:
            return{...state,favourites:state.favourites.concat(action.payload)}
        case FETCH_FAVOURITES:
            return{...state,favourites:action.payload}
        case REMOVE_FROM_FAVOURITES:
            return{...state,favourites:state.favourites.filter((item)=>(
                item["stationuuid"]!==action.payload["stationuuid"])
            )}       
        default:
            return state
    }
}

export default favouritesReducer;
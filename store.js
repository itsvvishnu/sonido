import {createStore,combineReducers,applyMiddleware} from 'redux';
import stationReducer from './reducers/StationReducer';
import thunk from 'redux-thunk';
import playerReducer from './reducers/PlayerReducer';
import favouritesReducer from './reducers/FavouritesReducer';
import { settingsReducer } from './reducers/SettingsReducer';

const rootReducer = combineReducers({
    stationData:stationReducer,
    playerData:playerReducer,
    favData:favouritesReducer,
    settings:settingsReducer
})

const configureStore = () => createStore(rootReducer,applyMiddleware(thunk));

export default configureStore;
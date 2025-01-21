import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {receptionistReducer} from "./Receptionist/Reducer.js";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    receptionist:receptionistReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));
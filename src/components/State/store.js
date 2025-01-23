import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {receptionistReducer} from "./Receptionist/Reducer.js";
import {thunk} from "redux-thunk";
import {authReducer} from "./Authentication/Reducer.js";

const rootReducer = combineReducers({
    authentication:authReducer,
    receptionist:receptionistReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));
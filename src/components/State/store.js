import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {receptionistReducer} from "./Receptionist/Reducer.js";
import {thunk} from "redux-thunk";
import {authReducer} from "./Authentication/Reducer.js";
import {adminReducer} from "./Admin/Reducer.js";
import {doctorReducer} from "./Doctor/Reducer.js";

const rootReducer = combineReducers({
    authentication:authReducer,
    receptionist:receptionistReducer,
    admin:adminReducer,
    doctor:doctorReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));
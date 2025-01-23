import {LOGIN} from "./ActionType.js";

const initialState = {
    user: null,
    users: [],
    jwt: null
}

export const authReducer = (state = initialState,action) => {
    switch (action.type) {
        case LOGIN:
            return{
                ...state,
                user: action.payload.userId,
                jwt: action.payload.token
            }

        default:
            return state;
    }
}
import {LOGIN, LOGOUT} from "./ActionType.js";

const initialState = {
    user: null,
    users: [],
    jwt: null,
    role: null
}

export const authReducer = (state = initialState,action) => {
    switch (action.type) {
        case LOGIN:
            return{
                ...state,
                user: action.payload.userId,
                jwt: action.payload.token,
                role: action.payload.role
            }

        case LOGOUT:
            return{
                ...state,
                user: null,
                jwt:null,
                role: null
            }

        default:
            return state;
    }
}
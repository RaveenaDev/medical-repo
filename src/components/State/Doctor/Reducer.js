import {GET_ROOMS} from "../Admin/ActionType.js";

const initialState = {
    rooms: [],
}

export const doctorReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_ROOMS:
            return {
                ...state,
                totalRooms: action.payload.rooms.length,
                rooms: action.payload.rooms,
                isLoading: false,
            };

        default:
            return state;
    }
}
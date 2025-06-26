import {GET_ROOMS} from "../Admin/ActionType.js";
import {GET_INPATIENTS, GET_PATIENTS, GET_SURGERIES} from "./ActionType.js";

const initialState = {
    totalPatients: null,
    patients: [],
    totalInpatients: null,
    inPatients: [],
    totalSurgeries: null,
    surgeries: [],
    totalRooms: null,
    rooms: [],
}

export const doctorReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_PATIENTS:
            return {
                ...state,
                totalPatients: action.payload.totalCount,
                patients: action.payload.patients,
                isLoading: false,
            };

        case GET_INPATIENTS:
            return {
                ...state,
                totalInpatients: action.payload.total,
                inPatients: action.payload.data,
                isLoading: false,
            };

        case GET_SURGERIES:
            return {
                ...state,
                totalSurgeries: action.payload.totalCount,
                surgeries: action.payload.patients,
                isLoading: false,
            };
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
import {
    GET_RECEPTIONIST_OVERVIEW_REQUEST,
    GET_RECEPTIONIST_OVERVIEW_SUCCESS,
    GET_RECEPTIONIST_PATIENTS_REQUEST, GET_RECEPTIONIST_PATIENTS_SUCCESS
} from "./ActionType.js";

const inititalState = {
    patient: null,
    patients: null,
    isLoading:true,
    error:null,
    success:null
}

export const receptionistReducer = (state=inititalState,action) => {

    switch (action.type) {
        case GET_RECEPTIONIST_OVERVIEW_REQUEST :
        case GET_RECEPTIONIST_PATIENTS_REQUEST:
            return{
                ...state,
                isLoading: true,
                error: null,
                success: null
            }

        case GET_RECEPTIONIST_OVERVIEW_SUCCESS:
        case GET_RECEPTIONIST_PATIENTS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                patients: action.payload,
                success:"Success"
            }

        default:
            return state;
    }
}
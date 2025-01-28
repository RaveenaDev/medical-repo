import {
    GET_ALL_DEPARTMENTS, GET_DEPARTMENT_BY_ID,
    GET_DOCTORS,
    GET_PATIENTS,
    GET_RECEPTIONIST_OVERVIEW_REQUEST,
    GET_RECEPTIONIST_OVERVIEW_SUCCESS,
    GET_RECEPTIONIST_PATIENTS_REQUEST, GET_RECEPTIONIST_PATIENTS_SUCCESS, GET_ROOMS, GET_STAFFS
} from "./ActionType.js";

const inititalState = {
    totalPatients: null,
    totalDoctors: null,
    totalStaffs: null,
    totalRooms: null,
    patient: null,
    patients: [],
    doctors: [],
    staffs: [],
    rooms: [],
    departments: [],
    department: null,
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
                totalPatients: action.payload.count,
                patients: action.payload.patients,
                success:"Success"
            }

        case GET_PATIENTS:
            return{
                ...state,
                isLoading: false,
                totalPatients: action.payload.count,
                patients: action.payload.patients
            }

        case GET_DOCTORS:
            return{
                ...state,
                totalDoctors: action.payload.count,
                doctors: action.payload.doctors
            }

        case GET_STAFFS:
            return{
                ...state,
                totalStaffs: action.payload.length,
                staffs: action.payload
            }

        case GET_ROOMS:
            return{
                ...state,
                totalRooms: action.payload.rooms.length,
                rooms: action.payload.rooms
            }


        case GET_ALL_DEPARTMENTS:
            return{
                ...state,
                departments: action.payload
            }

        case GET_DEPARTMENT_BY_ID:
            return{
                ...state,
                department: action.payload
            }

        default:
            return state;
    }
}
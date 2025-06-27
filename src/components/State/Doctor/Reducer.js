import {
    GET_APPOINTMENTS, GET_COMPLETED_APPOINTMENTS,
    GET_INPATIENTS,
    GET_MOST_COMMON_DIAGNOSIS, GET_ONGOING_APPOINTMENTS,
    GET_PATIENTS,
    GET_ROOMS, GET_SCHEDULED_APPOINTMENTS,
    GET_SURGERIES, GET_WAITING_APPOINTMENTS
} from "./ActionType.js";

const initialState = {
    totalPatients: null,
    patients: [],
    totalInpatients: null,
    inPatients: [],
    totalSurgeries: null,
    surgeries: [],
    totalRooms: null,
    rooms: [],
    totalDiagnosis: null,
    diagnosis: [],
    totalAppointments: [],
    scheduledAppointments: [],
    scheduledCount: null,
    ongoingCount: null,
    waitingCount: null,
    completedCount: null,
    ongoingAppointments: [],
    waitingAppointments: [],
    completedAppointments: [],
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

        case GET_MOST_COMMON_DIAGNOSIS:
            return {
                ...state,
                totalDiagnosis: action.payload.totalDiagnoses,
                diagnosis: action.payload.data,
                isLoading: false,
            };

        case GET_APPOINTMENTS:
            return {
                ...state,
                totalAppointments: action.payload.appointments,
            };

        case GET_SCHEDULED_APPOINTMENTS:
            return {
                ...state,
                scheduledAppointments: action.payload.appointments,
                scheduledCount: action.payload.totalAppointments,
            };

        case GET_ONGOING_APPOINTMENTS:
            return {
                ...state,
                ongoingAppointments: action.payload.appointments,
                ongoingCount: action.payload.totalAppointments,
            };

        case GET_WAITING_APPOINTMENTS:
            return {
                ...state,
                waitingAppointments: action.payload.appointments,
                waitingCount: action.payload.totalAppointments,
            };

        case GET_COMPLETED_APPOINTMENTS:
            return {
                ...state,
                completedAppointments: action.payload.appointments,
                completedCount: action.payload.totalAppointments,
            };

        default:
            return state;
    }
}
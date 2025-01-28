import {
    GET_ALL_DEPARTMENTS,
    GET_APPOINTMENT_REQUESTS,
    GET_APPOINTMENTS,
    GET_DEPARTMENT_BY_ID,
    GET_DOCTORS,
    GET_PATIENTS, GET_REJECTED_APPOINTMENTS, GET_ROOMS, GET_STAFFS
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
    totalAppointments: [],
    appointmentRequests: [],
    rejectedAppointments: [],
    noOfAppointments: null,
    isLoading:true,
    error:null,
    success:null
}

export const adminReducer = (state = inititalState,action) => {
    switch (action.type) {
        case GET_DOCTORS:
            return{
                ...state,
                totalDoctors: action.payload.count,
                doctors: action.payload.doctors
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

        case GET_APPOINTMENTS:
            return{
                ...state,
                totalAppointments: action.payload.appointments,
            }

        case GET_PATIENTS:
            return{
                ...state,
                patients: action.payload.patients
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

        case GET_APPOINTMENT_REQUESTS:
            return{
                ...state,
                appointmentRequests: action.payload.appointments
            }

        case GET_REJECTED_APPOINTMENTS:
            return{
                ...state,
                rejectedAppointments: action.payload.rejectedAppointments
            }

        default:
            return state;
    }
}
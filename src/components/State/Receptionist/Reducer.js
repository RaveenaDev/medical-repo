import {
  ADD_ROOM,
  BOOK_APPOINTMENT,
  DELETE_ROOM,
  GET_ALL_DEPARTMENTS,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_BILL_BY_ID,
  GET_BILLS, GET_COMPLETED_APPOINTMENTS,
  GET_DEPARTMENT_BY_ID,
  GET_DOCTORS, GET_DOCTORS_BY_DEPARTMENT, GET_ONGOING_APPOINTMENTS,
  GET_PATIENTS,
  GET_RECEPTIONIST_OVERVIEW_SUCCESS,
  GET_RECEPTIONIST_PATIENTS_SUCCESS,
  GET_ROOMS, GET_SCHEDULED_APPOINTMENTS,
  GET_STAFFS, GET_WAITING_APPOINTMENTS,
  UPDATE_ROOM,
} from "./ActionType.js";

const initialState = {
  totalPatients: null,
  totalDoctors: null,
  totalStaffs: null,
  totalRooms: null,
  totalAppointments: [],
  scheduledAppointments: [],
  ongoingAppointments: [],
  waitingAppointments: [],
  completedAppointments: [],
  patient: null,
  patients: [],
  doctors: [],
  doctorsByDepartment: [],
  staffs: [],
  rooms: [],
  departments: [],
  department: null,
  appointments: [],
  appointmentRequests: [],
  allBills: [],
  bill: null,
  isLoading: true,
  error: null,
  success: null,
  bookAppointment: null
};

export const receptionistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECEPTIONIST_OVERVIEW_SUCCESS:
    case GET_RECEPTIONIST_PATIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        totalPatients: action.payload.count,
        patients: action.payload.patients,
        success: "Success",
      };

    case GET_PATIENTS:
      return {
        ...state,
        isLoading: false,
        totalPatients: action.payload.count,
        patients: action.payload.patients,
      };

    case GET_DOCTORS:
      return {
        ...state,
        totalDoctors: action.payload.count,
        doctors: action.payload.doctors,
      };

    case GET_DOCTORS_BY_DEPARTMENT:
      return{
        ...state,
        doctorsByDepartment: action.payload.doctors,
      }

    case GET_STAFFS:
      return {
        ...state,
        totalStaffs: action.payload.length,
        staffs: action.payload,
      };

    case GET_ROOMS:
      return {
        ...state,
        totalRooms: action.payload.rooms.length,
        rooms: action.payload.rooms,
      };

    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload.room],
        totalRooms: state.totalRooms + 1
      };
    case UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        ),
      };

    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== action.payload.resource._id),
        totalRooms: state.totalRooms - 1
      };

    case GET_ALL_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };

    case GET_DEPARTMENT_BY_ID:
      return {
        ...state,
        department: action.payload,
      };

    case GET_APPOINTMENTS:
      return {
        ...state,
        totalAppointments: action.payload.count,
        appointments: action.payload.appointments,
      };

    case GET_SCHEDULED_APPOINTMENTS:
      return {
        ...state,
        scheduledAppointments: action.payload.appointments,
      };

    case GET_ONGOING_APPOINTMENTS:
      return {
        ...state,
        ongoingAppointments: action.payload.appointments,
      };

    case GET_WAITING_APPOINTMENTS:
      return {
        ...state,
        waitingAppointments: action.payload.appointments,
      };

    case GET_COMPLETED_APPOINTMENTS:
      return {
        ...state,
        completedAppointments: action.payload.appointments,
      };

    case BOOK_APPOINTMENT:
      return {
        ...state,
        // totalAppointments: action.payload.updatedPatientAppointments.length,
        // appointments: [...state.appointments, action.payload.appointment],
        bookAppointment: "Appointment Booked Successfully"
      };

    case GET_APPOINTMENT_REQUESTS:
      return {
        ...state,
        appointmentRequests: action.payload.appointments,
      };

    case GET_BILLS:
      return {
        ...state,
        allBills: action.payload.bills,
      };

    case GET_BILL_BY_ID:
      return {
        ...state,
        bill: action.payload,
      };

    default:
      return state;
  }
};

import {
  ADD_DOCTORS, ADD_EXPENSE,
  ADD_ROOM,
  ADD_STAFFS,
  DELETE_ROOM,
  DELETE_STAFFS,
  GET_ALL_DEPARTMENTS,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_DEPARTMENT_BY_ID,
  GET_DOCTORS,
  GET_EXPENSES,
  GET_PATIENTS,
  GET_REJECTED_APPOINTMENTS,
  GET_ROOMS,
  GET_STAFFS, UPDATE_EXPENSE,
  UPDATE_ROOM,
  UPDATE_STAFFS,
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
  expenses: [],
  totalAppointments: [],
  appointmentRequests: [],
  rejectedAppointments: [],
  noOfAppointments: null,
  isLoading: true,
  error: null,
  success: null,
};

export const adminReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_DOCTORS:
      return {
        ...state,
        totalDoctors: action.payload.count,
        doctors: action.payload.doctors,
      };
    case ADD_DOCTORS:
      return {
        ...state,
        doctors: [...state.doctors, action.payload.doctor],
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
        totalAppointments: action.payload.appointments,
      };

    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload.patients,
      };

    case GET_STAFFS:
      return {
        ...state,
        totalStaffs: action.payload.length,
        staffs: action.payload,
      };
    case ADD_STAFFS:
      return {
        ...state,
        staffs: [...state.staffs, action.payload.staff],
      };
    case DELETE_STAFFS:
      return {
        ...state,
        staffs: state.staffs.filter((staff) => staff._id !== action.payload),
      };
    case UPDATE_STAFFS:
      return {
        ...state,
        staffs: state.staffs.map((staff) =>
          staff._id === action.payload._id ? action.payload : staff
        ),
      };

    case GET_ROOMS:
      return {
        ...state,
        totalRooms: action.payload.rooms.length,
        rooms: action.payload.rooms,
      };

    case GET_APPOINTMENT_REQUESTS:
      return {
        ...state,
        appointmentRequests: action.payload.appointments,
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload.room],
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
        rooms: state.rooms.filter((room) => room._id !== action.payload),
      };
    case GET_REJECTED_APPOINTMENTS:
      return {
        ...state,
        rejectedAppointments: action.payload.rejectedAppointments,
      };

    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload.expenses,
      };

    case ADD_EXPENSE:
      return{
        ...state,
        expenses: [...state.expenses,action.payload.expense]
      }

    case UPDATE_EXPENSE:
      return{
        ...state,
        expenses: state.expenses.map((expense) =>
          expense._id === action.payload.resource._id ? action.payload.resource : expense
        )
      }

    default:
      return state;
  }
};

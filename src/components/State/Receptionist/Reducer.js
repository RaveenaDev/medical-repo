import {
  ACCEPT_APPOINTMENT_REQUESTS,
  ADD_ROOM,
  BOOK_APPOINTMENT,
  DELETE_ROOM,
  GET_ALL_DEPARTMENTS,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_BILL_BY_ID,
  GET_BILLS,
  GET_COMPLETED_APPOINTMENTS,
  GET_DEPARTMENT_BY_ID,
  GET_DOCTORS,
  GET_DOCTORS_BY_DEPARTMENT,
  GET_FILTERED_DOCTORS,
  GET_FILTERED_INPATIENTS,
  GET_FILTERED_PATIENTS,
  GET_FILTERED_ROOMS,
  GET_INPATIENTS,
  GET_ONGOING_APPOINTMENTS,
  GET_PATIENT_BILLS,
  GET_PATIENT_DETAILS,
  GET_PATIENT_FILES,
  GET_PATIENTS,
  GET_PROGRESS_TRACKER,
  GET_RECEPTIONIST_OVERVIEW_SUCCESS,
  GET_RECEPTIONIST_PATIENTS_SUCCESS,
  GET_ROOMS,
  GET_SCHEDULED_APPOINTMENTS,
  GET_SERVICES_BY_DEPARTMENT_ID,
  GET_STAFFS,
  GET_WAITING_APPOINTMENTS,
  REJECT_APPOINTMENT_REQUESTS,
  REMOVE_BOOK_APPOINTMENT_DATA,
  UPDATE_ROOM,
  UPLOAD_PATIENT_FILE,
} from "./ActionType.js";

const initialState = {
  totalPatients: null,
  totalFilteredPatients: null,
  totalInpatients: null,
  inPatients: [],
  totalFilteredInpatients: null,
  filteredInPatients: [],
  isLoadingFilteredInPatients: true,
  patientDetails: [],
  totalDoctors: null,
  doctorCount: null,
  totalStaffs: null,
  totalRooms: null,
  totalFilteredRooms: null,
  totalAppointments: [],
  scheduledAppointments: [],
  ongoingAppointments: [],
  waitingAppointments: [],
  completedAppointments: [],
  scheduledCount: null,
  ongoingCount: null,
  waitingCount: null,
  completedCount: null,
  patient: null,
  patients: [],
  filteredPatients: [],
  isLoadingFilteredPatients: true,
  doctors: [],
  isLoadingDoctors: true,
  doctorsByDepartment: [],
  staffs: [],
  isLoadingStaffs: true,
  rooms: [],
  filteredRooms: [],
  isLoadingFilteredRooms: true,
  departments: [],
  department: null,
  progressTracker: [],
  appointments: [],
  appointmentRequests: [],
  allBills: [],
  allBillsCount: null,
  bill: null,
  isLoading: true,
  error: null,
  success: null,
  bookAppointment: null,
  refreshAppointments: false,
  patientBills: [],
  isLoadingPatientBills: true,
  patientFiles: [],
  servicesByDepartment: [],
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
        totalPatients: action.payload.totalPatients,
        patients: action.payload.patients,
      };

    case GET_FILTERED_PATIENTS:
      return {
        ...state,
        isLoadingFilteredPatients: false,
        totalFilteredPatients: action.payload.totalPatients,
        filteredPatients: action.payload.patients,
      };

    case GET_INPATIENTS:
      return {
        ...state,
        totalInpatients: action.payload.totalInpatients,
        inPatients: action.payload.inpatients,
        isLoading: false,
      };

    case GET_FILTERED_INPATIENTS:
      return {
        ...state,
        totalFilteredInpatients: action.payload.totalInpatients,
        filteredInPatients: action.payload.inpatients,
        isLoadingFilteredInPatients: false,
      };

    case GET_PATIENT_DETAILS:
      return {
        ...state,
        patientDetails: action.payload,
        isLoadingPatientDetails: false,
      };

    case GET_DOCTORS:
      return {
        ...state,
        totalDoctors: action.payload.totalDoctors,
        doctors: action.payload.doctors,
        doctorCount: action.payload.totalDoctors,
        isLoadingDoctors: false,
      };

    case GET_FILTERED_DOCTORS:
      return {
        ...state,
        doctorCount: action.payload.totalDoctors,
        doctors: action.payload.doctors,
      };

    case GET_DOCTORS_BY_DEPARTMENT:
      return {
        ...state,
        doctorsByDepartment: action.payload.doctors,
      };

    case GET_STAFFS:
      return {
        ...state,
        totalStaffs: action.payload.totalStaff,
        staffs: action.payload.staff,
        isLoadingStaffs: false,
      };

    case GET_ROOMS:
      return {
        ...state,
        totalRooms: action.payload.totalRooms,
        rooms: action.payload.rooms,
        isLoading: false,
      };

    case GET_FILTERED_ROOMS:
      return {
        ...state,
        totalFilteredRooms: action.payload.totalRooms,
        filteredRooms: action.payload.rooms,
        isLoadingFilteredRooms: false,
      };

    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload.room],
        totalRooms: state.totalRooms + 1,
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
        rooms: state.rooms.filter(
          (room) => room._id !== action.payload.resource._id
        ),
        totalRooms: state.totalRooms - 1,
      };

    case GET_ALL_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
        isLoading: false,
      };

    case GET_DEPARTMENT_BY_ID:
      return {
        ...state,
        department: action.payload,
      };

    case GET_SERVICES_BY_DEPARTMENT_ID:
      return {
        ...state,
        servicesByDepartment: action.payload.services,
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
        scheduledCount: action.payload.totalAppointments,

        isLoading: false,
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

    case BOOK_APPOINTMENT:
      return {
        ...state,
        // totalAppointments: action.payload.updatedPatientAppointments.length,
        // appointments: [...state.appointments, action.payload.appointment],
        bookAppointment: "Appointment Booked Successfully",
        refreshAppointments: !state.refreshAppointments,
        // scheduledAppointments: [...state.scheduledAppointments,action.payload.appointment]
      };

    case REMOVE_BOOK_APPOINTMENT_DATA:
      return {
        ...state,
        bookAppointment: null,
      };

    case GET_APPOINTMENT_REQUESTS:
      return {
        ...state,
        appointmentRequests: action.payload.appointments,
      };

    case ACCEPT_APPOINTMENT_REQUESTS:
      return {
        ...state,
        appointmentRequests: state.appointmentRequests.filter(
          (request) => request._id !== action.payload
        ),
      };

    case REJECT_APPOINTMENT_REQUESTS:
      return {
        ...state,
        appointmentRequests: state.appointmentRequests.filter(
          (request) => request._id !== action.payload
        ),
      };

    case GET_BILLS:
      return {
        ...state,
        allBills: action.payload.bills,
        allBillsCount: action.payload.totalBills,
      };

    case GET_BILL_BY_ID:
      return {
        ...state,
        bill: action.payload,
      };

    case GET_PROGRESS_TRACKER:
      return {
        ...state,
        progressTracker: action.payload,
        isLoading: false,
      };

    case GET_PATIENT_BILLS:
      return {
        ...state,
        patientBills: action.payload,
        isLoadingPatientBills: false,
      };

    case UPLOAD_PATIENT_FILE:
      return {
        ...state,
        patientFiles: [...state.patientFiles, action.payload],
      };

    case GET_PATIENT_FILES:
      return {
        ...state,
        patientFiles: action.payload,
      };

    default:
      return state;
  }
};

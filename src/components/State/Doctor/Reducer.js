import {
  APPROVE_APPOINTMENT,
  CREATE_DOCTOR_REQUESTS,
  CREATE_NEW_EVENT, GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS, GET_APPOINTMENTS_BY_DATE,
  GET_COMPLETED_APPOINTMENTS, GET_CRITICAL_PATIENTS, GET_DOCTOR_NOTES,
  GET_DOCTOR_REQUESTS,
  GET_DOCTORS,
  GET_INPATIENTS,
  GET_INVENTORY_DATA,
  GET_MEDICAL_PROCEDURE_STATS,
  GET_MONTHLY_EVENTS,
  GET_MOST_COMMON_DIAGNOSIS,
  GET_ONGOING_APPOINTMENTS,
  GET_PATIENT_OVERVIEW,
  GET_PATIENTS,
  GET_ROOMS,
  GET_SCHEDULED_APPOINTMENTS,
  GET_STAFF,
  GET_STATS,
  GET_SURGERIES,
  GET_UPCOMING_EVENTS,
  GET_WAITING_APPOINTMENTS, REJECT_APPOINTMENT,
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
  criticalPatients: [],
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
  hospitalStatistics: [],
  patientOverview: [],
  doctorRequests: [],
  appointmentRequests: [],
  events: [],
  monthlyEvents: [],
  totalCases: null,
  totalInpatientsCount: null,
  totalOutpatientsCount: null,
  medicalProcedureStats: [],
  doctors: [],
  staff: [],
  inventoryData: [],
  totalInventory: null,
  doctorNotes: [],
  appointmentsByDate: []
};

export const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        totalPatients: action.payload.totalCount,
        patients: action.payload.patients,
        isLoading: false,
      };
    case GET_DOCTORS:
      return {
        ...state,
        doctors: action.payload.doctors,
        isLoading: false,
      };
    case GET_STAFF:
      return {
        ...state,
        staff: action.payload.staff,
        isLoading: false,
      };

    case GET_INVENTORY_DATA:
      return {
        ...state,
        totalInventory: action.payload.total,
        inventoryData: action.payload.breakdown,
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

    case GET_STATS:
      return {
        ...state,
        hospitalStatistics: action.payload.statistics,

        isLoading: false,
      };
    case GET_PATIENT_OVERVIEW:
      return {
        ...state,
        patientOverview: action.payload.overview,
        totalCases: action.payload.totalCases,
        totalInpatientsCount: action.payload.totalInpatients,
        totalOutpatientsCount: action.payload.totalOutpatients,
        isLoading: false,
      };

    case GET_CRITICAL_PATIENTS:
      return{
        ...state,
        criticalPatients: action.payload.data
      }

    case GET_MOST_COMMON_DIAGNOSIS:
      return {
        ...state,
        totalDiagnosis: action.payload.totalDiagnoses,
        diagnosis: action.payload.data,
        isLoading: false,
      };

    case GET_MEDICAL_PROCEDURE_STATS:
      return {
        ...state,
        medicalProcedureStats: action.payload,
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

    case GET_DOCTOR_REQUESTS:
      return {
        ...state,
        doctorRequests: action.payload.data,
      };

    case CREATE_DOCTOR_REQUESTS:
      return {
        ...state,
        doctorRequests: [action.payload, ...state.doctorRequests],
      };

    case GET_APPOINTMENT_REQUESTS:
      return {
        ...state,
        appointmentRequests: action.payload,
      };

    case APPROVE_APPOINTMENT:
      return {
        ...state,
        appointmentRequests: state.appointmentRequests.filter(
            (request) => request._id !== action.payload
        ),
      };

    case REJECT_APPOINTMENT:
      return {
        ...state,
        appointmentRequests: state.appointmentRequests.filter(
            (request) => request._id !== action.payload
        ),
      };

    case GET_UPCOMING_EVENTS:
      return {
        ...state,
        events: action.payload.events,
      };

    case GET_MONTHLY_EVENTS:
      return {
        ...state,
        monthlyEvents: action.payload.events,
      };

    case CREATE_NEW_EVENT:
      return {
        ...state,
        events: [...state.events,action.payload],
        monthlyEvents: [...state.monthlyEvents,action.payload]
      };

    case GET_DOCTOR_NOTES:
      return{
        ...state,
        doctorNotes: action.payload,
      }

    case GET_APPOINTMENTS_BY_DATE:
      return{
        ...state,
        appointmentsByDate: action.payload.appointments
      }

    default:
      return state;
  }
};

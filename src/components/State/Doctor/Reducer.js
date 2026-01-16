import {
  ADD_PROGRESS_TRACKER_PHASE,
  APPROVE_APPOINTMENT,
  CLEAR_SERVICE_SUBCATEGORIES,
  CREATE_DOCTOR_NOTE,
  CREATE_DOCTOR_REQUESTS,
  CREATE_NEW_CONSULTATION_FORM,
  CREATE_NEW_EVENT,
  GENERATE_NEW_PRESCRIPTIONS_WITH_AI,
  GENERATE_PRESCRIPTIONS_WITH_AI,
  GET_ADMISSION_REQUESTS,
  GET_ADMISSION_REQUESTS_TO_APPROVE,
  GET_ADMITTED_PATIENTS,
  GET_ALL_DEPARTMENTS,
  GET_ALL_DOCTORS,
  GET_ALL_STAFF,
  GET_ALL_USER_CONSULTATION_FORMS,
  GET_APPOINTMENT_HISTORY,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_BY_DATE,
  GET_APPOINTMENTS_OF_TODAY,
  GET_APPROVED_ADMISSIONS,
  GET_AVAILABLE_BEDS,
  GET_AVAILABLE_ROOMS,
  GET_BILL_DETAILS,
  GET_COMPLETED_APPOINTMENTS,
  GET_CRITICAL_PATIENTS,
  GET_DOCTOR_NOTES,
  GET_DOCTOR_REQUESTS,
  GET_DOCTORS,
  GET_DOCTORS_BY_DEPARTMENT1,
  GET_FILTERED_INPATIENTS,
  GET_FILTERED_PATIENTS,
  GET_FILTERED_ROOMS,
  GET_FILTERED_SURGERIES,
  GET_INPATIENTS,
  GET_INVENTORY,
  GET_INVENTORY_DATA,
  GET_MEDICAL_PROCEDURE_STATS,
  GET_MONTHLY_EVENTS,
  GET_MOST_COMMON_DIAGNOSIS,
  GET_ONGOING_APPOINTMENTS,
  GET_ONGOING_BILL,
  GET_PATIENT_BED_INFO,
  GET_PATIENT_BILLS,
  GET_PATIENT_DETAILS_BY_PAT_ID,
  GET_PATIENT_HISTORY,
  GET_PATIENT_MEDICAL_RECORDS,
  GET_PATIENT_OVERVIEW,
  GET_PATIENTS,
  GET_PATIENTS_DEATILS,
  GET_PATIENTS_VITALS,
  GET_PROGRESS_TRACKER,
  GET_ROOMS,
  GET_SCHEDULED_APPOINTMENTS,
  GET_STAFF,
  GET_STATS,
  GET_SURGERIES,
  GET_UPCOMING_EVENTS,
  GET_WAITING_APPOINTMENTS,
  LOADING_APPOINTMENTS,
  LOADING_INPATIENTS,
  LOADING_PATIENTS,
  LOADING_ROOMS,
  REJECT_APPOINTMENT,
  REMOVE_PRESCRIPTIONS_WITH_AI,
  SEARCH_SERVICE_SUBCATEGORIES,
  SUBMIT_CONSULTATION,
  UPDATE_ADMISSION_INSURANCE,
} from "./ActionType.js";

const initialState = {
  totalPatients: null,
  patients: [],
  totalFilteredPatients: null,
  filteredPatients: [],
  isLoadingFilteredPatients: true,
  totalInpatients: null,
  inPatients: [],
  totalFilteredInpatients: null,
  filteredInPatients: [],
  isLoadingFilteredInPatients: true,
  totalSurgeries: null,
  surgeries: [],
  totalFilteredSurgeries: null,
  filteredSurgeries: [],
  isLoadingFilteredSurgeries: true,
  totalRooms: null,
  rooms: [],
  totalFilteredRooms: null,
  filteredRooms: [],
  isLoadingFilteredRooms: true,
  criticalPatients: [],
  isLoadingCriticalPatients: true,
  totalDiagnosis: null,
  diagnosis: [],
  isLoadingMostCommonDiagnosis: true,
  totalAppointments: [],
  isLoadingAppointments: true,
  scheduledAppointments: [],
  scheduledCount: null,
  ongoingCount: null,
  waitingCount: null,
  completedCount: null,
  ongoingAppointments: [],
  waitingAppointments: [],
  completedAppointments: [],
  isLoadingHospitalStats: true,
  hospitalStatistics: [],
  patientOverview: [],
  isLoadingPatientOverview: true,
  doctorRequests: [],
  appointmentRequests: [],
  events: [],
  isLoadingUpcomingEvents: true,
  monthlyEvents: [],
  patientBills: [],
  isLoadingPatientBills: true,
  totalInpatientsCount: null,
  totalOutpatientsCount: null,
  medicalProcedureStats: [],
  isLoadingMedicalProcedureStats: true,
  doctors: [],
  isLoadingDoctors: true,
  doctorsByDepartment: [],
  staff: [],
  allStaff: [],
  isLoadingStaffs: true,
  inventoryData: [],
  isLoadingInventoryData: true,
  totalInventory: null,
  doctorNotes: [],
  appointmentsByDate: [],
  isLoadingAppointmentsByDate: true,
  appointmentsOfToday: [],
  inventory: [],
  isLoadingInventory: true,
  generatedPrescriptionsByAI: null,
  generatedNewPrescriptionsByAI: null,
  allDoctors: [],
  approvedAdmissions: [],
  admittedPatients: [],
  isLoadingGetAdmittedPatients: true,
  admissionRequestsCount: null,
  admissionRequests: [],
  isLoadingGetAdmissionRequests: true,
  userConsultationForms: [],
  patientDetails: [],
  isLoadingPatientDetails: true,
  progressTracker: [],
  isLoadingGetProgressTracker: true,
  patientVitals: [],
  isLoadingPatientVitals: true,
  patientHistory: [],
  isLoadingPatientHistory: true,
  allDepartments: [],
  patientMedicalRecords: [],
  isLoadingGetPatientMedicalRecords: true,
  totalAppointmentHistory: null,
  appointmentHistory: [],
  isLoadingAppointmentHistory: true,
  patientBedInfo: [],
  requestsToApprove: [],
  isLoadingAdmissionRequestToApprove: true,
  roomsAvailable: [],
  bedsAvailable: [],
  autoCompletePatientSearch: [],
  isLoadingAppointments: true,
  billingRecord: null,
  serviceSearch: [],
  ongoingBill: null,
  isLoadingPatientBill: true,
};

export const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        totalPatients: action.payload.totalPatients,
      };

    case GET_FILTERED_PATIENTS:
      return {
        ...state,
        totalFilteredPatients: action.payload.totalPatients,
        filteredPatients: action.payload.patients,
      };

    case LOADING_PATIENTS:
      return {
        ...state,
        isLoadingFilteredPatients: action.payload,
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
      };
    case LOADING_INPATIENTS:
      return {
        ...state,
        isLoadingFilteredInPatients: action.payload,
      };

    case GET_SURGERIES:
      return {
        ...state,
        totalSurgeries: action.payload.totalSurgeries,
        isLoading: false,
      };

    case GET_FILTERED_SURGERIES:
      return {
        ...state,
        totalFilteredSurgeries: action.payload.totalSurgeries,
        filteredSurgeries: action.payload.surgeries,
        isLoadingFilteredSurgeries: false,
      };

    case GET_ROOMS:
      return {
        ...state,
        totalRooms: action.payload.totalRooms,
        isLoading: false,
      };

    case GET_FILTERED_ROOMS:
      return {
        ...state,
        totalFilteredRooms: action.payload.totalRooms,
        filteredRooms: action.payload.rooms,
      };
    case LOADING_ROOMS:
      return {
        ...state,
        isLoadingFilteredRooms: action.payload,
      };

    case GET_DOCTORS:
      return {
        ...state,
        doctors: action.payload.doctors,
        isLoadingDoctors: false,
      };

    case GET_DOCTORS_BY_DEPARTMENT1:
      return {
        ...state,
        doctorsByDepartment: action.payload.doctors,
      };

    case GET_STAFF:
      return {
        ...state,
        staff: action.payload.staff,
        isLoadingStaffs: false,
      };
    case GET_ALL_STAFF:
      return {
        ...state,
        allStaff: action.payload.staff,
      };
    case GET_INVENTORY_DATA:
      return {
        ...state,
        totalInventory: action.payload.total,
        inventoryData: action.payload.breakdown,
        isLoadingInventoryData: false,
      };
    case GET_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
        isLoadingInventory: false,
      };

    case GET_PATIENTS_DEATILS:
      return {
        ...state,
        patientDetails: action.payload,
        isLoadingPatientDetails: false,
      };
    case GET_PATIENTS_VITALS:
      return {
        ...state,
        patientVitals: action.payload,
        isLoadingPatientVitals: false,
      };
    case GET_APPROVED_ADMISSIONS:
      return {
        ...state,
        approvedAdmissions: action.payload.requests,
        isLoading: false,
      };
    case GET_PROGRESS_TRACKER:
      return {
        ...state,
        progressTracker: action.payload,
        isLoadingGetProgressTracker: false,
      };

    case GET_ADMISSION_REQUESTS_TO_APPROVE:
      return {
        ...state,
        requestsToApprove: action.payload.requests,
        isLoadingAdmissionRequestToApprove: false,
      };
    case GET_STATS:
      return {
        ...state,
        hospitalStatistics: action.payload.stats,
        isLoadingHospitalStats: false,
      };
    case GET_PATIENT_OVERVIEW:
      return {
        ...state,
        patientOverview: action.payload.overview,
        totalInpatientsCount: action.payload.totalInpatients,
        totalOutpatientsCount: action.payload.totalOutpatients,
        isLoadingPatientOverview: false,
      };

    case GET_CRITICAL_PATIENTS:
      return {
        ...state,
        criticalPatients: action.payload.patients,
        isLoadingCriticalPatients: false,
      };

    case GET_MOST_COMMON_DIAGNOSIS:
      return {
        ...state,
        totalDiagnosis: action.payload.totalDiagnosis,
        diagnosis: action.payload.commonDiagnosis,
        isLoadingMostCommonDiagnosis: false,
      };

    case GET_MEDICAL_PROCEDURE_STATS:
      return {
        ...state,
        medicalProcedureStats: action.payload,
        isLoadingMedicalProcedureStats: false,
      };

    case GET_APPOINTMENTS:
      return {
        ...state,
        totalAppointments: action.payload.appointments,
        isLoadingAppointments: false,
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

    case LOADING_APPOINTMENTS:
      return {
        ...state,
        isLoadingAppointments: action.payload,
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
        isLoadingUpcomingEvents: false,
      };

    case GET_MONTHLY_EVENTS:
      return {
        ...state,
        monthlyEvents: action.payload.events,
      };

    case CREATE_NEW_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
        monthlyEvents: [...state.monthlyEvents, action.payload],
      };

    case GET_DOCTOR_NOTES:
      return {
        ...state,
        doctorNotes: action.payload,
      };

    case CREATE_DOCTOR_NOTE:
      return {
        ...state,
        doctorNotes: [...state.doctorNotes, action.payload],
      };

    case GET_APPOINTMENTS_BY_DATE:
      return {
        ...state,
        appointmentsByDate: action.payload.appointments,
        isLoadingAppointmentsByDate: false,
      };

    case GET_APPOINTMENTS_OF_TODAY:
      return {
        ...state,
        appointmentsOfToday: action.payload.appointments,
      };

    case GENERATE_PRESCRIPTIONS_WITH_AI:
      return {
        ...state,
        generatedPrescriptionsByAI: action.payload,
      };
    case GENERATE_NEW_PRESCRIPTIONS_WITH_AI:
      return {
        ...state,
        generatedNewPrescriptionsByAI: action.payload,
      };

    case REMOVE_PRESCRIPTIONS_WITH_AI:
      return {
        ...state,
        generatedPrescriptionsByAI: null,
        generatedNewPrescriptionsByAI: null,
      };

    case GET_ADMITTED_PATIENTS:
      return {
        ...state,
        admittedPatients: action.payload,
        isLoadingGetAdmittedPatients: false,
      };

    case GET_ALL_DOCTORS:
      return {
        ...state,
        allDoctors: action.payload,
      };

    case GET_ALL_USER_CONSULTATION_FORMS:
      return {
        ...state,
        userConsultationForms: action.payload,
      };

    case CREATE_NEW_CONSULTATION_FORM:
      return {
        ...state,
        userConsultationForms: [...state.userConsultationForms, action.payload],
      };

    case GET_PATIENT_HISTORY:
      return {
        ...state,
        patientHistory: action.payload,
        isLoadingPatientHistory: false,
      };

    case GET_ALL_DEPARTMENTS:
      return {
        ...state,
        allDepartments: action.payload,
      };

    case GET_PATIENT_MEDICAL_RECORDS:
      return {
        ...state,
        patientMedicalRecords: action.payload,
        isLoadingGetPatientMedicalRecords: false,
      };

    case GET_APPOINTMENT_HISTORY:
      return {
        ...state,
        totalAppointmentHistory: action.payload.totalAppointments,
        appointmentHistory: action.payload.appointments,
        isLoadingAppointmentHistory: false,
      };

    case GET_PATIENT_BED_INFO:
      return {
        ...state,
        patientBedInfo: action.payload,
      };

    case GET_AVAILABLE_BEDS:
      return {
        ...state,
        bedsAvailable: action.payload,
      };
    case GET_AVAILABLE_ROOMS:
      return {
        ...state,
        roomsAvailable: action.payload,
      };

    case GET_PATIENT_BILLS:
      return {
        ...state,
        patientBills: action.payload,
        isLoadingPatientBills: false,
      };

    case GET_PATIENT_DETAILS_BY_PAT_ID:
      return {
        ...state,
        autoCompletePatientSearch: action.payload,
      };

    case ADD_PROGRESS_TRACKER_PHASE:
      return {
        ...state,
        isLoadingGetProgressTracker: true,
      };
    case GET_ADMISSION_REQUESTS:
      return {
        ...state,
        admissionRequests: action.payload.requests,
        admissionRequestsCount: action.payload.totalRequests,
        isLoadingGetAdmissionRequests: false,
      };
    case UPDATE_ADMISSION_INSURANCE:
      return {
        ...state,
        admissionRequests: state.admissionRequests.map((request) =>
          request._id === action.payload._id ? action.payload : request
        ),
      };

    case GET_BILL_DETAILS:
      return {
        ...state,
        billingRecord: action.payload,
        isLoadingPatientBill: false,
      };
    case SEARCH_SERVICE_SUBCATEGORIES:
      return {
        ...state,
        serviceSearch: action.payload,
      };

    case CLEAR_SERVICE_SUBCATEGORIES:
      return {
        ...state,
        serviceSearch: [],
      };
    case GET_ONGOING_BILL:
      return {
        ...state,
        ongoingBill: action.payload,
      };
    default:
      return state;
  }
};

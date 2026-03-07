import {
  ACCEPT_REQUEST,
  ADD_DEPARTMENT,
  ADD_DOCTORS,
  ADD_EXPENSE,
  ADD_INSURANCE_COMPANY,
  ADD_PAYMENT_TO_BILL,
  ADD_ROOM,
  ADD_SERVICE,
  ADD_SERVICE_TO_COMPANY,
  ADD_STAFFS,
  ADD_TO_BILL,
  BEDS_REPORT_FAIL,
  BEDS_REPORT_REQUEST,
  BEDS_REPORT_SUCCESS,
  CLEAR_SERVICE_SUBCATEGORIES,
  DELETE_DOCTORS,
  DELETE_EXPENSE,
  DELETE_ROOM,
  DELETE_SERVICE,
  DELETE_SERVICE_CATEGORY,
  DELETE_STAFFS,
  DELETE_TPA_SERVICE,
  DELETE_TPA_SERVICE_CATEGORY,
  EDIT_BILL,
  EDIT_TPA_SERVICE,
  GET_ADMISSION_REQUESTS,
  GET_ADMISSION_REQUESTS_FOR_APPROVAL,
  GET_ALL_DEPARTMENTS,
  GET_APPOINTMENT_COUNTS,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_BILL_DETAILS,
  GET_BILLING_RECORDS,
  GET_COMPLETED_APPOINTMENTS,
  GET_DEPARTMENT_BY_ID,
  GET_DOCTOR_REQUESTS,
  GET_DOCTORS,
  GET_EARNINGS,
  GET_EARNINGS_GRAPH,
  GET_ESTIMATED_BILL,
  GET_EXPENSES,
  GET_FILTERED_DOCTORS,
  GET_FILTERED_INPATIENTS,
  GET_FILTERED_PATIENTS,
  GET_FILTERED_ROOMS,
  GET_INSURANCE_COMPANIES,
  GET_INSURED_PATIENTS,
  GET_ONGOING_APPOINTMENTS,
  GET_PACKAGES,
  GET_PATIENTS,
  GET_PROGRESS_TRACKER,
  GET_REJECTED_APPOINTMENTS,
  GET_ROOM_TYPES,
  GET_ROOMS,
  GET_SCHEDULED_APPOINTMENTS,
  GET_SERVICES,
  GET_SERVICES_BY_DEPARTMENT_ID,
  GET_STAFFS,
  GET_WAITING_APPOINTMENTS,
  LOADING_PATIENTS,
  NULL_ESTIMATED_BILL,
  SEARCH_SERVICE_SUBCATEGORIES,
  TPA_FAIL,
  TPA_REQUEST,
  TPA_SUCCESS,
  UPDATE_ADMISSION_INSURANCE,
  UPDATE_DOCTORS,
  UPDATE_EXPENSE,
} from "./ActionType.js";

const initialState = {
  totalEarnings: null,
  monthlyEarnings: [],
  totalPatients: null,
  totalFilteredPatients: null,
  totalDoctors: null,
  doctorCount: null,
  totalStaffs: null,
  staffCount: null,
  totalFilteredInpatients: null,
  filteredInPatients: [],
  isLoadingFilteredInPatients: true,
  totalRooms: null,
  totalFilteredRooms: null,
  patient: null,
  appointmentCount: null,
  isLoadingAppointmentCount: true,
  patients: [],
  isLoadingGetPatients: true,
  filteredPatients: [],
  doctors: [],
  staffs: [],
  rooms: [],
  filteredRooms: [],
  departments: [],
  department: null,
  expenses: [],
  totalExpenses: null,
  totalAppointments: [],
  isLoadingTotalAppointments: true,
  scheduledAppointments: [],
  scheduledCount: null,
  ongoingCount: null,
  waitingCount: null,
  completedCount: null,
  ongoingAppointments: [],
  waitingAppointments: [],
  completedAppointments: [],
  appointmentRequests: [],
  isLoadingAppointmentRequests: true,
  rejectedAppointments: [],
  isLoadingRejectedAppointments: true,
  billingRecord: null,
  billingRecords: [],
  services: [],
  noOfAppointments: null,
  isLoading: true,
  error: null,
  success: null,
  recordsCount: null,
  requestsToApprove: [],
  doctorRequests: [],
  insuredPatients: [],
  isLoadingInsurancePatients: true,
  insuranceCompanies: [],
  isLoadingInsuranceCompanies: true,
  estimatedBill: null,
  packages: [],
  progressTracker: [],
  isLoadingGetProgressTracker: true,
  roomTypes: [],
  servicesByDepartment: [],
  isLoadingRoomTypes: false,
  totalAdmissionRequests: null,
  admissionRequests: [],
  isLoadingAdmissionRequests: true,
  isLoadingDoctors: false,
  isLoadingStaffs: false,
  isLoadingRooms: false,
  tpaloading: false,
  tpadata: null,
  tpaerror: null,
  serviceSearch: [],
  cardPatients: [],
  cardEarnings: [],
  graphEarnings: [],
  graphPatients: [],
  bedReport: [],
  isLoadingBedReport: false,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EARNINGS:
      return {
        ...state,
        monthlyEarnings: action.payload.monthlyRevenue,
      };
    case GET_EARNINGS_GRAPH:
      return {
        ...state,
        totalEarnings: action.payload.earnings?.totalEarnings,
        graphEarnings: action.payload.trends?.earnings,
        graphPatients: action.payload.trends?.patients,
        cardEarnings: action.payload.earnings,
        cardPatients: action.payload.patients,
      };
    case GET_APPOINTMENT_COUNTS:
      return {
        ...state,
        appointmentCount: action.payload,
        isLoadingAppointmentCount: false,
      };
    case GET_DOCTORS:
      return {
        ...state,
        totalDoctors: action.payload.totalDoctors,
        doctorCount: action.payload.totalDoctors,
        doctors: action.payload.doctors,
      };

    case "LOADING_DOCTORS":
      return {
        ...state,
        isLoadingDoctors: action.payload,
      };
    case GET_FILTERED_DOCTORS:
      return {
        ...state,
        doctorCount: action.payload.totalDoctors,
        doctors: action.payload.doctors,
      };
    case ADD_DOCTORS:
      return {
        ...state,
        doctors: [...state.doctors, action.payload.newUser],
        totalDoctors: state.totalDoctors + 1,
      };
    case DELETE_DOCTORS:
      return {
        ...state,
        doctors: state.doctors.filter(
          (doctor) => doctor._id !== action.payload.resource._id,
        ),
        totalDoctors: state.totalDoctors - 1,
      };
    case UPDATE_DOCTORS:
      return {
        ...state,
        doctors: state.doctors.map((doctor) =>
          doctor._id === action.payload.resource._id
            ? action.payload.resource
            : doctor,
        ),
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

    case ADD_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, action.payload],
      };

    case GET_APPOINTMENTS:
      return {
        ...state,
        totalAppointments: action.payload.appointments,
        isLoadingTotalAppointments: false,
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

    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload.patients,
        isLoadingGetPatients: false,
      };

    case GET_FILTERED_PATIENTS:
      return {
        ...state,
        isLoading: false,
        totalFilteredPatients: action.payload.totalPatients,
        filteredPatients: action.payload.patients,
      };
    case LOADING_PATIENTS:
      return {
        ...state,
        isLoadingFilteredPatients: action.payload,
      };
    case GET_STAFFS:
      return {
        ...state,

        staffCount: action.payload.totalStaff,
        staffs: action.payload.staff,
        isLoading: false,
      };

    case "LOADING_STAFFS":
      return {
        ...state,
        isLoadingStaffs: action.payload,
      };
    case ADD_STAFFS:
      return {
        ...state,
        staffs: [...state.staffs, action.payload.staff],
        totalStaffs: state.totalStaffs + 1,
      };
    case DELETE_STAFFS:
      return {
        ...state,
        staffs: state.staffs.filter(
          (staff) => staff._id !== action.payload.resource._id,
        ),
        totalStaffs: state.totalStaffs - 1,
      };
    // case UPDATE_STAFFS:
    //   return {
    //     ...state,
    //     staffs: state.staffs.map((staff) =>
    //       staff._id === action.payload.resource._id
    //         ? action.payload.resource
    //         : staff
    //     ),
    //   };

    case GET_ROOMS:
      return {
        ...state,
        totalRooms: action.payload.totalRooms,
        rooms: action.payload.rooms,
        isLoading: false,
      };

    case "LOADING_ROOMS":
      return {
        ...state,
        isLoadingRooms: action.payload,
      };
    case GET_FILTERED_ROOMS:
      return {
        ...state,
        totalFilteredRooms: action.payload.totalRooms,
        filteredRooms: action.payload.rooms,
      };
    case GET_APPOINTMENT_REQUESTS:
      return {
        ...state,
        appointmentRequests: action.payload.appointments,
        isLoadingAppointmentRequests: false,
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload.room],
        totalRooms: state.totalRooms + 1,
      };
    // case UPDATE_ROOM:
    //   return {
    //     ...state,
    //     rooms: state.rooms.map((room) =>
    //       room._id === action.payload.resource._id
    //         ? action.payload.resource._id
    //         : room
    //     ),
    //   };

    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(
          (room) => room._id !== action.payload.resource._id,
        ),
        totalRooms: state.totalRooms - 1,
      };
    case GET_REJECTED_APPOINTMENTS:
      return {
        ...state,
        rejectedAppointments: action.payload.rejectedAppointments,
        isLoadingRejectedAppointments: false,
      };

    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload.expenses,
        totalExpenses: action.payload.totalExpenses,
        isLoading: false,
      };

    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload.expense],
      };

    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense._id === action.payload.resource._id
            ? action.payload.resource
            : expense,
        ),
      };

    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload.resource._id,
        ),
      };
    case GET_BILLING_RECORDS:
      return {
        ...state,
        billingRecords: action.payload.bills,
        recordsCount: action.payload.totalBills,
      };
    case GET_BILL_DETAILS:
      return {
        ...state,
        billingRecord: action.payload,
      };

    case GET_SERVICES:
      return {
        ...state,
        services: action.payload.services,
      };

    case ADD_SERVICE: {
      const newService = action.payload.service;

      // Normalize payload data
      const newServiceId = newService._id || newService.serviceId;
      const newServiceName = newService.name || newService.serviceName;
      const newDepartmentName =
        newService.department?.name || newService.department;

      const existingIndex = state.services.findIndex((service) => {
        const serviceIdMatch =
          service.serviceId === newServiceId || service._id === newServiceId;

        const serviceNameMatch =
          service.serviceName === newServiceName ||
          service.name === newServiceName;

        const departmentNameMatch =
          (service.department?.name || service.department) ===
          newDepartmentName;

        return serviceIdMatch || (serviceNameMatch && departmentNameMatch);
      });

      if (existingIndex !== -1) {
        const updatedServices = [...state.services];
        const existingService = updatedServices[existingIndex];

        updatedServices[existingIndex] = {
          ...existingService,
          ...newService,
          serviceId: newServiceId,
          serviceName: newServiceName,
          department: newDepartmentName,
          categories: newService.categories || existingService.categories,
          lastUpdated: newService.lastUpdated || new Date().toISOString(),
        };

        return { ...state, services: updatedServices };
      }

      // Add new service
      return {
        ...state,
        services: [
          ...state.services,
          {
            ...newService,
            serviceId: newServiceId,
            serviceName: newServiceName,
            department: newDepartmentName,
          },
        ],
      };
    }

    case DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(
          (service) => service._id !== action.payload,
        ),
      };

    case DELETE_SERVICE_CATEGORY:
      return {
        ...state,
        services: state.services.map((service) =>
          service._id === action.payload.serviceId
            ? {
                ...service,
                categories: service.categories.filter(
                  (category) => category._id !== action.payload.categoryId,
                ),
              }
            : service,
        ),
      };

    case GET_ADMISSION_REQUESTS_FOR_APPROVAL:
      return {
        ...state,
        requestsToApprove: action.payload.requests,
      };

    case GET_DOCTOR_REQUESTS:
      return {
        ...state,
        doctorRequests: action.payload.data,
      };

    case ACCEPT_REQUEST:
      return {
        ...state,
        doctorRequests: state.doctorRequests.filter(
          (request) => request._id !== action.payload,
        ),
      };

    case GET_INSURED_PATIENTS:
      return {
        ...state,
        insuredPatients: action.payload.data,
        isLoadingInsurancePatients: false,
      };

    case GET_INSURANCE_COMPANIES:
      return {
        ...state,
        insuranceCompanies: Array.isArray(action.payload.companies)
          ? action.payload.companies
          : [],
        isLoadingInsuranceCompanies: false,
      };

    case ADD_INSURANCE_COMPANY:
      return {
        ...state,
        insuranceCompanies: [...state.insuranceCompanies, action.payload],
      };

    case ADD_SERVICE_TO_COMPANY:
      return {
        ...state,
        insuranceCompanies: state.insuranceCompanies.map((company) =>
          company._id === action.payload._id
            ? { ...company, services: action.payload.services }
            : company,
        ),
      };

    case DELETE_TPA_SERVICE_CATEGORY:
      return {
        ...state,
        insuranceCompanies: state.insuranceCompanies.map((company) =>
          company._id === action.payload.companyId
            ? {
                ...company,
                services: company.services.map((service) =>
                  service._id === action.payload.serviceId
                    ? {
                        ...service,
                        categories: service.categories.filter(
                          (cat) => cat._id !== action.payload.categoryId,
                        ),
                      }
                    : service,
                ),
              }
            : company,
        ),
      };

    case DELETE_TPA_SERVICE:
      return {
        ...state,
        insuranceCompanies: state.insuranceCompanies.map((company) =>
          company._id === action.payload.companyId
            ? {
                ...company,
                services: company.services.filter(
                  (service) => service._id !== action.payload.serviceId,
                ),
              }
            : company,
        ),
      };

    case EDIT_TPA_SERVICE:
      return {
        ...state,
        insuranceCompanies: state.insuranceCompanies.map((company) =>
          company._id === action.payload.company._id
            ? {
                ...company,
                services: company.services.map((service) =>
                  service._id === action.payload.updatedService._id
                    ? action.payload.updatedService // replace with updated service from backend
                    : service,
                ),
              }
            : company,
        ),
      };

    case GET_PACKAGES:
      return {
        ...state,
        packages: action.payload.categories,
      };

    case GET_ESTIMATED_BILL:
      return {
        ...state,
        estimatedBill: action.payload.estimates[0],
      };

    case NULL_ESTIMATED_BILL:
      return {
        ...state,
        estimatedBill: null,
      };

    case GET_PROGRESS_TRACKER:
      return {
        ...state,
        progressTracker: action.payload,
        isLoadingGetProgressTracker: false,
      };
    case GET_ROOM_TYPES:
      return {
        ...state,
        roomTypes: action.payload.subcategories,
        isLoadingRoomTypes: false,
      };
    case GET_FILTERED_INPATIENTS:
      return {
        ...state,
        totalFilteredInpatients: action.payload.totalInpatients,
        filteredInPatients: action.payload.inpatients,
        isLoadingFilteredInPatients: false,
      };

    case GET_ADMISSION_REQUESTS:
      return {
        ...state,
        totalAdmissionRequests: action.payload?.totalRequests,
        admissionRequests: action.payload?.requests,
        isLoadingAdmissionRequests: false,
      };

    case UPDATE_ADMISSION_INSURANCE:
      return {
        ...state,
        admissionRequests: state.admissionRequests.map((request) =>
          request._id === action.payload._id ? action.payload : request,
        ),
      };
    case ADD_PAYMENT_TO_BILL:
      return {
        ...state,
        billingRecord: action.payload.bill,
      };
    case EDIT_BILL:
      return {
        ...state,
        billingRecord: action.payload.bill,
      };

    case TPA_REQUEST:
      return { ...state, tpaloading: true, tpaerror: null };

    case TPA_SUCCESS:
      return { ...state, tpaloading: false, tpadata: action.payload };

    case TPA_FAIL:
      return { ...state, tpaloading: false, tpaerror: action.payload };
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

    case BEDS_REPORT_REQUEST:
      return { ...state, isLoadingBedReport: true };

    case BEDS_REPORT_SUCCESS:
      return { ...state, bedReport: action.payload, isLoadingBedReport: false };

    case BEDS_REPORT_FAIL:
      return { ...state, isLoadingBedReport: false };

    default:
      return state;
  }
};

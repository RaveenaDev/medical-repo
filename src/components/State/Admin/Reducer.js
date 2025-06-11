import {
  ADD_DEPARTMENT,
  ADD_DOCTORS,
  ADD_EXPENSE,
  ADD_ROOM,
  ADD_SERVICE,
  ADD_STAFFS,
  DELETE_DOCTORS,
  DELETE_EXPENSE,
  DELETE_ROOM,
  DELETE_SERVICE,
  DELETE_SERVICE_CATEGORY,
  DELETE_STAFFS,
  GET_ALL_DEPARTMENTS,
  GET_APPOINTMENT_COUNTS,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_BILL_DETAILS,
  GET_BILLING_RECORDS,
  GET_COMPLETED_APPOINTMENTS,
  GET_DEPARTMENT_BY_ID,
  GET_DOCTORS,
  GET_EARNINGS,
  GET_EXPENSES,
  GET_FILTERED_DOCTORS,
  GET_FILTERED_PATIENTS,
  GET_ONGOING_APPOINTMENTS,
  GET_PATIENTS,
  GET_REJECTED_APPOINTMENTS,
  GET_ROOMS,
  GET_SCHEDULED_APPOINTMENTS,
  GET_SERVICES,
  GET_STAFFS,
  GET_WAITING_APPOINTMENTS,
  UPDATE_DOCTORS,
  UPDATE_EXPENSE,
  UPDATE_ROOM,
  UPDATE_STAFFS,
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
  totalRooms: null,
  patient: null,
  appointmentCount: null,
  patients: [],
  filteredPatients: [],
  doctors: [],
  staffs: [],
  rooms: [],
  departments: [],
  department: null,
  expenses: [],
  totalExpenses: null,
  totalAppointments: [],
  scheduledAppointments: [],
  scheduledCount: null,
  ongoingCount: null,
  waitingCount: null,
  completedCount: null,
  ongoingAppointments: [],
  waitingAppointments: [],
  completedAppointments: [],
  appointmentRequests: [],
  rejectedAppointments: [],
  billingRecord: null,
  billingRecords: [],
  services: [],
  noOfAppointments: null,
  isLoading: true,
  error: null,
  success: null,
  recordsCount: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EARNINGS:
      return {
        ...state,
        totalEarnings: action.payload.totalRevenue,
        monthlyEarnings: action.payload.monthlyRevenue,
      };
    case GET_APPOINTMENT_COUNTS:
      return {
        ...state,
        appointmentCount: action.payload,
      };
    case GET_DOCTORS:
      return {
        ...state,
        totalDoctors: action.payload.totalDoctors,
        doctorCount: action.payload.totalDoctors,
        doctors: action.payload.doctors,
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
          (doctor) => doctor._id !== action.payload.resource._id
        ),
        totalDoctors: state.totalDoctors - 1,
      };
    case UPDATE_DOCTORS:
      return {
        ...state,
        doctors: state.doctors.map((doctor) =>
          doctor._id === action.payload.resource._id
            ? action.payload.resource
            : doctor
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

    case ADD_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, action.payload],
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

    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload.patients,
      };

    case GET_FILTERED_PATIENTS:
      return {
        ...state,
        isLoading: false,
        totalFilteredPatients: action.payload.totalPatients,
        filteredPatients: action.payload.patients,
      };

    case GET_STAFFS:
      return {
        ...state,

        staffCount: action.payload.totalStaff,
        staffs: action.payload.staff,
        isLoading: false,
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
          (staff) => staff._id !== action.payload.resource._id
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
        totalRooms: action.payload.rooms.length,
        rooms: action.payload.rooms,
        isLoading: false,
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
          (room) => room._id !== action.payload.resource._id
        ),
        totalRooms: state.totalRooms - 1,
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
            : expense
        ),
      };

    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload.resource._id
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

    case ADD_SERVICE:
      return {
        ...state,
        services: state.services.some(
          (service) =>
            service.name === action.payload.service.name &&
            service.department.name === action.payload.service.department.name
        )
          ? state.services.map((service) =>
              service.name === action.payload.service.name &&
              service.department.name === action.payload.service.department.name
                ? action.payload.service
                : service
            )
          : [...state.services, action.payload.service],
      };

    case DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(
          (service) => service._id !== action.payload
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
                  (category) => category._id !== action.payload.categoryId
                ),
              }
            : service
        ),
      };

    default:
      return state;
  }
};

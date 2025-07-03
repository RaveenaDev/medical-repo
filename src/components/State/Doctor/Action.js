import axios from "axios";
import { API_URL } from "../../Config/api.js";
import {
  APPROVE_APPOINTMENT,
  CREATE_DOCTOR_REQUESTS,
  CREATE_NEW_EVENT, GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_COMPLETED_APPOINTMENTS,
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
import { toast } from "react-toastify";

export const getPatients = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/appointed-patients`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    // console.log("Pattt: ",data.data)
    dispatch({ type: GET_PATIENTS, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};
export const getInpatients = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/inPatients`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("InPatt: ",data)
    dispatch({ type: GET_INPATIENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getSurgeries = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/patients/surgeries`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Surgeries: ", data.data);

    dispatch({ type: GET_SURGERIES, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getRoomsByHospital`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_ROOMS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getMostCommonDiagnosis = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/diagnosis/most-common`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    console.log("Diag: ", data);

    dispatch({ type: GET_MOST_COMMON_DIAGNOSIS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAppointments =
  (activeLabel, startDate, endDate, selectedBranch, page, rowsPerPage) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      if (selectedBranch === "All Branches") selectedBranch = null;

      const { data } = await axios.get(`${API_URL}/getAppointments`, {
        params: {
          status: activeLabel,
          start: startDate,
          end: endDate,
          departmentId: selectedBranch,
          page: page + 1,
          limit: rowsPerPage,
        }, // Sending status as a query parameter
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      });

      // console.log("Getting Appointments : ", data);

      dispatch({ type: GET_APPOINTMENTS, payload: data });

      if (data.message === "Scheduled appointments retrieved successfully") {
        dispatch({ type: GET_SCHEDULED_APPOINTMENTS, payload: data });
      } else if (
        data.message === "Ongoing appointments retrieved successfully"
      ) {
        dispatch({ type: GET_ONGOING_APPOINTMENTS, payload: data });
      } else if (
        data.message === "Waiting appointments retrieved successfully"
      ) {
        dispatch({ type: GET_WAITING_APPOINTMENTS, payload: data });
      } else {
        dispatch({ type: GET_COMPLETED_APPOINTMENTS, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getDoctorRequests = (status) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/requests?status=${status}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("REQ : ", data);

    localStorage.setItem("doctorRequestsCount", data.data?.length);

    dispatch({ type: GET_DOCTOR_REQUESTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAppointmentRequests = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getRequestedAppointments`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Appointment Requests : ", data);

    dispatch({ type: GET_APPOINTMENT_REQUESTS, payload: data.appointments });
  } catch (error) {
    console.log(error);
  }
};

export const approveAppointment = (appointmentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/approveAppointment/${appointmentId}`, appointmentId, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Approved Successfully : ", data);

    dispatch({ type: APPROVE_APPOINTMENT, payload: appointmentId });

    toast.success("Appointment Approved Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Appointment Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const rejectAppointment = (appointmentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/rejectAppointment/${appointmentId}`, appointmentId, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Rejected Successfully : ", data);

    dispatch({ type: REJECT_APPOINTMENT, payload: appointmentId });

    toast.success("Appointment Rejected Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Appointment Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const createDoctorRequests = (requestData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/requests`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    console.log("Sent Successfully : ", data);

    dispatch({ type: CREATE_DOCTOR_REQUESTS, payload: data.data });

    toast.success("Request Created Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Request Creation Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const getHospitalStatistics = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const departmentId = localStorage.getItem("departmentId");

    const { data } = await axios.get(`${API_URL}/statistics`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
      params: {
        departmentId,
      },
    });

    dispatch({ type: GET_STATS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPatientOverview = (fromDate, toDate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const departmentId = localStorage.getItem("departmentId");

    const { data } = await axios.get(`${API_URL}/overview`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
      params: {
        departmentId,
        fromDate,
        toDate,
      },
    });

    dispatch({ type: GET_PATIENT_OVERVIEW, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingEvents = (date) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/events?date=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    console.log("Upcoming Events: ", data);
    dispatch({ type: GET_UPCOMING_EVENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getMonthlyEvents = (month, year) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/events/monthly`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
      params: {
        month,
        year,
      },
    });

    console.log("Monthly Events: ", data);
    dispatch({ type: GET_MONTHLY_EVENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getMedicalProcedureStats =
  (filterType = "month", month = null, year = null) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");
      const departmentId = localStorage.getItem("departmentId");

      const { data } = await axios.get(`${API_URL}/medical-procedures`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          departmentId,
          filterType,
          month,
          year,
        },
      });

      dispatch({ type: GET_MEDICAL_PROCEDURE_STATS, payload: data.data });
    } catch (error) {
      console.error("MedicalProcedureStats error:", error);
    }
  };

export const createNewEvent = (eventData, onClose) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/events`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    console.log("Created New Event: ", data);
    dispatch({ type: CREATE_NEW_EVENT, payload: data.event });
    onClose();
    toast.success("Request Created Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error(error);
    toast.error("Event Creation Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const getDoctorsByDepartment = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const departmentId = localStorage.getItem("departmentId");

    const { data } = await axios.get(
      `${API_URL}/getDoctorsByDepartment/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

    dispatch({ type: GET_DOCTORS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getStaff = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const departmentId = localStorage.getItem("departmentId");

    const { data } = await axios.get(
      `${API_URL}/getStaffByDepartment/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
        params: {
          departmentId,
        },
      }
    );

    dispatch({ type: GET_STAFF, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getInventoryData = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const departmentId = localStorage.getItem("departmentId");

    const { data } = await axios.get(
      `${API_URL}/inventory/summary/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
        params: {
          departmentId,
        },
      }
    );

    dispatch({ type: GET_INVENTORY_DATA, payload: data });
  } catch (error) {
    console.log(error);
  }
};

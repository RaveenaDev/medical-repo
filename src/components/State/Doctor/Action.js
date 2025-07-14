import axios from "axios";
import { API_URL } from "../../Config/api.js";
import {
  ADD_INVENTORY_ITEM,
  APPROVE_APPOINTMENT,
  CREATE_CATEGORY,
  CREATE_DOCTOR_NOTE,
  CREATE_DOCTOR_REQUESTS,
  CREATE_NEW_EVENT,
  DELETE_DOCTOR_NOTE,
  EDIT_DOCTOR_NOTE,
  GENERATE_PRESCRIPTIONS_WITH_AI,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_BY_DATE,
  GET_COMPLETED_APPOINTMENTS,
  GET_CRITICAL_PATIENTS,
  GET_DOCTOR_NOTES,
  GET_DOCTOR_REQUESTS,
  GET_DOCTORS,
  GET_INPATIENTS,
  GET_INVENTORY,
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
  GET_WAITING_APPOINTMENTS,
  REJECT_APPOINTMENT,
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

export const getAppointments = (startDate, endDate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const departmentId = localStorage.getItem("departmentId");

    const { data } = await axios.get(`${API_URL}/getAppointments`, {
      params: {
        // status: 'Ongoing',
        start: startDate,
        end: endDate,
        departmentId: departmentId,
      }, // Sending status as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Getting Appointments : ", data);

    dispatch({ type: GET_APPOINTMENTS, payload: data });

    if (data.message === "Scheduled appointments retrieved successfully") {
      dispatch({ type: GET_SCHEDULED_APPOINTMENTS, payload: data });
    } else if (data.message === "Ongoing appointments retrieved successfully") {
      dispatch({ type: GET_ONGOING_APPOINTMENTS, payload: data });
    } else if (data.message === "Waiting appointments retrieved successfully") {
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

    const { data } = await axios.post(
      `${API_URL}/approveAppointment/${appointmentId}`,
      appointmentId,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

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

    const { data } = await axios.post(
      `${API_URL}/rejectAppointment/${appointmentId}`,
      appointmentId,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

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

export const getCriticalPatients = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/critical-patients`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    console.log("Critical Patients: ", data);
    dispatch({ type: GET_CRITICAL_PATIENTS, payload: data });
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

export const assignPatient = (assignmentData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/assignments`,
      assignmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Created New Assignment:", data);

    // Optional Redux dispatch
    // dispatch({ type: CREATE_NEW_ASSIGNMENT, payload: data });

    toast.success("Assigned successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Assignment Error:", error);
    toast.error("Assignment failed!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
};

export const getDoctorNotes = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/doctor-notes`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Doctor Notes: ", data);
    dispatch({ type: GET_DOCTOR_NOTES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createDoctorNote = (note) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/doctor-notes`, note, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    console.log("Doctor Notes: ", data);

    dispatch({ type: CREATE_DOCTOR_NOTE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const editDoctorNote = (updatedNote, noteId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.patch(
      `${API_URL}/doctor-notes/${noteId}`,
      updatedNote,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

    // console.log("Edited Doctor Note: ", data);

    dispatch({ type: EDIT_DOCTOR_NOTE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDoctorNote = (noteId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.delete(`${API_URL}/doctor-notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Deleted Doctor Note: ", data);

    dispatch({ type: DELETE_DOCTOR_NOTE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = (categoryData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const departmentId = localStorage.getItem("departmentId");

    const payload = {
      ...categoryData,
      departmentId,
    };

    const { data } = await axios.post(
      `${API_URL}/inventory/categories`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Category created successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
    // console.log(data);
    dispatch({
      type: CREATE_CATEGORY,
      payload: data,
    });
  } catch (error) {
    console.error("Category creation failed:", error);
    toast.error("Category creation error!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
};

export const getAppointmentByDate =
  (startDate, endDate) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");
      const departmentId = localStorage.getItem("departmentId");

      const { data } = await axios.get(`${API_URL}/getAppointments`, {
        params: {
          start: startDate,
          end: endDate,
          departmentId: departmentId,
        }, // Sending status as a query parameter
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      });

      // console.log("All Appointments below: ", data);
      dispatch({ type: GET_APPOINTMENTS_BY_DATE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const addInventoryItem = (itemData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/inventory/items`, itemData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    toast.success("Item Added successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error adding inventory item:", error);

    toast.error("Item creation error!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
};

export const getInventoryByDepartment = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const departmentId = localStorage.getItem("departmentId");

    const { data } = await axios.get(`${API_URL}/inventory/${departmentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: GET_INVENTORY,
      payload: data,
    });
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
  }
};

export const generatePrescriptionsWithAI =
  (patientData) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        `${API_URL}/generate-prescription`,
        patientData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includes the token in the authorization header
          },
        }
      );

      console.log("Generated With AI : ", data.data);

      dispatch({ type: GENERATE_PRESCRIPTIONS_WITH_AI, payload: data.data });
    } catch (error) {
      console.log(error);
    }
  };

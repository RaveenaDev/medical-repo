import axios from "axios";
import { API_URL } from "../../Config/api.js";
import {
  ADD_INVENTORY_ITEM,
  APPROVE_APPOINTMENT,
  CREATE_ADMISSION_REQUEST,
  CREATE_CATEGORY,
  CREATE_DOCTOR_NOTE,
  CREATE_DOCTOR_REQUESTS,
  CREATE_NEW_CONSULTATION_FORM,
  CREATE_NEW_EVENT,
  DELETE_DOCTOR_NOTE,
  EDIT_DOCTOR_NOTE,
  GENERATE_PRESCRIPTIONS_WITH_AI,
  GET_ADMISSION_REQUESTS,
  GET_ADMITTED_PATIENTS,
  GET_ALL_DEPARTMENTS,
  GET_ALL_DOCTORS,
  GET_ALL_USER_CONSULTATION_FORMS,
  GET_APPOINTMENT_HISTORY,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_APPOINTMENTS_BY_DATE,
  GET_APPOINTMENTS_OF_TODAY,
  GET_APPROVED_ADMISSIONS,
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
  GET_PATIENT_BED_INFO,
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
  REJECT_APPOINTMENT,
  REMOVE_PRESCRIPTIONS_WITH_AI,
  SUBMIT_CONSULTATION,
} from "./ActionType.js";
import { toast } from "react-toastify";

export const getPatients = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getPatientsByHospital`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    // console.log("Pattt: ", data.patients);
    dispatch({ type: GET_PATIENTS, payload: data.patients });
  } catch (error) {
    console.log(error);
  }
};
export const getInpatients = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getInPatients`, {
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

    const { data } = await axios.get(`${API_URL}/getpatientsinsurgery`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Surgeries: ", data);

    dispatch({ type: GET_SURGERIES, payload: data });
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

    // console.log("Diag: ", data);

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

    // console.log("Sent Successfully : ", data);

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
        // departmentId,
        fromDate,
        toDate,
      },
    });
    // console.log("Patient Overview: ", data);
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

    // console.log("Upcoming Events: ", data);
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

    // console.log("Monthly Events: ", data);
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

    // console.log("Critical Patients: ", data);
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

    // console.log("Created New Event: ", data);
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

    // console.log("Doctor Notes: ", data);

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

export const getAppointmentsOfToday =
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
      dispatch({ type: GET_APPOINTMENTS_OF_TODAY, payload: data });
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

      // console.log("Generated With AI : ", data.data);

      dispatch({ type: GENERATE_PRESCRIPTIONS_WITH_AI, payload: data.data });
    } catch (error) {
      console.log(error);
      toast.error("Please fill and confirm Medical History!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

export const removePrescriptionsWithAI = () => async (dispatch) => {
  dispatch({ type: REMOVE_PRESCRIPTIONS_WITH_AI });
};

export const deleteInventoryItem = (itemId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.delete(
      `${API_URL}/inventory/items/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Item Deleted successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error Deleting inventory item:", error);

    toast.error("Error Deleting inventory item!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
};

export const updateInventoryItem = (itemId, itemData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.patch(
      `${API_URL}/inventory/items/${itemId}`,
      itemData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Item Updated successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error Updating inventory item:", error);

    toast.error("Error Updating inventory item!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
};

export const getAppointmentHistory = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAppointmentsHistory`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // console.log("Appointments History: ", data);

    dispatch({ type: GET_APPOINTMENT_HISTORY, payload: data.appointments });
  } catch (error) {
    console.error("Error Updating inventory item:", error);
  }
};

export const getAdmittedPatients = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/admittedPatients`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // console.log("Admitted Patients: ", data);

    dispatch({ type: GET_ADMITTED_PATIENTS, payload: data.patients });
  } catch (error) {
    console.error("Error getting admitted patients:", error);
  }
};

export const getProgressTrackerDetails = (patientId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_URL}/getProgressTracker/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("Progress Tracker: ", data);

    dispatch({ type: GET_PROGRESS_TRACKER, payload: data.progress });
  } catch (error) {
    console.error("Error getting progress details:", error);
  }
};

export const submitConsultation =
  (consultationData, onSuccess, onClose) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        `${API_URL}/submitConsultation`,
        consultationData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includes the token in the authorization header
          },
        }
      );

      // console.log("Consultation from Backend : ", data);

      dispatch({ type: SUBMIT_CONSULTATION, payload: data });

      // ✅ Safe function calls
      if (typeof onSuccess === "function") onSuccess();
      if (typeof onClose === "function") onClose();

      toast.success("Submitted Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Please Confirm all the fields!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

export const getAllDoctors = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getDoctorsByHospital`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // console.log("Doctors: ", data.doctors);

    dispatch({ type: GET_ALL_DOCTORS, payload: data.doctors });
  } catch (error) {
    console.error("Error getting admitted patients:", error);
  }
};

export const getAllDepartments = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAllDepartments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // console.log("Departments: ", data);

    dispatch({ type: GET_ALL_DEPARTMENTS, payload: data });
  } catch (error) {
    console.error("Error getting admitted patients:", error);
  }
};

export const createAdmissionRequest = (requestData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const doctor = localStorage.getItem("userId");

    const requestDataWithDoctor = {
      ...requestData,
      doctor, // add doctor into body
    };
    const { data } = await axios.post(
      `${API_URL}/createAdmissionRequest`,
      requestDataWithDoctor,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // dispatch({ type: CREATE_ADMISSION_REQUEST, payload: data.request });
    // return data.request;
    toast.success("Admission Request Created successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error(
      "Error creating admission request:",
      error.response?.data || error.message
    );

    throw error;
  }
};

export const getApprovedAdmissions = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/approvedAdmissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // console.log("Approved Admissions:", data);

    dispatch({ type: GET_APPROVED_ADMISSIONS, payload: data });
  } catch (error) {
    console.error("Error fetching approved admissions:", error);
  }
};
export const getAdmissionRequests =
  (status = "") =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/getAdmissionRequests`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: status ? { status } : {}, // Only send if provided
      });

      // console.log("Admission Requests:", data);

      dispatch({ type: GET_ADMISSION_REQUESTS, payload: data });
    } catch (error) {
      console.error("Error fetching admission requests:", error);
    }
  };

export const getAllUserConsultationForms = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/consultationForms`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // params: {
      //   patientId,
      //   doctorId
      // },
    });

    // console.log("Consultation Forms Received Successfully :", data);

    dispatch({ type: GET_ALL_USER_CONSULTATION_FORMS, payload: data.forms });
  } catch (error) {
    console.error("Error fetching forms:", error);
  }
};

export const createNewConsultationForm =
  (consultationFormData) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        `${API_URL}/consultationForms`,
        consultationFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includes the token in the authorization header
          },
        }
      );

      // console.log("Consultation Template Creation from Backend : ", data);
      dispatch({ type: CREATE_NEW_CONSULTATION_FORM, payload: data.form });
      toast.success("Form Template Created Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Template Creation Error!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

export const getPatientDetailsByID = (patientId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/${patientId}/details`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Patient Details Received Successfully :", data);

    dispatch({ type: GET_PATIENTS_DEATILS, payload: data.data });
  } catch (error) {
    console.error("Error fetching forms:", error);
  }
};

export const admitPatient = (requestId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/admitPatient/${requestId}`,
      {}, // empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("Patient Admitted Successfully", data);
    toast.success("Patient Admitted Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error Admitting patient:", error);
    toast.error(error?.response?.data?.message || "Admission failed");
  }
};

export const getPatientVitals = (patientId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_URL}/getVitalsByPatient/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Patient Vitals:", data);

    dispatch({ type: GET_PATIENTS_VITALS, payload: data.vitals });
  } catch (error) {
    console.error("Error getting Vitals:", error);
  }
};
// Action to POST vitals
export const recordPatientVitals = (vitalsPayload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { patient } = vitalsPayload;
    const { data } = await axios.post(
      `${API_URL}/recordVitals`,
      vitalsPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("vitals recorded", data);
    dispatch(getPatientVitals(patient));
  } catch (error) {
    console.error("Vitals POST error:", error);

    throw error;
  }
};

export const getPatientHistory = (patientId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(
      `${API_URL}/getPatientConsultationHistory/${patientId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("History:", data);
    dispatch({ type: GET_PATIENT_HISTORY, payload: data.history });
  } catch (error) {
    console.error("patient History not available:", error);

    throw error;
  }
};

export const getPatientMedicalRecords = (patientId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(
      `${API_URL}/getMedicalRecords/${patientId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("getMedicalRecords", data);
    dispatch({ type: GET_PATIENT_MEDICAL_RECORDS, payload: data.records });
  } catch (error) {
    console.error("patient History not available:", error);

    throw error;
  }
};
// Action to POST medicalrecords
export const addMedicalAdministration = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { patient } = payload;
    const { data } = await axios.post(`${API_URL}/addMedicalRecord`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("medicinal administration recorded", data);
    dispatch(getPatientMedicalRecords(patient));
  } catch (error) {
    console.error("Medicinal administration POST error:", error);

    throw error;
  }
};
export const updateMedicationAdministration = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/updateMedicationAction`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Update medicinal administration recorded", data);
    // dispatch(getPatientMedicalRecords(patient));
    toast.success("Updated Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Medicinal administration POST error:", error);

    throw error;
  }
};

export const getPatientBedInfo = (patientId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(
      `${API_URL}/patients/${patientId}/bed-info`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("BED INFO", data);
    dispatch({ type: GET_PATIENT_BED_INFO, payload: data });
  } catch (error) {
    console.error("patient BED  Info not available:", error);

    throw error;
  }
};

export const addProgressTrackerPhase =
  (payload, patientId) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.post(
        `${API_URL}/addProgressPhase`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(getProgressTrackerDetails(patientId));
      toast.success("progress added Successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Add progress phase POST error:", error);

      throw error;
    }
  };
export const dischargePatient = (payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/dischargePatient`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log(data);
    toast.success("Patient dischagred Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Patient dischagre error:", error);
    toast.error(err.message || "Something went wrong");
    throw error;
  }
};

import {
  ACCEPT_APPOINTMENT_REQUESTS,
  ADD_PAYMENT_TO_BILL,
  ADD_ROOM,
  ADD_TO_BILL,
  BOOK_APPOINTMENT,
  DELETE_ROOM,
  EDIT_BILL,
  GET_ALL_DEPARTMENTS,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_BILL_BY_ID,
  GET_BILL_DETAILS,
  GET_BILLS,
  GET_COMPLETED_APPOINTMENTS,
  GET_DEPARTMENT_BY_ID,
  GET_DOCTORS,
  GET_DOCTORS_BY_DEPARTMENT,
  GET_FILTERED_APPOINTMENTS,
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
  GET_ROOMS,
  GET_SCHEDULED_APPOINTMENTS,
  GET_SERVICES_BY_DEPARTMENT_ID,
  GET_STAFFS,
  GET_WAITING_APPOINTMENTS,
  LOADING_FILTERED_INPATIENTS,
  LOADING_PATIENTS,
  REJECT_APPOINTMENT_REQUESTS,
  REMOVE_BOOK_APPOINTMENT_DATA,
  SET_LOADING_APPOINTMENTS,
  START_CONSULTATION,
  SUBMIT_CONSULTATION,
  UPDATE_PATIENT,
  UPLOAD_PATIENT_FILE,
} from "./ActionType.js";
import axios from "axios";
import { API_URL } from "../../Config/api.js";
import { toast } from "react-toastify";

// Action to update a room
export const updateRoom = (roomId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.put(`${API_URL}/${roomId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    // dispatch({ type: UPDATE_ROOM, payload: data });
    dispatch(getRooms());
    toast.success("Room Updated Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error updating room:", error);
    toast.error("Room Updation Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

// Action to delete a room
export const deleteRoom = (roomId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(`${API_URL}/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: DELETE_ROOM, payload: data });
    // dispatch(getRooms());
    toast.success("Room Deleted Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error deleting room:", error);
    toast.error("Room Deletion Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const getPatients = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getPatientsByHospital`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Dispatching",data)

    dispatch({ type: GET_PATIENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredPatients =
  (filteredData, page, rowsPerPage, search) => async (dispatch) => {
    // console.log("Fil:",filteredData)
    try {
      dispatch({ type: LOADING_PATIENTS, payload: true });
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/getPatientsByStatus`, {
        params: {
          status: filteredData.status,
          typeVisit: filteredData.type,
          sort: filteredData.sort,
          page: page + 1,
          limit: rowsPerPage,
          search: search,
        }, // Sending status as a query parameter
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      });

      // console.log("Filtered Data: ",data)

      dispatch({ type: GET_FILTERED_PATIENTS, payload: data });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: LOADING_PATIENTS, payload: false });
    }
  };

export const getPatientDetailsById = (patientId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/${patientId}/details`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Patient Data: ",data)

    dispatch({ type: GET_PATIENT_DETAILS, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const getDoctors = (page, rowsPerPage) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getDoctorsByHospital`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
      params: {
        page: page + 1,
        limit: rowsPerPage,
      },
    });

    dispatch({ type: GET_DOCTORS, payload: data });
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

    // console.log("InPatt: ", data);
    dispatch({ type: GET_INPATIENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredInpatients =
  (filteredData, page, rowsPerPage, search) => async (dispatch) => {
    // console.log("Fil:",filteredData)
    try {
      dispatch({ type: "LOADING_FILTERED_INPATIENTS", payload: true });
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/getInPatients`, {
        params: {
          status: filteredData.status,
          sort: filteredData.sort,
          page: page + 1,
          limit: rowsPerPage,
          search: search,
        }, // Sending status as a query parameter
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      });

      // console.log("InPatt Filtered: ",data)
      dispatch({ type: GET_FILTERED_INPATIENTS, payload: data });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: LOADING_FILTERED_INPATIENTS, payload: false });
    }
  };
export const getStaffs = (page, rowsPerPage) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getStaff`, {
      params: {
        page: page + 1,
        limit: rowsPerPage,
      },
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_STAFFS, payload: data });
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

    // console.log("Rooms: ",data)

    dispatch({ type: GET_ROOMS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredRooms = (page, rowsPerPage) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getRoomsByHospital`, {
      params: {
        page: page + 1,
        limit: rowsPerPage,
      },
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Rooms: ",data)

    dispatch({ type: GET_FILTERED_ROOMS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addRoom = (roomData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addRoom`, roomData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: ADD_ROOM, payload: data });
    // dispatch(getRooms());
    toast.success("Room Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Adding Room Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const getAllDepartments = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAllDepartments`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_ALL_DEPARTMENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getDepartmentById = (departmentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_URL}/getDepartments/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

    dispatch({ type: GET_DEPARTMENT_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getServicesByDepartmentId = (departmentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_URL}/getservicesbydep/${departmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

    // console.log("Services: ",data)
    dispatch({ type: GET_SERVICES_BY_DEPARTMENT_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const bookAppointment = (appData, onClose) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/bookAppointment`, appData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // dispatch(getAppointments("Scheduled"));

    dispatch({ type: BOOK_APPOINTMENT, payload: data });
    // console.log("Booked: ",data)
  } catch (error) {
    console.log(error);

    // Safely get message from backend or fallback
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    toast.error(message, {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  }
};

export const rescheduleAppointmentToday = (appData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/repositionToken`, appData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Data: ",data)

    toast.success("Appointment rescheduled", {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  } catch (error) {
    console.log(error);

    // Safely get message from backend or fallback
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    toast.error(message, {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  }
};

export const rescheduleAppointment = (appData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/bookAppointment`, appData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    console.log("Rescheduled: ", data);

    toast.success("Appointment rescheduled", {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  } catch (error) {
    console.log(error);

    // Safely get message from backend or fallback
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    toast.error(message, {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  }
};
export const cancelAppointment = (appointmentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/cancelAppointment/${appointmentId}`,
      appointmentId,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );
    // console.log("App. Cancelled : ",data)
    toast.success("Appointment Cancelled Successfully", {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  } catch (error) {
    console.log(error);

    // Safely get message from backend or fallback
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    toast.error(message, {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  }
};

export const removeBookAppointmentData = () => async (dispatch) => {
  dispatch({ type: REMOVE_BOOK_APPOINTMENT_DATA });
};

export const getAppointments =
  (activeLabel, startDate, endDate, selectedBranch, page, rowsPerPage) =>
  async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING_APPOINTMENTS, payload: true });

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

      // console.log("Appointments: ", data);

      dispatch({ type: GET_APPOINTMENTS, payload: data });

      dispatch({ type: SET_LOADING_APPOINTMENTS, payload: false });
      // console.log("DA: ",data)

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
      } else if (
        data.message === "completed appointments retrieved successfully"
      ) {
        dispatch({ type: GET_COMPLETED_APPOINTMENTS, payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getFilteredAppointments =
  (activeLabel, departmentId) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/getFilteredAppointments`, {
        params: { status: activeLabel, departmentId: departmentId }, // Sending status as a query parameter
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      });

      console.log("Filtered appointments: ", data);

      dispatch({ type: GET_FILTERED_APPOINTMENTS, payload: data });

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

export const getRequestedAppointments = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getRequestedAppointments`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_APPOINTMENT_REQUESTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const acceptAppointmentRequests = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/approveAppointment/${id}`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

    dispatch({ type: ACCEPT_APPOINTMENT_REQUESTS, payload: id });
    // console.log("Request Accepted Successfully :",data)
  } catch (error) {
    console.log(error);
  }
};

export const rejectAppointmentRequests = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/rejectAppointment/${id}`,
      id,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

    dispatch({ type: REJECT_APPOINTMENT_REQUESTS, payload: id });
    // console.log("Request Rejected Successfully :",data)
  } catch (error) {
    console.log(error);
  }
};

export const getBills = (page, rowsPerPage, search) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAllBills`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
      params: {
        page: page + 1, // Incrementing page by 1 to match the API requirement
        limit: rowsPerPage,
        search: search || "",
      },
    });

    dispatch({ type: GET_BILLS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getBillById = (billId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getBillDetails/${billId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_BILL_BY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getDoctorsByDepartment = (departId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_URL}/getDoctorsByDepartment/${departId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

    dispatch({ type: GET_DOCTORS_BY_DEPARTMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const fetchDoctorsByDepartment =
  (selectedValue, page, rowsPerPage) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        `${API_URL}/getDoctorsByDepartment/${selectedValue}`,

        {
          params: {
            page: page + 1, // Incrementing page by 1 to match the API requirement
            limit: rowsPerPage,
          },
          headers: {
            Authorization: `Bearer ${token}`, // Includes the token in the authorization header
          },
        }
      );

      dispatch({ type: GET_FILTERED_DOCTORS, payload: data });
    } catch (error) {
      console.error(
        "Error filtering doctor:",
        error.response?.data || error.message
      );

      toast.error("Error  filtering Doctor!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    }
  };
export const updatePatient = (patientId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.put(`${API_URL}/${patientId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: UPDATE_PATIENT, payload: data.resource });
    toast.success("Patient Status Updated Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error updating Patient:", error);
    toast.error(" Patient Updation Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const getProgressTrackerDetails =
  (patientId, caseId) => async (dispatch) => {
    //console.log("Params:", patientId + " " + caseId);
    try {
      const token = localStorage.getItem("jwt");
      // console.log("this is action of progress tracker");

      const { data } = await axios.get(
        `${API_URL}/getProgressTracker/${patientId}/${caseId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      //console.log("Progress Tracker: ", data);

      dispatch({ type: GET_PROGRESS_TRACKER, payload: data.progress });
    } catch (error) {
      console.error("Error getting progress details:", error);
    }
  };

export const getBillsByPatientId = (patientId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.get(
      `${API_URL}/getBillsByPatient/${patientId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Bill INFO", data);
    dispatch({ type: GET_PATIENT_BILLS, payload: data.bills });
  } catch (error) {
    console.error("patient Bill Info not available:", error);
    dispatch({ type: GET_PATIENT_BILLS, payload: [] });
    throw error;
  }
};

export const startConsultation = (patientId) => async (dispatch) => {
  // console.log("Pat: ", patientId);
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/setOngoing`,
      { patientId },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );

    console.log("Ongoing app. successful : ", data);

    dispatch({ type: START_CONSULTATION, payload: data });
    return Promise.resolve(data); // 🔑 return promise
  } catch (error) {
    console.log(error);
    return Promise.reject(error); // 🔑 return promise
  }
};

export const submitConsultation = (consultationData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const formData = new FormData();

    const isPrimitive = (v) =>
      v === null ? false : ["string", "number", "boolean"].includes(typeof v);

    // Append all fields; treat only `files` specially
    Object.entries(consultationData || {}).forEach(([key, value]) => {
      if (key === "files" && Array.isArray(value)) {
        // append up to 5 images as `files`
        value.slice(0, 5).forEach((file, idx) => {
          if (file)
            formData.append("files", file, file.name || `file_${idx + 1}`);
        });
        return;
      }

      if (value === undefined || value === null) return;

      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (isPrimitive(value)) {
        formData.append(key, String(value));
      } else {
        // objects/arrays → stringify so backend can JSON.parse
        formData.append(key, JSON.stringify(value));
      }
    });

    const { data } = await axios.post(
      `${API_URL}/submitConsultation`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type; browser will set multipart boundary.
        },
      }
    );

    dispatch({ type: SUBMIT_CONSULTATION, payload: data });

    toast.success("Submitted Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
    return data;
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Please confirm all the fields!";
    toast.error(msg, { position: "bottom-right", autoClose: 2000 });
    throw error;
  }
};
export const addToBill = (payload, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addToBill/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Edit Bill Response:", data);
    dispatch({ type: ADD_TO_BILL, payload: data });
    toast.success("Added to bill successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error adding to bill:", error);
    toast.error(error?.response?.data?.message || "Add failed");
  }
};
export const editBill = (payload, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.patch(
      `${API_URL}/editBillDetails/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: EDIT_BILL, payload: data });
    // console.log("Edit Bill Response:", data);
    toast.success("Bill edited successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error editing bill:", error);
    toast.error(error?.response?.data?.message || "Edit failed");
  }
};

export const uploadPatientFile = (formData) => async (dispatch) => {
  // console.log("Pat: ", patientId);
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        "Content-Type": "multipart/form-data", // Ensure this is set
      },
    });

    toast.success("File Uploaded Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 1500,
    });
    // console.log("File Send Successfully : ", data.data);

    // dispatch({ type: UPLOAD_PATIENT_FILE, payload: data.data[0] });
  } catch (error) {
    console.log(error);
    toast.error("File Deletion Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const getPatientFiles = (patientId) => async (dispatch) => {
  // console.log("Pat: ", patientId);
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/files/patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        "Content-Type": "multipart/form-data", // Ensure this is set
      },
    });

    // console.log("Files Got : ", data.data);

    dispatch({ type: GET_PATIENT_FILES, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePatientFile = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.delete(`${API_URL}/files/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    toast.success("File Deleted Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 1500,
    });
    // console.log("File Deleted Successfully : ", data);
  } catch (error) {
    console.log(error);
    toast.error("File Deletion Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};
// BILLING
export const getBillDetails = (billId) => async (dispatch) => {
  // console.log("Fetching details for bill ID:", billId);

  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getBillDetails/${billId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    // console.log("Bill Details: ", data);

    dispatch({ type: GET_BILL_DETAILS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const addPaymentToBill = (billId, paymentData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.post(
      `${API_URL}/addPayment/${billId}`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Payment Response: ", data);
    dispatch({ type: ADD_PAYMENT_TO_BILL, payload: data });
    toast.success("Payment added successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
    // Optionally refresh bill details
    // dispatch(getBillDetails(billId));
  } catch (error) {
    console.error("Error adding payment to bill:", error);
    toast.error("Failed to add payment. Please try again.", {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
};

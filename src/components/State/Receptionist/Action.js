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
  GET_FILTERED_APPOINTMENTS,
  GET_FILTERED_DOCTORS,
  GET_FILTERED_PATIENTS,
  GET_ONGOING_APPOINTMENTS,
  GET_PATIENTS,
  GET_ROOMS,
  GET_SCHEDULED_APPOINTMENTS,
  GET_STAFFS,
  GET_WAITING_APPOINTMENTS,
  REJECT_APPOINTMENT_REQUESTS,
  REMOVE_BOOK_APPOINTMENT_DATA,
} from "./ActionType.js";
import axios from "axios";
import { API_URL } from "../../Config/api.js";
import { toast } from "react-toastify";
import { selectClasses } from "@mui/material";

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

export const getFilteredPatients = (filteredData) => async (dispatch) => {
  // console.log("Fil:",filteredData)
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getPatientsByStatus`, {
      params: { status: filteredData.status, typeVisit: filteredData.type }, // Sending status as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Filtered Data: ",data)

    dispatch({ type: GET_FILTERED_PATIENTS, payload: data });
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

    dispatch({ type: GET_ROOMS, payload: data });
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
    toast.error("Failed to book appointment. Please try again!", {
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
      } else {
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

export const getBills = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAllBills`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
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

    dispatch(getFilteredPatients());
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

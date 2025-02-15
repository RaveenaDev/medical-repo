import axios from "axios";
import { API_URL } from "../../Config/api.js";
import {
  ADD_ROOM,
  ADD_STAFFS,
  DELETE_ROOM,
  DELETE_STAFFS,
  GET_ALL_DEPARTMENTS,
  GET_APPOINTMENT_REQUESTS,
  GET_APPOINTMENTS,
  GET_DEPARTMENT_BY_ID,
  GET_DOCTORS,
  GET_EARNINGS,
  GET_PATIENTS,
  GET_REJECTED_APPOINTMENTS,
  GET_ROOMS,
  GET_STAFFS,
  UPDATE_ROOM,
} from "./ActionType.js";

export const getEarnings = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getDoctorsByHospital`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_EARNINGS, payload: data });
    console.log("Earnings route working :", data);
  } catch (error) {
    console.log(error);
  }
};

export const getDoctors = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getDoctorsByHospital`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_DOCTORS, payload: data });
    console.log("Doctor route working :", data);
  } catch (error) {
    console.log(error);
  }
};

export const getStaffs = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getStaff`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_STAFFS, payload: data });
    console.log("Staff route working :", data);
  } catch (error) {
    console.log(error);
  }
};

export const getRooms = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getRooms`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_ROOMS, payload: data });
    console.log("Room route working :", data);
  } catch (error) {
    console.log(error);
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
    console.log("Departments route working :", data);
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
    console.log("Department by Id route working :", data);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointments = (activeLabel) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAppointmentsByStatus`, {
      params: { status: activeLabel }, // Sending status as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_APPOINTMENTS, payload: data });
    console.log("Appointments by status route working :", data);
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

    dispatch({ type: GET_APPOINTMENT_REQUESTS, payload: data });
    console.log("Appointment Requests route working :", data);
  } catch (error) {
    console.log(error);
  }
};

export const getRejectedAppointments = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getRejectedAppointments`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_REJECTED_APPOINTMENTS, payload: data });
    console.log("Rejected Appointment route working :", data);
  } catch (error) {
    console.log(error);
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

    dispatch({ type: GET_PATIENTS, payload: data });
    console.log("Patients route working :", data);
  } catch (error) {
    console.log(error);
  }
};

// ADD ROOMS

export const addRoom = (roomData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    console.log("Data from action to Backend", roomData);

    const { data } = await axios.post(`${API_URL}/addRoom`, roomData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: ADD_ROOM, payload: data });
    dispatch(getRooms());
    console.log("Room creation route working :", data);
  } catch (error) {
    console.log(error);
  }
};
// Action to update a room
export const updateRoom = (roomId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    console.log("Editng room id: ", roomId);
    const { data } = await axios.put(`${API_URL}/${roomId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    dispatch({ type: UPDATE_ROOM, payload: data });
    console.log("Room EDIT route working :", data);
    dispatch(getRooms());
  } catch (error) {
    console.error("Error updating room:", error);
  }
};

// Action to delete a room
export const deleteRoom = (roomId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    console.log("Deleting room id: ", roomId);
    const { data } = await axios.delete(`${API_URL}/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: DELETE_ROOM, payload: roomId });
    console.log("Room DELETION route working :", data);
    dispatch(getRooms());
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};

// ADD STAFFS

export const addStaff = (staffData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    console.log("Data from action to Backend", staffData);

    const { data } = await axios.post(`${API_URL}/addStaff`, staffData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: ADD_STAFFS, payload: data });
    dispatch(getStaffs());
    console.log("Staff creation route working :", data);
  } catch (error) {
    console.log(error);
  }
};
// Action to delete a STaFF
export const deleteStaff = (StaffId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    console.log("Deleting room id: ", StaffId);
    const { data } = await axios.delete(`${API_URL}/${StaffId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: DELETE_STAFFS, payload: StaffId });
    console.log("STAFF DELETION route working :", data);
    dispatch(getStaffs());
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};

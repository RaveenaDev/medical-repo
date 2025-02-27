import axios from "axios";
import { API_URL } from "../../Config/api.js";
import {
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
  GET_DEPARTMENT_BY_ID,
  GET_DOCTORS,
  GET_EARNINGS,
  GET_EXPENSES,
  GET_PATIENTS,
  GET_REJECTED_APPOINTMENTS,
  GET_ROOMS,
  GET_SERVICES,
  GET_STAFFS,
  UPDATE_DOCTORS,
  UPDATE_EXPENSE,
  UPDATE_ROOM,
  UPDATE_SERVICE,
  UPDATE_STAFFS,
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
  } catch (error) {
    console.log(error);
  }
};
export const addDoctor = (doctorData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.post(`${API_URL}/register`, doctorData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADD_DOCTORS, payload: response.data });
  } catch (error) {
    console.error(
      "Error adding doctor:",
      error.response?.data || error.message
    );
  }
};
// Action to update a Doctor
export const updateDoctor = (doctorId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.put(`${API_URL}/${doctorId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    dispatch({ type: UPDATE_DOCTORS, payload: data });
  } catch (error) {
    console.error("Error updating doctor:", error);
  }
};

export const deleteDoctor = (doctorId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(`${API_URL}/${doctorId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    dispatch({ type: DELETE_DOCTORS, payload: data });
  } catch (error) {
    console.error("Error deleting Doctor:", error);
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
  } catch (error) {
    console.log(error);
  }
};

// ADD ROOMS

export const addRoom = (roomData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addRoom`, roomData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: ADD_ROOM, payload: data });
  } catch (error) {
    console.log(error);
  }
};
// Action to update a room
export const updateRoom = (roomId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.put(`${API_URL}/${roomId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    dispatch(getRooms());
    // dispatch({ type: UPDATE_ROOM, payload: data });
  } catch (error) {
    console.error("Error updating room:", error);
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
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};

// ADD STAFFS

export const addStaff = (staffData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addStaff`, staffData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: ADD_STAFFS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
// Action to delete a STaFF
export const deleteStaff = (StaffId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(`${API_URL}/${StaffId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: DELETE_STAFFS, payload: data });
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};

// Action to update a Staff
export const updateStaff = (StaffId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.put(`${API_URL}/${StaffId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    // dispatch({ type: UPDATE_STAFFS, payload: data });
    dispatch(getStaffs());
  } catch (error) {
    console.error("Error updating room:", error);
  }
};

export const getExpenses = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getExpenses`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_EXPENSES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addExpense = (exp) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addExpense`, exp, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: ADD_EXPENSE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateExpense = (expenseId, updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.put(`${API_URL}/${expenseId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    dispatch({ type: UPDATE_EXPENSE, payload: data });
  } catch (error) {
    console.error("Error updating expense:", error);
  }
};

export const deleteExpense = (expenseId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(`${API_URL}/${expenseId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    dispatch({ type: DELETE_EXPENSE, payload: data });
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

// BILLING
export const getBillingRecords = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAllBills`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_BILLING_RECORDS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// BILLING
export const getBillDetails = (billId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getBillDetails/${billId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_BILL_DETAILS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getServices = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getServices`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_SERVICES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addService = (serviceData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addService`, serviceData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: ADD_SERVICE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateService = (updatedData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.put(
      `${API_URL}/editService/edit`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );
    dispatch({ type: UPDATE_SERVICE, payload: data });
    console.log("Edit Service Working:",data)
    dispatch(getServices())
  } catch (error) {
    console.error("Error updating service:", error);
  }
};

export const deleteServiceCategory =
  (serviceId, categoryId) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.delete(
        `${API_URL}/deleteSubcategory/${serviceId}/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includes the token in the authorization header
          },
        }
      );
      dispatch({
        type: DELETE_SERVICE_CATEGORY,
        payload: { serviceId, categoryId },
      });
    } catch (error) {
      console.error("Error deleting category service:", error);
    }
  };

export const deleteService = (serviceId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(
      `${API_URL}/deleteService/delete/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      }
    );
    dispatch({ type: DELETE_SERVICE, payload: serviceId });
  } catch (error) {
    console.error("Error deleting service:", error);
  }
};

// GET APPOINTMENTS COUNTS FOR GRAPHS

export const getAppointmentCounts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAppointmentCounts`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_APPOINTMENT_COUNTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

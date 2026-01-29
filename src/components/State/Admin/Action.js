import axios from "axios";
import { API_URL } from "../../Config/api.js";
import {
  ACCEPT_REQUEST,
  ADD_DOCTORS,
  ADD_EXPENSE,
  ADD_INSURANCE_COMPANY,
  ADD_PAYMENT_TO_BILL,
  ADD_ROOM,
  ADD_SERVICE,
  ADD_SERVICE_TO_COMPANY,
  ADD_STAFFS,
  ADD_TO_BILL,
  CLEAR_SERVICE_SUBCATEGORIES,
  DELETE_DOCTORS,
  DELETE_EXPENSE,
  DELETE_ROOM,
  DELETE_SERVICE,
  DELETE_SERVICE_CATEGORY,
  DELETE_STAFFS,
  DELETE_TPA_SERVICE,
  DELETE_TPA_SERVICE_CATEGORY,
  EDIT_BED_SUCCESS,
  EDIT_BILL,
  EDIT_ESTIMATED_BILL,
  EDIT_INSURED_PATIENT,
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
  UPDATE_SERVICE,
  UPDATE_STATUS_OF_INSURED_PATIENTS,
} from "./ActionType.js";

import { toast } from "react-toastify";

export const getEarnings =
  (params = {}) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/reports/doctors/earnings`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: GET_EARNINGS,
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("Get earnings error:", error);
      throw error;
    }
  };
export const getGraphData =
  (params = {}) =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/earningsOverviewReport`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data);
      dispatch({
        type: GET_EARNINGS_GRAPH,
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("Get earnings graph error:", error);
      throw error;
    }
  };

export const getDoctors = (page, rowsPerPage) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_DOCTORS", payload: true });
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getDoctorsByHospital`, {
      params: {
        page: page + 1,
        limit: rowsPerPage,
      },
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_DOCTORS, payload: data });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: "LOADING_DOCTORS", payload: false });
  }
};
export const fetchDoctorsByDepartment =
  (selectedValue, page, rowsPerPage) => async (dispatch) => {
    try {
      dispatch({ type: "LOADING_DOCTORS", payload: true });
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
        },
      );

      dispatch({ type: GET_FILTERED_DOCTORS, payload: data });
    } catch (error) {
      console.error(
        "Error filtering doctor:",
        error.response?.data || error.message,
      );

      toast.error("Error  filtering Doctor!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    } finally {
      dispatch({ type: "LOADING_DOCTORS", payload: false });
    }
  };
export const addDoctor = (doctorData) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_DOCTORS", payload: true });
    const token = localStorage.getItem("jwt");

    const hospitalName = localStorage.getItem("hospitalName");

    const payload = { ...doctorData, hospitalName: hospitalName };

    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const response = await axios.post(`${API_URL}/register`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch(getDoctors());

    toast.success("Doctor Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error(
      "Error adding doctor:",
      error.response?.data || error.message,
    );

    toast.error("Error adding Doctor!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } finally {
    dispatch({ type: "LOADING_DOCTORS", payload: false });
  }
};
// Action to update a Doctor
export const updateDoctor = (doctorId, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_DOCTORS", payload: true });
    const token = localStorage.getItem("jwt");

    const { data } = await axios.put(`${API_URL}/${doctorId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    dispatch(getDoctors());

    toast.success("Doctor Updated Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    toast.error("Error updating Doctor!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } finally {
    dispatch({ type: "LOADING_DOCTORS", payload: false });
  }
};

export const deleteDoctor = (doctorId) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_DOCTORS", payload: true });
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(`${API_URL}/${doctorId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    dispatch(getDoctors());
    toast.success("Doctor Deleted Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error deleting Doctor:", error);
    toast.error("Error updating Doctor!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } finally {
    dispatch({ type: "LOADING_DOCTORS", payload: false });
  }
};

export const getStaffs = (page, rowsPerPage) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_STAFFS", payload: true });
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
  } finally {
    dispatch({ type: "LOADING_STAFFS", payload: false });
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

    // console.log("Rooms: ", data);
    dispatch({ type: GET_ROOMS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getFilteredRooms = (page, rowsPerPage) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_ROOMS", payload: true });
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

    // console.log("Rooms: ", data);
    dispatch({ type: GET_FILTERED_ROOMS, payload: data });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: "LOADING_ROOMS", payload: false });
  }
};

// ADD ROOMS

export const addRoom = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_ROOMS", payload: true });
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addRoom`, roomData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: ADD_ROOM, payload: data });

    dispatch(getFilteredRooms());
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
  } finally {
    dispatch({ type: "LOADING_ROOMS", payload: false });
  }
};
// Action to update a room
export const updateRoom = (roomId, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_ROOMS", payload: true });
    const token = localStorage.getItem("jwt");

    const { data } = await axios.put(`${API_URL}/${roomId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Updated room:", data);
    dispatch(getFilteredRooms());
    toast.success("Room Updated Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
    // dispatch({ type: UPDATE_ROOM, payload: data });
  } catch (error) {
    console.error("Error updating room:", error);
    toast.error("Updating Room Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } finally {
    dispatch({ type: "LOADING_ROOMS", payload: false });
  }
};

// Action to delete a room
export const deleteRoom = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_ROOMS", payload: true });
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(`${API_URL}/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: DELETE_ROOM, payload: data });
    dispatch(getFilteredRooms());
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
  } finally {
    dispatch({ type: "LOADING_ROOMS", payload: false });
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
      },
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
      },
    );

    // console.log("Services: ",data)
    dispatch({ type: GET_SERVICES_BY_DEPARTMENT_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addDepartment = (department) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addDepartments`, department, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Payload: ",department)
    // console.log("Response: ", data);
    toast.success("Department Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });

    dispatch(getAllDepartments());
    // dispatch({ type: ADD_DEPARTMENT, payload: data.department });
  } catch (error) {
    console.log(error);
    toast.error("Error while adding Department!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
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

// ADD STAFFS

export const addStaff = (staffData) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_STAFFS", payload: true });
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addStaff`, staffData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: ADD_STAFFS, payload: data });
    toast.success("Staff Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Adding Staff Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } finally {
    dispatch({ type: "LOADING_STAFFS", payload: false });
  }
};
// Action to delete a STaFF
export const deleteStaff = (StaffId) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_STAFFS", payload: true });
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(`${API_URL}/${StaffId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: DELETE_STAFFS, payload: data });
    toast.success("Staff Deleted Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error deleting room:", error);
    toast.error("Staff Deletion Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } finally {
    dispatch({ type: "LOADING_STAFFS", payload: false });
  }
};

// Action to update a Staff
export const updateStaff = (StaffId, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_STAFFS", payload: true });
    const token = localStorage.getItem("jwt");
    const { data } = await axios.put(`${API_URL}/${StaffId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });
    // dispatch({ type: UPDATE_STAFFS, payload: data });
    dispatch(getStaffs());
    toast.success("Staff Updated Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error updating room:", error);
    toast.error("Staff Updation Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } finally {
    dispatch({ type: "LOADING_STAFFS", payload: false });
  }
};

export const getExpenses = (page, rowsPerPage) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getExpenses`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
      params: {
        page: page + 1,
        limit: rowsPerPage,
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

    toast.success("Expense Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Adding Expense Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
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
    toast.success("Expense Updates Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error updating expense:", error);
    toast.error("Updating Expense Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
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
    toast.success("Expense Deleted Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    toast.error("Expense Deletion Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

// BILLING
export const getBillingRecords =
  (page, rowsPerPage, search) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/getAllBills`, {
        params: {
          page: page + 1, // Incrementing page by 1 to match the API requirement
          limit: rowsPerPage,
          search: search || "", // Default to empty string if search is undefined
        },
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      });
      // console.log("Billing Records: ", data);

      dispatch({ type: GET_BILLING_RECORDS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getServices = (departmentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getServices`, {
      params: {
        departmentId: departmentId,
      },
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

    // console.log(data);
    dispatch({ type: ADD_SERVICE, payload: data });
    toast.success("Service Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Service Addition Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const updateService = (updatedData, serviceId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.put(
      `${API_URL}/editService/edit/${serviceId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      },
    );
    // console.log("Updated Service Data:", data);
    dispatch({ type: UPDATE_SERVICE, payload: data });
    dispatch(getServices());
    toast.success("Service Edited Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    toast.error("Service Updation Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
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
        },
      );
      dispatch({
        type: DELETE_SERVICE_CATEGORY,
        payload: { serviceId, categoryId },
      });
      toast.success("Service Category Deleted Successfully!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting category service:", error);
      toast.error("Service Category Deletion Error!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
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
      },
    );
    dispatch({ type: DELETE_SERVICE, payload: serviceId });
    toast.success("Service Deleted Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    toast.error("Service Deletion Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

// GET APPOINTMENTS COUNTS FOR GRAPHS

export const getAppointmentCounts =
  (selectedDepartment) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/getAppointmentCounts`, {
        params: {
          department: selectedDepartment,
        },
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      });

      dispatch({ type: GET_APPOINTMENT_COUNTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const updatePatient =
  (patientId, updatedData, filters) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.put(`${API_URL}/${patientId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      });

      dispatch(getFilteredPatients(filters));
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
export const getAdmissionRequestsToApprove =
  (status = "") =>
  async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/getAdmissionRequests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: status ? { status } : {}, // Only send if provided
      });

      // console.log("Admission Requests:", data);

      dispatch({ type: GET_ADMISSION_REQUESTS_FOR_APPROVAL, payload: data });
    } catch (error) {
      console.error("Error fetching admission requests:", error);
    }
  };
export const approveAdmissionRequestsAdmin =
  (requestId, signature) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.put(
        `${API_URL}/approveAdmissionRequest/${requestId}`,
        { signature }, // send base64 signature
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // console.log("Approval Response:", data);
      toast.success("Approval submitted successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });

      // Optional: dispatch to refresh data
      dispatch(getAdmissionRequestsToApprove("Pending"));
    } catch (error) {
      console.error("Error approving admission request:", error);
      // Check for specific error code (413)
      if (error?.response?.status === 413) {
        toast.error(
          "The image being sent is too large. Please reduce the size and try again.",
        );
      } else {
        // Generic error message for other types of errors
        toast.error(error?.response?.data?.message || "Approval failed");
      }
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
      },
    );
    // console.log("Edit Bill Response:", data);
    toast.success("Bill edited successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });

    dispatch({ type: EDIT_BILL, payload: data });
  } catch (error) {
    console.error("Error editing bill:", error);
    toast.error(error?.response?.data?.message || "Edit failed");
  }
};

export const deleteBillItem = (billId, serviceId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(
      `${API_URL}/deleteBillServiceEntry/${billId}/services/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      },
    );

    dispatch(getBillDetails(billId));

    toast.success("Bill Item Deleted Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Failed to delete Bill Item:", error);
    toast.error("Failed to delete Bill Item!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
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
    toast.success("Added to bill successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });

    // Optional: dispatch to refresh data
    dispatch(getBillDetails(id));

    // dispatch(getBillingRecords());
  } catch (error) {
    console.error("Error adding to bill:", error);
    toast.error(error?.response?.data?.message || "Add failed");
  }
};
export const searchServiceSubCategories = (query) => async (dispatch) => {
  try {
    if (!query || query.length < 2) {
      dispatch({ type: CLEAR_SERVICE_SUBCATEGORIES });
      return;
    }

    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/searchServiceSubCategories`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Search Results:", data);

    dispatch({
      type: SEARCH_SERVICE_SUBCATEGORIES,
      payload: data?.results || [],
    });
  } catch (error) {
    console.error("Search service subcategories error:", error);
    dispatch({
      type: SEARCH_SERVICE_SUBCATEGORIES,
      payload: [],
    });
  }
};
export const refundBill = (payload, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/refundBill/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // dispatch({ type: ADD_TO_BILL, payload: data });
    console.log("REFUND Bill Response:", data);
    toast.success("Bill refunded successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });

    //  dispatch to refresh data
    dispatch(getBillDetails(id));
  } catch (error) {
    console.error("Error refunding bill:", error);
    toast.error(error?.response?.data?.message || "Add failed");
  }
};
export const addDiscount = (payload, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/applyDiscount/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log("Discount Bill Response:", data);

    toast.success("Discount added to bill successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error adding Discount to bill:", error);
    toast.error(error?.response?.data?.message || "Add failed");
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
      },
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

export const acceptRequest = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/requests/${id}/accept`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    console.log("Request Accepted : ", data);

    dispatch({ type: ACCEPT_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getInsuredPatients = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_URL}/getAdmissionRequestsWithInsurance`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      },
    );

    // console.log("Data: ",data)

    dispatch({ type: GET_INSURED_PATIENTS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_INSURED_PATIENTS,
      payload: { data: [] },
    });
  }
};

export const updateStatusOfInsuredPatients =
  (admissionId, payload) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.put(
        `${API_URL}/updateInsuranceStatus/${admissionId}`,
        {
          insuranceApproved: payload.status,
          amountApproved: payload.approvedAmount,
          discount: payload.discount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includes the token in the authorization header
          },
        },
      );

      console.log("Updated Data: ", data);

      dispatch({ type: UPDATE_STATUS_OF_INSURED_PATIENTS, payload: data });
      dispatch(getInsuredPatients());

      toast.success("Patient Status Updated Successfully!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(" Patient Updation Error!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    }
  };

export const editInsuredPatients =
  (admissionId, payload) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.patch(
        `${API_URL}/updateAdmissionInsuranceDetails/${admissionId}`,
        {
          ...payload,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includes the token in the authorization header
          },
        },
      );

      // console.log("Updated Data: ",data)

      dispatch({ type: EDIT_INSURED_PATIENT, payload: data });
      dispatch(getInsuredPatients());

      toast.success("Patient Edited Successfully!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error(" Patient Edit Error!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    }
  };

export const getInsuranceCompanies = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getInsuranceCompanies`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Insurance Companies : ", data);

    dispatch({ type: GET_INSURANCE_COMPANIES, payload: data });
  } catch (error) {
    console.log(error);

    dispatch({ type: GET_INSURANCE_COMPANIES, payload: { companies: 0 } });
  }
};

export const addInsuranceCompany = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/addInsuranceCompany`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      },
    );

    // console.log("Insurance Company Added : ",data)

    dispatch({ type: ADD_INSURANCE_COMPANY, payload: data.company });
    toast.success("Company Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Company Addition Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const addServiceToCompany = (id, serviceData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/addServiceToCompany/${id}`,
      serviceData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      },
    );

    // console.log("Service Added To Company : ",data)

    dispatch({ type: ADD_SERVICE_TO_COMPANY, payload: data.company });
    toast.success("Service Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Service Addition Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const deleteTPAServiceCategory =
  (companyId, serviceId, categoryId) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.delete(
        `${API_URL}/deleteCategory/${companyId}/${serviceId}/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includes the token in the authorization header
          },
        },
      );
      dispatch({
        type: DELETE_TPA_SERVICE_CATEGORY,
        payload: { companyId, serviceId, categoryId },
      });
      toast.success("Service Category Deleted Successfully!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error deleting category service:", error);
      toast.error("Service Category Deletion Error!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    }
  };

export const deleteTPAService = (companyId, serviceId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.delete(
      `${API_URL}/deleteAllCategories/${companyId}/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      },
    );
    dispatch({ type: DELETE_TPA_SERVICE, payload: { companyId, serviceId } });
    toast.success("Service Deleted Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    toast.error("Service Deletion Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const editTPAService =
  (companyId, serviceId, categoryId, pass) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");
      const { data } = await axios.patch(
        `${API_URL}/editCategory/${companyId}/${serviceId}/${categoryId}`,
        pass,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Includes the token in the authorization header
          },
        },
      );

      console.log("Edited Data: ", data);
      dispatch({ type: EDIT_TPA_SERVICE, payload: data });
      toast.success("Service Edited Successfully!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error editing service:", error);
      toast.error("Service Deletion Error!", {
        position: "bottom-right", // Use string for position
        autoClose: 2000,
      });
    }
  };

export const addEstimatedBill = (serviceData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(
      `${API_URL}/createEstimatedBill`,
      serviceData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      },
    );

    // console.log("Backend : ",data)

    // dispatch({ type: ADD_ESTIMATED_BILL, payload: data.estimate });
    toast.success("Bill Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Bill Addition Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const editEstimatedBill = (id, serviceData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.put(
      `${API_URL}/editEstimatedBill/${id}`,
      serviceData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
      },
    );

    // console.log("Service Added To Company : ",data)

    // dispatch({ type: EDIT_ESTIMATED_BILL, payload: data });
    toast.success("Bill Edited Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log(error);
    toast.error("Bill Edit Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const getEstimatedBill = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getEstimatedBills/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Estimated Bill : ",data)
    dispatch({ type: GET_ESTIMATED_BILL, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: NULL_ESTIMATED_BILL });
  }
};

export const getPackage = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getPackages`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    // console.log("Packages : ",data[0])

    dispatch({ type: GET_PACKAGES, payload: data[0] });
  } catch (error) {
    console.log(error);
  }
};

export const getProgressTrackerDetails =
  (patientId, caseId) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(
        `${API_URL}/getProgressTracker/${patientId}/${caseId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      //  console.log("Progress Tracker: ", data);

      dispatch({ type: GET_PROGRESS_TRACKER, payload: data.progress });
    } catch (error) {
      console.error("Error getting progress details:", error);
    }
  };

export const getRoomTypes = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getRoomSubcategories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("Room types fetched successfully:", data);
    dispatch({ type: GET_ROOM_TYPES, payload: data });
  } catch (error) {
    console.error("Error fetching room types:", error);
    dispatch({ type: GET_ROOM_TYPES, payload: [] });
  }
};

export const addBedsToRoom = (payload) => async () => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/beds`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("Bed Added To Room : ", data);

    toast.success("Bed Added Successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });

    return data; // return so UI can use it
  } catch (error) {
    console.error(error);

    toast.error("Bed Addition Error!", {
      position: "bottom-right",
      autoClose: 2000,
    });

    throw error; //  throw so UI can catch it
  }
};
export const getFilteredInpatients =
  (filteredData, page, rowsPerPage, search) => async (dispatch) => {
    // console.log("Fil:",filteredData)
    try {
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
    }
  };
export const getAdmissionRequests =
  (search, page, limit, sort) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/getAdmissionRequestsAll`, {
        headers: {
          Authorization: `Bearer ${token}`, // Includes the token in the authorization header
        },
        params: {
          search: search || "",
          page: page + 1,
          limit: limit,
          sortOrder: sort,
        },
      });

      // console.log("Add Reqs ", data);
      dispatch({ type: GET_ADMISSION_REQUESTS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_ADMISSION_REQUESTS,
        payload: { totalRequests: 0, requests: [] },
      });
    }
  };

export const addInsuranceAfterAdmission =
  (admissionId, insuranceData) => async (dispatch) => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.patch(
        `${API_URL}/addInsuranceAfterAdmission/${admissionId}`,
        insuranceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log("Response after adding insurance:", data);
      dispatch({
        type: UPDATE_ADMISSION_INSURANCE,
        payload: data.admissionRequest, // or `data` if you need full response
      });
      toast.success("Insurance details added successfully!", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return data; // so component can use it directly
    } catch (error) {
      console.error("Error adding insurance after admission:", error);
      throw error; // propagate error if you want to handle in component
    }
  };

export const getAppointmentData = (filter) => async (dispatch) => {
  // console.log("here");
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAppointment/stats`, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
      params: {
        filterType: filter,
      },
    });

    // console.log("Appt Reqs ", data);
    dispatch({ type: GET_APPOINTMENT_COUNTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const editBed = (bedId, updates) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");
    const { data } = await axios.patch(`${API_URL}/beds/${bedId}`, updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Bed Edited successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });
    return data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to Edit Bed. Please try again.", {
      position: "bottom-right",
      autoClose: 2000,
    });
  }
};

export const getTPAReport =
  ({ year, month, company }) =>
  async (dispatch) => {
    // console.log("TPA ACTION CALLED", { year, month, company });

    dispatch({ type: TPA_REQUEST });

    try {
      const token = localStorage.getItem("jwt");

      let url = month
        ? `${API_URL}/tpa/monthly?year=${year}&month=${month}`
        : `${API_URL}/tpa/yearly?year=${year}`;

      if (company) {
        url += `&company=${encodeURIComponent(company)}`;
      }

      // /console.log("TPA API URL:", url);

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("TPA API RESPONSE:", data);

      dispatch({ type: TPA_SUCCESS, payload: data });
      return data;
    } catch (error) {
      console.error("TPA ERROR:", error);
      dispatch({
        type: TPA_FAIL,
        payload: error?.response?.data?.message || "TPA fetch failed",
      });
    }
  };

import axios from "axios";
import { API_URL } from "../../Config/api.js";
import {
  ACCEPT_REQUEST,
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
  GET_EXPENSES,
  GET_FILTERED_DOCTORS,
  GET_FILTERED_PATIENTS,
  GET_FILTERED_ROOMS, GET_INSURED_PATIENTS,
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
  UPDATE_SERVICE,
} from "./ActionType.js";

import { toast } from "react-toastify";

export const getEarnings = (year) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getRevenueByYear`, {
      params: { year: year },
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    dispatch({ type: GET_EARNINGS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getDoctors = (page, rowsPerPage) => async (dispatch) => {
  try {
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

    toast.success("Doctor Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.error(
      "Error adding doctor:",
      error.response?.data || error.message
    );

    toast.error("Error adding Doctor!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
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

export const addDepartment = (department) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.post(`${API_URL}/addDepartments`, department, {
      headers: {
        Authorization: `Bearer ${token}`, // Includes the token in the authorization header
      },
    });

    console.log("Response: ", data);
    toast.success("Department Added Successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });

    dispatch({ type: ADD_DEPARTMENT, payload: data.department });
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
  (filteredData, page, rowsPerPage) => async (dispatch) => {
    // console.log("Fil:",filteredData)
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/getPatientsByStatus`, {
        params: {
          status: filteredData.status,
          typeVisit: filteredData.type,
          sort: filteredData.sort,
          page: page + 1,
          limit: rowsPerPage,
        }, // Sending status as a query parameter
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
export const getBillingRecords = (page, rowsPerPage) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(`${API_URL}/getAllBills`, {
      params: {
        page: page + 1, // Incrementing page by 1 to match the API requirement
        limit: rowsPerPage,
      },
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
        }
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
      }
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
        }
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
          "The image being sent is too large. Please reduce the size and try again."
        );
      } else {
        // Generic error message for other types of errors
        toast.error(error?.response?.data?.message || "Approval failed");
      }
    }
  };
export const editBill = (payload, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.put(
      `${API_URL}/editBillDetails/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Edit Bill Response:", data);
    toast.success("Bill edited successfully!", {
      position: "bottom-right",
      autoClose: 2000,
    });

    // Optional: dispatch to refresh data
    dispatch(getBillDetails(id));
    dispatch(getBillingRecords());
  } catch (error) {
    console.error("Error editing bill:", error);
    toast.error(error?.response?.data?.message || "Edit failed");
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

    dispatch(getBillingRecords());
  } catch (error) {
    console.error("Error adding to bill:", error);
    toast.error(error?.response?.data?.message || "Add failed");
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
        }
    );

    // console.log("Data: ",data)

    dispatch({ type: GET_INSURED_PATIENTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

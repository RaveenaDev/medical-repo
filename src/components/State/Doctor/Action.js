import axios from "axios";
import { API_URL } from "../../Config/api.js";
import {
  GET_APPOINTMENTS,
  GET_COMPLETED_APPOINTMENTS, GET_DOCTOR_REQUESTS,
  GET_INPATIENTS,
  GET_MOST_COMMON_DIAGNOSIS,
  GET_ONGOING_APPOINTMENTS,
  GET_PATIENT_OVERVIEW,
  GET_PATIENTS,
  GET_ROOMS,
  GET_SCHEDULED_APPOINTMENTS,
  GET_STATS,
  GET_SURGERIES,
  GET_WAITING_APPOINTMENTS,
} from "./ActionType.js";

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

    console.log("Surgeries: ", data.data);

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

    // console.log("Diag: ",data)

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

      console.log("Getting Appointments : ", data);

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

        console.log("REQ : ",data)

        dispatch({ type: GET_DOCTOR_REQUESTS, payload: data });
    } catch (error) {
        console.log(error);
    }
};
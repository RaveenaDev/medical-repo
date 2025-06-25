import axios from "axios";
import {API_URL} from "../../Config/api.js";
import {GET_INPATIENTS, GET_PATIENTS, GET_ROOMS, GET_SURGERIES} from "./ActionType.js";

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
};export const getInpatients = () => async (dispatch) => {
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

        const { data } = await axios.get(`${API_URL}/getRoomsByHospital`, {
            headers: {
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            },
        });

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
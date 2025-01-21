import {
    GET_RECEPTIONIST_OVERVIEW_FAILURE,
    GET_RECEPTIONIST_OVERVIEW_REQUEST,
    GET_RECEPTIONIST_OVERVIEW_SUCCESS,
    GET_RECEPTIONIST_PATIENTS_FAILURE,
    GET_RECEPTIONIST_PATIENTS_REQUEST,
    GET_RECEPTIONIST_PATIENTS_SUCCESS
} from "./ActionType.js";
import axios from "axios";
import {API_URL} from "../../Config/api.js";

export const getOverviewOfReceptionist = () => async(dispatch) => {
    dispatch({type:GET_RECEPTIONIST_OVERVIEW_REQUEST})
    try {
        const response = await axios.get(`${API_URL}/getOverview`)

        dispatch({type:GET_RECEPTIONIST_OVERVIEW_SUCCESS,payload:response})
    }

    catch (error){
        console.log(error)
        dispatch({type:GET_RECEPTIONIST_OVERVIEW_FAILURE,payload:error})
    }
}

export const getReceptionistPatients = () => async(dispatch) => {
    dispatch({type:GET_RECEPTIONIST_PATIENTS_REQUEST})
    try {
        const response = await axios.get(`${API_URL}/getPatients`)

        dispatch({type:GET_RECEPTIONIST_PATIENTS_SUCCESS,payload:response})
    }

    catch (error){
        console.log(error)
        dispatch({type:GET_RECEPTIONIST_PATIENTS_FAILURE,payload:error})
    }
}
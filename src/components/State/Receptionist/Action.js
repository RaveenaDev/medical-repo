import {
    GET_ALL_DEPARTMENTS, GET_DEPARTMENT_BY_ID,
    GET_DOCTORS,
    GET_PATIENTS,
    GET_RECEPTIONIST_OVERVIEW_FAILURE,
    GET_RECEPTIONIST_OVERVIEW_REQUEST,
    GET_RECEPTIONIST_OVERVIEW_SUCCESS,
    GET_RECEPTIONIST_PATIENTS_FAILURE,
    GET_RECEPTIONIST_PATIENTS_REQUEST,
    GET_RECEPTIONIST_PATIENTS_SUCCESS, GET_ROOMS, GET_STAFFS
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

export const getPatients = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getPatientsByHospital`,{
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_PATIENTS,payload:data})
        console.log("Patient route working :",data)
    }

    catch (error){
        console.log(error)
    }
}

export const getDoctors = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getDoctorsByHospital`,{
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_DOCTORS,payload:data})
        console.log("Doctor route working :",data)
    }

    catch (error){
        console.log(error)
    }
}

export const getStaffs = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getStaff`,{
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_STAFFS,payload:data})
        console.log("Staff route working :",data)
    }

    catch (error){
        console.log(error)
    }
}

export const getRooms = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getRooms`,{
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_ROOMS,payload:data})
        console.log("Room route working :",data)
    }

    catch (error){
        console.log(error)
    }
}

export const getAllDepartments = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getAllDepartments`,{
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_ALL_DEPARTMENTS,payload:data})
        console.log("Departments route working :",data)
    }

    catch (error){
        console.log(error)
    }
}

export const getDepartmentById = (departmentId) => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getDepartments/${departmentId}`,{
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_DEPARTMENT_BY_ID,payload:data})
        console.log("Department by Id route working :",data)
    }

    catch (error){
        console.log(error)
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
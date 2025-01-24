import axios from "axios";
import {API_URL} from "../../Config/api.js";
import {
    GET_ALL_DEPARTMENTS, GET_APPOINTMENT_REQUESTS, GET_APPOINTMENTS,
    GET_DEPARTMENT_BY_ID,
    GET_DOCTORS,
    GET_EARNINGS, GET_PATIENTS, GET_REJECTED_APPOINTMENTS,
    GET_ROOMS,
    GET_STAFFS
} from "./ActionType.js";

export const getEarnings = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getDoctorsByHospital`,{
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_EARNINGS,payload:data})
        console.log("Earnings route working :",data)
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

export const getAppointments = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getAppointmentsByStatus`,{
            params: { status: "Scheduled" }, // Sending status as a query parameter
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_APPOINTMENTS,payload:data})
        console.log("Appointments by status route working :",data)
    }

    catch (error){
        console.log(error)
    }
}

export const getAppointmentRequests = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getRequestedAppointments`,{
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_APPOINTMENT_REQUESTS,payload:data})
        console.log("Appointment Requests route working :",data)
    }

    catch (error){
        console.log(error)
    }
}

export const getRejectedAppointments = () => async(dispatch) => {
    try {
        const token = localStorage.getItem('jwt');

        const {data} = await axios.get(`${API_URL}/getRejectedAppointments`,{
            headers:{
                Authorization: `Bearer ${token}`, // Includes the token in the authorization header
            }
        })

        dispatch({type:GET_REJECTED_APPOINTMENTS,payload:data})
        console.log("Rejected Appointment route working :",data)
    }

    catch (error){
        console.log(error)
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
        console.log("Patients route working :",data)
    }

    catch (error){
        console.log(error)
    }
}
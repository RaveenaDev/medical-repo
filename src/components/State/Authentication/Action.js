import axios from "axios";
import {API_URL} from "../../Config/api.js";
import {LOGIN, LOGOUT} from "./ActionType.js";
import {toast} from "react-toastify";

export const login = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/login`,data)

        if(response.data.token) {
            localStorage.setItem("jwt",response.data.token);
        }
        dispatch({type:LOGIN,payload:response.data})
        console.log("Successfully Logged in " ,response.data)

        // Show success toast
        toast.success('Login Successful!', {
            position: "bottom-right",  // Use string for position
            autoClose: 3000,
        });
    }
    catch (error){
        console.log(error)
        toast.error('Please try again!', {
            position: "bottom-right",  // Use string for position
            autoClose: 3000,
        });
    }
}

export const Logout=()=>async(dispatch)=>{
    try{
        localStorage.clear();// Remove jwt token from localStorage when we logOut...
        dispatch({type:LOGOUT})
        console.log("Logout Success")
        // Show success toast
        toast.success('Logout Successful!', {
            position: "bottom-right",  // Use string for position
            autoClose: 3000,
        });
    }
    catch (error){
        console.log("error",error);
    }
}
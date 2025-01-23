import axios from "axios";
import {API_URL} from "../../Config/api.js";
import {LOGIN} from "./ActionType.js";

export const login = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`${API_URL}/login`,data)

        if(response.data.token) {
            localStorage.setItem("jwt",response.data.token);
        }
        dispatch({type:LOGIN,payload:response.data})
        console.log("Successfully Logged in " ,response)
    }
    catch (error){
        console.log(error)
    }
}
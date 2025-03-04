import axios from "axios";
import { API_URL } from "../../Config/api.js";
import { LOGIN, LOGOUT } from "./ActionType.js";
import { toast } from "react-toastify";

export const login = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    console.log("Res: ",response.data)

    if (response.data.token) {
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("hospitalName", response.data.hospitalName);
    }
    dispatch({ type: LOGIN, payload: response.data });

    // Show success toast
    toast.success("Login Successful!", {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  } catch (error) {
    // console.log("Error ayu: ",error);
    const err = error.response.data.message
    toast.error(err, {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  }
};

export const Logout = () => async (dispatch) => {
  try {
    localStorage.clear(); // Remove jwt token from localStorage when we logOut...
    dispatch({ type: LOGOUT });
    // Show success toast
    toast.success("Logout Successful!", {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  } catch (error) {
    console.log("error", error);
    toast.error("Logout Error!", {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  }
};

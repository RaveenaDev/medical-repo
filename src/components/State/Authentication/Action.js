import axios from "axios";
import { API_URL } from "../../Config/api.js";
import {
  FORGOT_PASSWORD,
  LOGIN,
  LOGOUT,
  RESET_PASSWORD,
} from "./ActionType.js";
import { toast } from "react-toastify";

export const login = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    // console.log("Res: ", response.data);

    if (response.data.token) {
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("hospitalName", response.data.hospitalName);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("departmentId", response.data.departmentIds);
      localStorage.setItem("departmentName", response.data.departmentNames);
      localStorage.setItem("username", response.data.username);
    }
    dispatch({ type: LOGIN, payload: response.data });

    // Show success toast
    toast.success("Login Successful!", {
      position: "bottom-right", // Use string for position
      autoClose: 3000,
    });
  } catch (error) {
    // console.log("Error ayu: ",error);
    const err = error.response.data.message;
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

export const forgotPassword = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/forgotPassword`, data);
    // console.log("Res: ",response.data)

    // if (response.data.token) {
    //   localStorage.setItem("jwt", response.data.token);
    // }
    dispatch({ type: FORGOT_PASSWORD, payload: response.data });
    toast.success("Email sent successfully!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  } catch (error) {
    console.log("Error ayu: ", error);
    const err = error.response.data.message;
    toast.error(err, {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

export const resetPassword = (newData, token, navigate) => async (dispatch) => {
  console.log("Role: ", newData.role);
  console.log("Token: ", token);
  try {
    const response = await axios.post(`${API_URL}/resetPassword`, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("Res: ",response.data)
    dispatch({ type: RESET_PASSWORD, payload: response.data });

    // Show success toast
    toast.success("Password Reset Successful!", {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });

    navigate(`/`);
  } catch (error) {
    console.log("Error ayu: ", error);
    const err = error.response.data.message;
    toast.error(err, {
      position: "bottom-right", // Use string for position
      autoClose: 2000,
    });
  }
};

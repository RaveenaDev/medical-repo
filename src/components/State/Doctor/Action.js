import axios from "axios";
import {API_URL} from "../../Config/api.js";
import {GET_ROOMS} from "./ActionType.js";

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
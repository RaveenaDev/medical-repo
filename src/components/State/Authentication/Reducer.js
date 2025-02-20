import { LOGIN, LOGOUT } from "./ActionType.js";

const initialState = {
  user: null,
  users: [],
  jwt: null,
  role: null,
  hospitalName: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.userId,
        jwt: action.payload.token,
        role: action.payload.role,
        hospitalName: action.payload.hospitalName,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        jwt: null,
        role: null,
      };

    default:
      return state;
  }
};

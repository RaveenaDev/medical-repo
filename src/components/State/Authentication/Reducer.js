import { LOGIN, LOGOUT } from "./ActionType.js";

const initialState = {
  user: null,
  userName: null,
  users: [],
  jwt: null,
  role: null,
  hospitalName: null,
  departmentId: [],
  departmentName: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload.userId,
        userName: action.payload.username,
        jwt: action.payload.token,
        role: action.payload.role,
        hospitalName: action.payload.hospitalName,
        departmentId: action.payload.departmentIds,
        departmentName: action.payload.departmentNames,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        jwt: null,
        role: null,
        hospitalName: null,
        departmentId: [],
      };

    default:
      return state;
  }
};

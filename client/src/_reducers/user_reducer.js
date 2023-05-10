import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

// reducer: 전 state + 현재 state = next state
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, register: action.payload };

    default:
      return state;
  }
}

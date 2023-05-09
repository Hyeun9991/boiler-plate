import axios from "axios";
import { LOGIN_USER } from "./types";

export default function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  // request를 reducer로 넘기기
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

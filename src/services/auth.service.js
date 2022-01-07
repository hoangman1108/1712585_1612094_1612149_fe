import axios from "axios";
import { API_URL } from "../utils/const";
import authHeader from "./auth-header";

const register = (data) => {
  return axios.post(API_URL + "/auth/signup", data);
};

const login = (username, password) => {
  return axios
    .post(API_URL + "/auth/login", {
      username,
      password,
    });
};

const me = () => {
  return axios
    .get(API_URL + "/users/me", { headers: authHeader() });
};

const forgotPassword = (email) => {
  return axios.post(API_URL + "/auth/forgot-password", { email });
}

const resetPassword = (userID, newPassword) => {
  return axios.post(API_URL + `/auth/reset-password?userId=${userID}`, { newPassword });
}


const authService = {
  register,
  login,
  me,
  forgotPassword,
  resetPassword
};

export default authService;
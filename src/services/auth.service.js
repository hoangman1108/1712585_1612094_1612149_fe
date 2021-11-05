import axios from "axios";
import { API_URL } from "../utils/const";

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


const authService = {
  register,
  login,
};

export default authService;
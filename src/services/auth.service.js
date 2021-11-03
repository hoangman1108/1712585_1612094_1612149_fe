import axios from "axios";
import { removeLocalStorage, setLocalStorage } from "../helpers/localStorage";
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

const logout = () => {
  removeLocalStorage("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
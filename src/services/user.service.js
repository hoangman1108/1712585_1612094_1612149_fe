import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../utils/const";


const getUserByRole = (role) => {
  return axios.get(API_URL + `/users/role/${role}`, { headers: authHeader() });
};

const updateUser = (id, data) => {
  return axios.put(API_URL + `/users/${id}`, data, { headers: authHeader() });
}

const userService = {
  getUserByRole,
  updateUser
};

export default userService;

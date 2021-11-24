import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../utils/const";


const getAllClass = () => {
  return axios.get(API_URL + "/classes", { headers: authHeader() });
};

const createClass = (data) => {
  return axios.post(API_URL + "/classes", data, { headers: authHeader() });
}

const deleteClass = (id) => {
  return axios.delete(API_URL + `/classes/${id}`, { headers: authHeader() });
}

const joinClass = (data) => {
  return axios.post(API_URL + "/classes/joinClass", data, { headers: authHeader() });
}

const classService = {
  getAllClass,
  deleteClass,
  createClass,
  joinClass
};

export default classService;

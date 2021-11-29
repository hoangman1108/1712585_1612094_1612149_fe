import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../utils/const";

const getAllClass = () => {
  return axios.get(API_URL + "/classes", { headers: authHeader() });
};

const detailClass = (id) => {
  return axios.get(API_URL + `/classes/${id}`, { headers: authHeader() });
};

const checkUserInClass = (classId, userId) => {
  return axios.get(API_URL + `/classes/${classId}/checkUser`, { headers: authHeader() });
}

const createClass = (data) => {
  return axios.post(API_URL + "/classes", data, { headers: authHeader() });
}

const deleteClass = (id) => {
  return axios.delete(API_URL + `/classes/${id}`, { headers: authHeader() });
}

const joinClass = (data) => {
  return axios.post(API_URL + "/classes/joinClass", data, { headers: authHeader() });
}

const getAssigments = (classId) => {
  return axios.get(API_URL + `/classes/${classId}/assignments`, { headers: authHeader() });
}

const classService = {
  getAllClass,
  deleteClass,
  createClass,
  joinClass,
  detailClass,
  checkUserInClass,
  getAssigments
};

export default classService;

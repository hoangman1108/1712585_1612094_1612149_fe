import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../utils/const";


const getAll = () => {
  return axios.get(API_URL + "/classes", { headers: authHeader() });
};


const classService = {
  getAll
};

export default classService;

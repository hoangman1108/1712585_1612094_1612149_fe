import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../utils/const";

const inviteJoinClass = (data) => {
  return axios.post(API_URL + "/email", data, { headers: authHeader() });
};

const emailService = {
    inviteJoinClass
}

export default emailService;

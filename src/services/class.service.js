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
  return axios.get(API_URL + `/classes/${classId}/checkUser`, {
    headers: authHeader(),
  });
};

const createClass = (data) => {
  return axios.post(API_URL + "/classes", data, { headers: authHeader() });
};

const deleteClass = (id) => {
  return axios.delete(API_URL + `/classes/${id}`, { headers: authHeader() });
};

const joinClass = (data) => {
  return axios.post(API_URL + "/classes/joinClass", data, {
    headers: authHeader(),
  });
};

const getAssigments = (classId) => {
  return axios.get(API_URL + `/classes/${classId}/assignments`, {
    headers: authHeader(),
  });
};

const updateIndexAssigments = (classId, data) => {
  return axios.patch(API_URL + `/classes/${classId}/assignments`, data, {
    headers: authHeader(),
  });
};

const updateAssigments = (data) => {
  return axios.put(API_URL + `/assignments/${data.id}`, data, {
    headers: authHeader(),
  });
};

const deleteAssigments = (id) => {
  return axios.delete(API_URL + `/assignments/${id}`, {
    headers: authHeader(),
  });
};

const addAssigments = (data) => {
  return axios.post(API_URL + "/assignments", data, { headers: authHeader() });
};

const getLstStudentsReal = (id) => {
  return axios.get(API_URL + `/files/list-student/${id}`, {
    headers: authHeader(),
  });
};

const importLstStudentReal = (formData) => {
  return axios.post(API_URL + `/files/upload-list-student`, formData, {
    headers: authHeader(),
    contentType: "multipart/form-data",
  });
};

const getPointsByAssignmentID = (classID, assignmentID) => {
  return axios.get(
    API_URL +
      `/point-assignment/show-point-assignment/${classID}/${assignmentID}`,
    { headers: authHeader() }
  );
};

const importListGrade = (formData) => {
  return axios.post(
    API_URL + `/point-assignment/upload-file-point-by-teacher`,
    formData,
    {
      headers: authHeader(),
      contentType: "multipart/form-data",
    }
  );
};

const updatePointByTeacher = (formData) => {
  return axios.post(API_URL + `/point-assignment/update-by-teacher`, formData, {
    headers: authHeader(),
  });
};

const getStudentPointByAssignmentID = (assignmentID) => {
  return axios.get(
    API_URL + `/point-assignment/show-point-student/${assignmentID}`,
    {
      headers: authHeader(),
    }
  );
};

const updateMarkForAssigment = (formData) => {
  return axios.post(API_URL + `/assignments/mark`, formData, {
    headers: authHeader(),
  });
};

const getGradeView = (classID) => {
  return axios.get(API_URL + `/grade-view/${classID}/class`, {
    headers: authHeader(),
  });
};

const createGradeView = (formData) => {
  return axios.post(API_URL + `/grade-view`, formData, {
    headers: authHeader(),
  });
};

const classService = {
  getAllClass,
  deleteClass,
  createClass,
  joinClass,
  updateIndexAssigments,
  detailClass,
  checkUserInClass,
  getAssigments,
  updateAssigments,
  deleteAssigments,
  addAssigments,
  getLstStudentsReal,
  importLstStudentReal,
  getPointsByAssignmentID,
  importListGrade,
  updatePointByTeacher,
  getStudentPointByAssignmentID,
  updateMarkForAssigment,
  getGradeView,
  createGradeView
};

export default classService;

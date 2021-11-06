import classService from "../../services/class.service";
import {
  LIST_CLASS_FAIL,
  LIST_CLASS_SUCCESS,
  SET_MESSAGE,
  CREATE_CLASS_SUCCESS,
  CREATE_CLASS_FAIL,
} from "./types";

export const getListClass = () => dispatch => {
  return classService.getAllClass().then((response) => {
    dispatch({
      type: LIST_CLASS_SUCCESS,
      payload: response.data
    });
    return Promise.resolve();
  },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LIST_CLASS_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    })
}

export const createClass = (data) => dispatch => {
  return classService.createClass(data).then((response) => {
    dispatch({
      type: CREATE_CLASS_SUCCESS,
      payload: response.data,
    });
    return Promise.resolve();
  },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: CREATE_CLASS_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    })
}

export const deleteClass = (id) => dispatch => {
  return classService.deleteClass(id).then((response) => {
    dispatch({
      type: SET_MESSAGE,
      payload: response.data,
    });
    return Promise.resolve();
  },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    })
}
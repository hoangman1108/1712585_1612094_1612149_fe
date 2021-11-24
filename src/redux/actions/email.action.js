import emailService from "../../services/email.service";
import {
  SET_MESSAGE,
  INVITE_SUCCESS,
  INVITE_FAIL
} from "./types";

export const inviteJoinClass = (data) => dispatch => {
  return emailService.inviteJoinClass(data)
  .then((response) => {
    dispatch({
      type: INVITE_SUCCESS,
      payload: response.data,
    });
    return Promise.resolve();
  }, (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: INVITE_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    })
}
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import authService from '../../services/auth.service';

export const register = (data) => dispatch => {
  return authService.register(data).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      console.log(response, 'response register');
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      })
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  )
}

export const login = (username, password) => dispatch => {
  return authService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.data,
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
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  )
}
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

import { SET_INFO_REGISTER, RESET_INFO_REGISTER } from "../actions/types";

const initialState = {
  infoUserRegister: {},
};

export default function registerReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_INFO_REGISTER:
      return {
        ...state,
        infoUserRegister: payload,
      };
    case RESET_INFO_REGISTER:
      return {
        ...state,
        infoUserRegister: {},
      };
    default:
      return state;
  }
}

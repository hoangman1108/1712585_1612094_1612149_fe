import {
  LIST_CLASS_FAIL,
  LIST_CLASS_SUCCESS,
  CREATE_CLASS_SUCCESS,
  DELETE_CLASS_SUCCESS,
} from "../actions/types";

const initialState = {
  classes: [],
}

export default function classReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LIST_CLASS_SUCCESS:
      return {
        ...state,
        classes: payload,
      };
    case LIST_CLASS_FAIL:
      return {
        ...state,
        classes: [],
      };
    case CREATE_CLASS_SUCCESS:
      return {
        ...state,
        classes: [...state.classes, payload]
      }
    case DELETE_CLASS_SUCCESS:
      return {
        ...state,
        classes: [...state.classes.filter((element) => element.id !== payload)]
      }
    default:
      return state;
  }
}
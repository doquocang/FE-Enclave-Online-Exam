import { UPDATE_VALUE } from "./actions";

const initialState = {
  value: "",
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};
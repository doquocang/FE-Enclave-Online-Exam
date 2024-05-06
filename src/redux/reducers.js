// reducers.js
import { combineReducers } from 'redux';

const initialState = {
  userData: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REFRESH_TOKEN_SUCCESS':
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer
});

// actions.js
export const UPDATE_VALUE = 'UPDATE_VALUE';

export const updateValue = value => ({
  type: UPDATE_VALUE,
  payload: value,
});
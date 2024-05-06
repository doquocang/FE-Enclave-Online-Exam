// actions.js
export const loginSuccess = (userData) => ({
  type: 'REFRESH_TOKEN_SUCCESS',
  payload: userData
});

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      // Gọi API login
      let res = await loginApi(username, password);
      dispatch(loginSuccess(res));
    } catch (error) {
      // Xử lý lỗi
    }
  };
};

import axios from "./Customize-axios";

const loginApi = (username, password) => {
  return axios.post("/auth/token", { username, password });
};

const logoutApi = (token) => {
  return axios.post("/auth/logout", { token });
};

const refreshTokenApi = (token) => {
  return axios.post("/auth/refresh", { token });
};



export { loginApi, logoutApi, refreshTokenApi };

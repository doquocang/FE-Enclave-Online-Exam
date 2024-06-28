import axios from "./Customize-axios";

//login
const loginApi = (username, password) => {
  return axios.post("/auth/token", { username, password });
};

const logoutApi = (token) => {
  return axios.post("/auth/logout", { token });
};

const refreshTokenApi = (token) => {
  return axios.post("/auth/refresh", { token });
};

//study
const fetchCategoriesWebApi = (token) => {
  return axios.get("/api/subject/categoriesWeb", {
    headers: {
      // "ngrok-skip-browser-warning": true,
      Authorization: `Bearer ${token}`,
    },
  });
};

const searchCategoriesApi = (token, searchQuery) => {
  return axios.get(`/api/subject/categories/search?search=${searchQuery}`, {
    headers: {
      // "ngrok-skip-browser-warning": true,
      Authorization: `Bearer ${token}`,
    },
  });
};

const fetchQuestionsApi = (token, subSectionId, pageNumber, pageSize) => {
  return axios.get(
    `/api/questionstudies/questions?subSectionId=${subSectionId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      headers: {
        // "ngrok-skip-browser-warning": true,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const fetchImageApi = (imageName) => {
  return axios.get(`/api/questionstudies/images/${imageName}`);
};

export {
  loginApi,
  logoutApi,
  refreshTokenApi,
  fetchCategoriesWebApi,
  searchCategoriesApi,
  fetchQuestionsApi,
  fetchImageApi,
};

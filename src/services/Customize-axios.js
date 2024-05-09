import axios from "axios";
import { toast } from "react-toastify";
axios.defaults.timeout = 10 * 1000;

const instance = axios.create({
  // baseURL: "http://172.16.75.32:8080",
  baseURL: "http://172.16.75.37:8080/",
  // baseURL: "https://dummyjson.com",3
});

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : { statusCode: response };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let res = {};

    if (error.response) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error: ", error.message);
    }
    return res;
    // return Promise.reject(error);
  }
);

export default instance;

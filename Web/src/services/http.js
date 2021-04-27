import axios from "axios";
import userService from "./userService";
import { toast } from "react-toastify";

axios.defaults.headers.common["x-auth-token"] = userService.getJwt();

//middleware-checks res from server
axios.interceptors.response.use(null, (err) => {
  if (err.response && err.response.status >= 403) {
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(err);
});

const service = {
  get: axios.get,
  put: axios.put,
  patch: axios.patch,
  post: axios.post,
  delete: axios.delete,
};

export default service;

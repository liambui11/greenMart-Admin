import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { store } from "../redux/store";
import { checkAuthStaff } from "../actions/authStaff";

const axiosInstanceStaff = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstanceStaff.interceptors.request.use(
  async (config) => {
    const token = store.getState().staffAuth.accessToken;
    if (token) {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            await store.dispatch(checkAuthStaff());
            const newToken = store.getState().staffAuth.accessToken;
            processQueue(null, newToken);
            config.headers.Authorization = `Bearer ${newToken}`;
            return config;
          } catch (err) {
            processQueue(err, null);
            throw err;
          } finally {
            isRefreshing = false;
          }
        } else {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                config.headers.Authorization = `Bearer ${token}`;
                resolve(config);
              },
              reject: (err) => reject(err),
            });
          });
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstanceStaff.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      store.dispatch({ type: "STAFF_LOGOUT" });
    }
    return Promise.reject(err);
  }
);

export default axiosInstanceStaff;

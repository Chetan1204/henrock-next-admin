import axios from "axios";
import { CONFIG_HEADERS } from "../constant/textContants/apiConstants";

const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: CONFIG_HEADERS,
});

apiAxios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (["put", "post", "delete"].includes(config.method)) {
      config.cache = false; // Disable cache for these methods
    }

    config.baseURL = process.env.REACT_APP_BASE_URL;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// apiAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response interceptor for API calls
apiAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const temRefreshToken = localStorage.getItem("refreshToken");
    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      temRefreshToken !== null
    ) {
      originalRequest._retry = true;
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/auth/refresh-token`,
        { refreshToken: temRefreshToken },
        {
          headers: {
            Authorization: localStorage.getItem("refreshToken"),
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("refreshToken", data.newRefreshToken);
      localStorage.setItem("token", data.newToken);
      axios.defaults.headers.common["Authorization"] = data.token;
      if (originalRequest.data) {
        originalRequest.data = JSON.parse(originalRequest.data);
      }
      return apiAxios(originalRequest);
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);

// setupCache(apiAxios);

export default apiAxios;
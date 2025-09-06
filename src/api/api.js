import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`[API RESPONSE] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    let normalizedError = {};

    if (error.response) {
      normalizedError = {
        status: error.response.status,
        message: error.response.data?.message || "Server error",
      };
    } else if (error.request) {
      normalizedError = {
        status: "NETWORK_ERROR",
        message: "No response from server. Please check your connection.",
      };
    } else {
      normalizedError = {
        status: "UNKNOWN_ERROR",
        message: error.message || "Something went wrong",
      };
    }

    return Promise.reject(normalizedError);
  }
);

export default api;

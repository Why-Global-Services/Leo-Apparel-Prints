import axiosClient from "./axios";
import { store } from "@/redux/store";
import { logout, setToken } from "@/features/auth/authSlice";

let isRefreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  queue = [];
};

export const setupInterceptors = () => {
  // 🔹 REQUEST
  axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // 🔹 RESPONSE
  axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      // 🔥 HANDLE TOKEN EXPIRE
      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            queue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // 🔥 CALL YOUR BACKEND
          const res = await axiosClient.post(
            "/api/user/refresh-token"
          );

          const newToken = res.data.accessToken;

          // save in redux + localStorage
          store.dispatch(setToken(newToken));

          processQueue(null, newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return axiosClient(originalRequest);
        } catch (err) {
          processQueue(err, null);

          store.dispatch(logout());

          window.location.href = "/auth/login";
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
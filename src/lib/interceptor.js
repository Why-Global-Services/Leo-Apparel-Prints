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
  axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config;

      if (error.response?.status === 401 && !original._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            queue.push({ resolve, reject });
          }).then((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return axiosClient(original);
          });
        }

        original._retry = true;
        isRefreshing = true;

        try {
          const res = await axiosClient.post("/auth/refresh");
          const newToken = res.data.accessToken;

          store.dispatch(setToken(newToken));
          processQueue(null, newToken);

          original.headers.Authorization = `Bearer ${newToken}`;
          return axiosClient(original);
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
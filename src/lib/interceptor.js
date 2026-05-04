// import axiosClient from "./axios";
// import { store } from "@/redux/store";
// import { logout, setToken } from "@/features/auth/authSlice";

// let isRefreshing = false;
// let queue = [];

// const processQueue = (error, token = null) => {
//   queue.forEach((p) => {
//     if (error) p.reject(error);
//     else p.resolve(token);
//   });
//   queue = [];
// };

// const setupInterceptors = () => {
//   axiosClient.interceptors.request.use((config) => {
//     const token =
//       store.getState().auth.token || localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   });

//   axiosClient.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//       const originalRequest = error.config;

//       if (
//         error.response?.status === 401 &&
//         !originalRequest._retry &&
//         !originalRequest.url.includes("/refresh-token")
//       ) {
//         if (isRefreshing) {
//           return new Promise((resolve, reject) => {
//             queue.push({ resolve, reject });
//           }).then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return axiosClient(originalRequest);
//           });
//         }

//         originalRequest._retry = true;
//         isRefreshing = true;

//         try {
//           const refreshToken = localStorage.getItem("refreshToken");

//           const res = await axiosClient.post(
//             "/v1/user/refresh-token",
//             { refreshToken } // ✅ important
//           );

//           const newToken = res.data.accessToken;

//           store.dispatch(setToken(newToken));
//           localStorage.setItem("token", newToken);

//           processQueue(null, newToken);

//           originalRequest.headers.Authorization = `Bearer ${newToken}`;

//           return axiosClient(originalRequest);
//         } catch (err) {
//           processQueue(err, null);

//           store.dispatch(logout());
//           localStorage.clear();

//           window.location.href = "/auth/login";
//         } finally {
//           isRefreshing = false;
//         }
//       }

//       return Promise.reject(error);
//     }
//   );
// };





import axiosClient, { getGuestId } from "./axios";
import { store } from "@/redux/store";
import { logout, setToken } from "@/features/auth/authSlice";

let isRefreshing = false;
let queue = [];

// ✅ Handle queued requests during refresh
const processQueue = (error, token = null) => {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  queue = [];
};

export const setupInterceptors = () => {
  // ===============================
  // 🔥 REQUEST INTERCEPTOR
  // ===============================
  axiosClient.interceptors.request.use((config) => {
    // ✅ Attach token
    const token =
      store.getState().auth.token || localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ Attach guestId
    const guestId = getGuestId();
    if (guestId) {
      config.headers["guestid"] = guestId;
    }

    return config;
  });

  // ===============================
  // 🔥 RESPONSE INTERCEPTOR
  // ===============================
  axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/refresh-token")
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
          const refreshToken = localStorage.getItem("refreshToken");

          const res = await axiosClient.post("/v1/user/refresh-token", {
            refreshToken,
          });

          const newToken = res.data.accessToken;

          // ✅ Update store + localStorage
          store.dispatch(setToken(newToken));
          localStorage.setItem("token", newToken);

          processQueue(null, newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return axiosClient(originalRequest);
        } catch (err) {
          processQueue(err, null);

          store.dispatch(logout());
          localStorage.clear();

          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
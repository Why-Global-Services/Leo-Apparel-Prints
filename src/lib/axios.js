
// import axios from "axios";

// export const getGuestId = () => {
//   if (typeof window === "undefined") return null;

//   let guestId = localStorage.getItem("guestId");

//   if (!guestId) {
//     guestId =crypto.randomUUID();
//     localStorage.setItem("guestId", guestId);
//   }

//   return guestId;
// };

// // ✅ Create axios instance
// const axiosClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
// });

// export default axiosClient;




import axios from "axios";

export const getGuestId = (create = true) => {
  if (typeof window === "undefined") return null;

  let guestId = localStorage.getItem("guestId");

  if (!guestId && create) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guestId", guestId);
  }

  return guestId;
};

// ✅ AXIOS INSTANCE
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// ✅ REQUEST INTERCEPTOR
axiosClient.interceptors.request.use(
  (config) => {

    if (typeof window !== "undefined") {

      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // ✅ guest id
      const guestId = getGuestId(false);

      if (guestId) {
        config.headers["guest-id"] = guestId;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

// ✅ RESPONSE INTERCEPTOR
axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/user/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);

      } catch (refreshError) {

        console.log("Refresh token expired");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("guestId");

        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
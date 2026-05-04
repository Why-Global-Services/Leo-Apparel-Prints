// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true, // for cookies
// });

// export default axiosClient;






import axios from "axios";

export const getGuestId = () => {
  if (typeof window === "undefined") return null;

  let guestId = localStorage.getItem("guestId");

  if (!guestId) {
    guestId =crypto.randomUUID();
    localStorage.setItem("guestId", guestId);
  }

  return guestId;
};

// ✅ Create axios instance
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default axiosClient;
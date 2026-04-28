// import axiosClient from "@/lib/axios";

// export const loginAPI = async (data) => {
//   const res = await axiosClient.post("/auth/login", data);
//   return res.data;
// };




export const loginAPI = async (data) => {
  await new Promise((res) => setTimeout(res, 800));

  if (data.email !== "leocult@gmail.com" || data.password !== "123456") {
    throw { response: { data: { message: "Invalid credentials" } } };
  }

  return {
    user: {
      id: 1,
      name: "Leo User",
      email: data.email,
    },
    accessToken: "dummy-token-123",
  };
};
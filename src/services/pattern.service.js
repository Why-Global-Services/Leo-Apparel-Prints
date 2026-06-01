import axiosInstance from "../api/axiosInstance";

export const createPatternAPI = async (formData) => {
    const res = await axiosInstance.post("/createpattern", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export const getPatternsAPI = async () => {
    const res = await axiosInstance.get("/allpattern");

    return res.data;
};

export const deletePatternAPI = async (id) => {
    const res = await axiosInstance.delete(`/${id}`);

    return res.data;
};

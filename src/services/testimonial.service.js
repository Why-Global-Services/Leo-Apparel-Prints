const Testimonial = require("../models/testimonial.model");
const { uploadToCloud } = require("../utils/uploadFileToS3");

const createTestimonial = async (data, file) => {
    try {
        let profileImage = data.profileImage;
        if (file) {
            const uploadResult = await uploadToCloud(file.buffer, file.mimetype, "testimonials");
            profileImage = uploadResult.Location;
        }

        const testimonial = new Testimonial({
            ...data,
            profileImage,
        });

        await testimonial.save();
        return testimonial;
    } catch (error) {
        throw error;
    }
};

const getUserTestimonials = async () => {
    try {
        const testimonials = await Testimonial.find({ status: "approved" })
            .sort({ createdAt: -1 })
            .lean();
        return testimonials;
    } catch (error) {
        throw error;
    }
};

const getAdminTestimonials = async (statusFilter) => {
    try {
        const query = statusFilter && statusFilter !== "all" ? { status: statusFilter } : {};
        const testimonials = await Testimonial.find(query)
            .sort({ createdAt: -1 })
            .lean();
        return testimonials;
    } catch (error) {
        throw error;
    }
};

const updateTestimonialStatus = async (id, status) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        return testimonial;
    } catch (error) {
        throw error;
    }
};

const deleteTestimonial = async (id) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(id);
        return testimonial;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createTestimonial,
    getUserTestimonials,
    getAdminTestimonials,
    updateTestimonialStatus,
    deleteTestimonial,
};

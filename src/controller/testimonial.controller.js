const catchAsync = require("../utils/catchAsync");
const testimonialService = require("../services/testimonial.service");

const submitTestimonial = catchAsync(async (req, res) => {
    const data = {
        customerName: req.body.customerName,
        email: req.body.email,
        rating: req.body.rating,
        reviewMessage: req.body.reviewMessage,
        isVerifiedCustomer: req.body.isVerifiedCustomer === 'true' || req.body.isVerifiedCustomer === true,
    };
    
    const testimonial = await testimonialService.createTestimonial(data, req.file);
    res.status(201).json({ success: true, message: "Thank you for your review. It will be displayed after admin approval.", data: testimonial });
});

const getApprovedTestimonials = catchAsync(async (req, res) => {
    const testimonials = await testimonialService.getUserTestimonials();
    res.status(200).json({ success: true, data: testimonials });
});

const getAllTestimonialsAdmin = catchAsync(async (req, res) => {
    const statusFilter = req.query.status;
    const testimonials = await testimonialService.getAdminTestimonials(statusFilter);
    res.status(200).json({ success: true, data: testimonials });
});

const approveTestimonial = catchAsync(async (req, res) => {
    const { id } = req.params;
    const testimonial = await testimonialService.updateTestimonialStatus(id, "approved");
    res.status(200).json({ success: true, message: "Testimonial approved", data: testimonial });
});

const rejectTestimonial = catchAsync(async (req, res) => {
    const { id } = req.params;
    const testimonial = await testimonialService.updateTestimonialStatus(id, "rejected");
    res.status(200).json({ success: true, message: "Testimonial rejected", data: testimonial });
});

const removeTestimonial = catchAsync(async (req, res) => {
    const { id } = req.params;
    await testimonialService.deleteTestimonial(id);
    res.status(200).json({ success: true, message: "Testimonial deleted" });
});

module.exports = {
    submitTestimonial,
    getApprovedTestimonials,
    getAllTestimonialsAdmin,
    approveTestimonial,
    rejectTestimonial,
    removeTestimonial,
};

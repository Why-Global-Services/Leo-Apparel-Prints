const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    reviewMessage: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    isVerifiedCustomer: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true, collection: 'testimonials' })

const Testimonial = mongoose.model("testimonials", testimonialSchema)
module.exports = Testimonial
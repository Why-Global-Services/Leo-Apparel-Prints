const mongoose = require("mongoose");

const bulkEnquirySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    orgName: {
      type: String,
      required: true,
    },
    uniformFor: {
      type: [String],
      required: true,
    },
    products: {
      type: [String],
      required: true,
    },
    hasDesign: {
      type: Boolean,
      default: false,
    },
    designFileUrl: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: "",
    },
    agreeTerms: {
      type: Boolean,
      required: true,
    },
    isOfferApplied: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const BulkEnquiry = mongoose.model("BulkEnquiry", bulkEnquirySchema);

module.exports = BulkEnquiry;

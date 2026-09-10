const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const cottonDesignSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    designType: {
      type: String,
      enum: ["OUR_DESIGN", "UPLOAD_DESIGN"],
      required: true,
    },

    apparel: {
      type: String,
      required: true,
      trim: true,
    },

    // Only required for UPLOAD_DESIGN
    baseColor: {
      type: String,
      default: "",
      trim: true,
    },

    frontImage: {
      type: String,
      required: true,
    },

    backImage: {
      type: String,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CottonDesign",
  cottonDesignSchema
);
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const patternSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },

    name: {
      type: String,
      required: true,
    },

    frontPattern: {
      type: String,
      required: true,
    },

    backPattern: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PatternDesign", patternSchema);

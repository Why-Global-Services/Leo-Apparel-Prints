const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },

  name: {
    type: String,
    required: true
  },

  categoryId: {
    type: String,
    required: true
  },

  glbUrl: {
    type: String
  },

  templates: [
    {
      type: String,
      ref: "Template"
    }
  ],

  basePrice: {
    type: Number,
    default: 0
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },

    name: {
      type: String,
      required: true,
    },

    segment: {
      type: String,
    },

    sport: {
      type: String,
    },

    apparel: {
      type: String,
    },

    categoryId: {
      type: String,
      ref: "Category",
      required: true,
    },

    glbUrl: {
      type: String,
    },

    images: [
      {
        type: String,
      },
    ],

    viewImages: {
      front: { type: String },
      back: { type: String },
    },

    templates: [
      {
        type: String,
        ref: "Template",
      },
    ],

    allowedPatterns: [
      {
        type: String,
        ref: "PatternDesign",
      },
    ],

    customFields: { type: mongoose.Schema.Types.Mixed, default: [] },
    printZones: { type: mongoose.Schema.Types.Mixed, default: {} },

    basePrice: {
      type: Number,
      default: 0,
    },

    discountType: {
      type: String,
      enum: ["percentage", "amount"],
      default: "percentage",
    },

    discountValue: {
      type: Number,
      default: 0,
    },

    finalPrice: {
      type: Number,
      default: 0,
    },

    shipping: {
      weight: {
        type: Number,
        default: 0, // grams
      },
      length: {
        type: Number,
        default: 0, // cm
      },
      breadth: {
        type: Number,
        default: 0, // cm
      },
      height: {
        type: Number,
        default: 0, // cm
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);

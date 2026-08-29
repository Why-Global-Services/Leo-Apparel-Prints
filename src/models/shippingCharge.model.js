const mongoose = require("mongoose");

const shippingChargeSchema = new mongoose.Schema(
  {
    shippingCharge: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    freeShippingMinimumAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ShippingCharge",
  shippingChargeSchema
);
const mongoose = require("mongoose");
const { v4 } = require("uuid");

const CartSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },

    userId: {
      type: String,
      default: null
    },

    guestId: {
      type: String,
      default: null
    },

    items: [
      {
        productId: {
          type: String,
          required: true
        },

        customizationId: {
          type: String,   // 🔥 NEW (IMPORTANT)
          required: true
        },

        quantity: {
          type: Number,
          default: 1,
          min: 1
        },

        _id: {
          type: String,
          default: v4
        }
      }
    ],

    deliveryAddressId: String,
    billingAddressId: String

  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
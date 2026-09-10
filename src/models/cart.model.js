// const mongoose = require("mongoose");
// const { v4 } = require("uuid");

// const CartSchema = new mongoose.Schema(
//   {
//     _id: {
//       type: String,
//       default: v4,
//     },

//     userId: {
//       type: String,
//       default: null,
//     },

//     guestId: {
//       type: String,
//       default: null,
//     },

//     items: [
//       {
//         productId: {
//           type: String,
//           required: true,
//         },

//         customizationId: {
//           type: String, // 🔥 NEW (IMPORTANT)
//           default: null,
//         },

//         sizes: [
//           {
//             _id: {
//               type: String,
//               default: v4,
//             },
//             size: {
//               type: String,
//               required: true,
//             },

//             quantity: {
//               type: Number,
//               required: true,
//               min: 1,
//             },
//           },
//         ],

//         _id: {
//           type: String,
//           default: v4,
//         },
//       },
//     ],

//     deliveryAddressId: String,
//     billingAddressId: String,
//   },
//   { timestamps: true },
// );

// const Cart = mongoose.model("Cart", CartSchema);

// module.exports = Cart;








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
      default: null,
    },

    guestId: {
      type: String,
      default: null,
    },

    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        customizationId: {
          type: String,
          default: null,
        },

        // =============================
        // CUSTOM COTTON TEE / FIX
        // Cart items now persist an `image` snapshot. Previously this
        // field was written by the controller but was not declared on
        // the schema, so Mongoose's default strict mode silently
        // dropped it before saving — nothing was actually persisted.
        // =============================
        image: {
          type: String,
          default: "",
        },

        sizes: [
          {
            _id: {
              type: String,
              default: v4,
            },
            size: {
              type: String,
              required: true,
            },

            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
          },
        ],

        _id: {
          type: String,
          default: v4,
        },
      },
    ],

    deliveryAddressId: String,
    billingAddressId: String,
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
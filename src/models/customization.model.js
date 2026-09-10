const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const customizationSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },

  userId: { type: String, default: null },
  guestId: { type: String, default: null }, 
  productId: { type: String, ref: "Product", default: null },
  customizationType: {
    type: String,
    enum: ["NORMAL", "CUSTOM_COTTON_TEES"],
    default: "NORMAL",
  },
  cottonTeeType: {
    type: String,
    enum: ["OUR_DESIGN", "UPLOAD_DESIGN", null],
    default: null,
  },
  productSnapshot: {
    _id: String,
    name: String,
    basePrice: Number,
    finalPrice: Number,
    glbUrl: String,
    frontImage: String,
    backImage: String,
  },
  // productId:{
  //   type:String
  // },
  patternId: {
  type: String,
  ref: "PatternDesign",
},

  customization: [
    {
       _id: { type: String, default: uuidv4 },
      zoneKey: String,
      fieldName: String,
      value: String
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Customization", customizationSchema);
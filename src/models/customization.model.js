const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const customizationSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },

  userId: { type: String, default: null },
  guestId: { type: String, default: null }, 
  productId:{
    type:String
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
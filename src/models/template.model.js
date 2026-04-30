const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const templateSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },

  name: {
    type: String,
    required: true
  },

  description: String,

  zones: [
    {
      zoneId: {
        type: String, 
        ref: "DesignZone"
      },

      zoneKey: String,

      activeFields: [String]
    }
  ],

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Template", templateSchema);
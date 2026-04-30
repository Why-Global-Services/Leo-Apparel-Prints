const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const fieldSchema = new mongoose.Schema({
  fieldName: String,
  fieldType: {
    type: String,
    enum: ["text", "number", "image", "color"]
  },
  label: String
}, { _id: false });

const designZoneSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },

  zoneKey: {
    type: String,
    required: true,
    unique: true
  },

  zoneName: String,

  meshNames: [String], // GLB mesh mapping

  allowedFields: [fieldSchema],

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("DesignZone", designZoneSchema);
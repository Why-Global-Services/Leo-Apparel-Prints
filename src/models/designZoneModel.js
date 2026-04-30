const mongoose = require("mongoose");

const allowedFieldSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    required: true, // playerName, logo
  },
  fieldType: {
    type: String,
    enum: ["text", "number", "image", "color"],
    required: true,
  },
});

const designZoneSchema = new mongoose.Schema(
  {
    zoneKey: {
      type: String,
      required: true,
      unique: true, // front, back, sleeve
    },

    zoneName: {
      type: String,
      required: true,
    },

    meshNames: {
      type: [String],
      required: true, // GLB mesh names
    },

    allowedFields: [allowedFieldSchema],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DesignZone", designZoneSchema);
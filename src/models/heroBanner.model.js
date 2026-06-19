const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const heroBannerSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    desktopImage: {
      type: String,
      required: true,
    },
    mobileImage: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "Hero Banner",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "heroBanners",
  }
);

const HeroBanner = mongoose.model("HeroBanner", heroBannerSchema);

module.exports = HeroBanner;

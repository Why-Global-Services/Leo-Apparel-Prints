const mongoose = require("mongoose");

const newsletterOfferSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    usedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const NewsletterOffer = mongoose.model("NewsletterOffer", newsletterOfferSchema);

module.exports = NewsletterOffer;

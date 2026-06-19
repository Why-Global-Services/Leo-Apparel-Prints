const httpStatus = require("http-status");
const NewsletterOffer = require("../models/newsletterOffer.model");
const ApiError = require("../utils/apiError");
const sendmail = require("../utils/sendmail");

const claimOffer = async (email) => {
  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is required");
  }

  // Check if email already claimed an offer
  let existingOffer = await NewsletterOffer.findOne({ email: email.toLowerCase() });

  if (existingOffer) {
    return { success: false, message: "Offer already claimed for this email" };
  }

  const newOffer = await NewsletterOffer.create({ email: email.toLowerCase() });

  // Send the promotional email
  try {
    await sendmail.sendNotification({
      email: email.toLowerCase(),
      subject: "Your 10% OFF Leo Cult Bulk Order Discount!",
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #F5B800; text-align: center;">Welcome to the Leo Cult!</h2>
          <p style="color: #333; font-size: 16px;">
            Thank you for subscribing to our newsletter. As promised, here is your 10% off discount for your first bulk order.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="background-color: #003E9B; color: #fff; padding: 15px 30px; font-size: 20px; font-weight: bold; border-radius: 5px; letter-spacing: 2px;">
              LEO10BULK
            </span>
          </div>
          <p style="color: #333; font-size: 16px;">
            Simply use this email address when submitting your next bulk enquiry, and we will automatically apply the discount!
          </p>
          <p style="color: #777; font-size: 14px; text-align: center; margin-top: 40px;">
            &copy; ${new Date().getFullYear()} Leo Apparel Prints. All rights reserved.
          </p>
        </div>
      `
    });
  } catch (error) {
    console.error("Failed to send newsletter offer email:", error);
    // Even if email fails, we still created the offer, so we return success true.
  }

  return { success: true, offer: newOffer };
};

module.exports = {
  claimOffer,
};

const httpStatus = require("http-status");
const BulkEnquiry = require("../models/bulkEnquiry.model");
const NewsletterOffer = require("../models/newsletterOffer.model");
const ApiError = require("../utils/apiError");
const { uploadToCloud } = require("../utils/uploadFileToS3");

const createBulkEnquiry = async (req) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    orgName,
    uniformFor,
    products,
    hasDesign,
    message,
    agreeTerms,
  } = req.body;

  let designFileUrl = null;

  if (req.file) {
    try {
      // Upload the design file to S3
      designFileUrl = await uploadToCloud(req.file, "bulk-enquiry/designs");
    } catch (error) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "File upload failed");
    }
  }

  // Parse arrays if they are sent as strings
  let parsedUniformFor = uniformFor;
  let parsedProducts = products;

  if (typeof uniformFor === 'string') {
    try { parsedUniformFor = JSON.parse(uniformFor); } catch(e) { parsedUniformFor = [uniformFor]; }
  }
  if (typeof products === 'string') {
    try { parsedProducts = JSON.parse(products); } catch(e) { parsedProducts = [products]; }
  }

  // Check if there is an active newsletter offer for this email
  let isOfferApplied = false;
  if (email) {
    const activeOffer = await NewsletterOffer.findOne({ 
      email: email.toLowerCase(), 
      isUsed: false 
    });

    if (activeOffer) {
      isOfferApplied = true;
      // Mark offer as used
      activeOffer.isUsed = true;
      activeOffer.usedAt = new Date();
      await activeOffer.save();
    }
  }

  const newEnquiry = await BulkEnquiry.create({
    firstName,
    lastName,
    phone,
    email,
    orgName,
    uniformFor: parsedUniformFor,
    products: parsedProducts,
    hasDesign: hasDesign === 'true' || hasDesign === true,
    designFileUrl,
    message,
    agreeTerms: agreeTerms === 'true' || agreeTerms === true,
    isOfferApplied,
  });

  return newEnquiry;
};

const getBulkEnquiries = async () => {
  const enquiries = await BulkEnquiry.find().sort({ createdAt: -1 });
  return enquiries;
};

module.exports = {
  createBulkEnquiry,
  getBulkEnquiries,
};

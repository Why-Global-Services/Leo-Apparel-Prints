const { Product } = require("../../../models/Product.model");
const httpStatus = require('http-status');
const ApiError = require("../../../utils/apiError");
const { uploadToCloud } = require("../../../utils/uploadFileToS3");



// ========================================
// 📊 BULK OPERATIONS
// ========================================

const bulkUpdateStock = async (req, res) => {
  const { updates } = req.body;

  if (!updates || !Array.isArray(updates) || updates.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Updates array is required');
  }

  const bulkOps = updates.map((update) => {
    if (update.variantId) {
      return {
        updateOne: {
          filter: {
            _id: update.productId,
            'variant.sizeColorVariants._id': update.variantId,
          },
          update: {
            $set: { 'variant.sizeColorVariants.$.stockCount': update.stockCount },
          },
        },  
      };
    } else {
      return {
        updateOne: {
          filter: { _id: update.productId },
          update: { $set: { 'nonVariant.stockCount': update.stockCount } },
        },
      };
    }
  });

  const result = await Product.bulkWrite(bulkOps);

  return {
    success: true,
    message: 'Bulk stock update completed',
    data: result,
  };
};

module.exports = {
  bulkUpdateStock,
};
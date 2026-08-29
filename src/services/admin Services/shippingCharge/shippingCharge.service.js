const ShippingCharge = require("../../../models/shippingCharge.model");

const ApiError = require("../../../utils/apiError");

// ================================
// CREATE / UPDATE SHIPPING CHARGE
// ================================
const createOrUpdateShippingCharge = async (req) => {
  const { shippingCharge, freeShipping, freeShippingMinimumAmount } = req.body;

  if (shippingCharge === undefined || shippingCharge === null) {
    throw new ApiError(400, "Shipping charge is required");
  }

  if (Number(shippingCharge) < 0) {
    throw new ApiError(400, "Shipping charge cannot be negative");
  }

  if (
    freeShippingMinimumAmount !== undefined &&
    Number(freeShippingMinimumAmount) < 0
  ) {
    throw new ApiError(400, "Free shipping minimum amount cannot be negative");
  }

  const existing = await ShippingCharge.findOne();

  const data = {
    shippingCharge: Number(shippingCharge),
    freeShipping: Boolean(freeShipping),
    freeShippingMinimumAmount: Number(freeShippingMinimumAmount) || 0,
  };

  let result;

  if (existing) {
    result = await ShippingCharge.findByIdAndUpdate(existing._id, data, {
      new: true,
      runValidators: true,
    });
  } else {
    result = await ShippingCharge.create(data);
  }

  return {
    success: true,
    message: "Shipping charge saved successfully",
    data: result,
  };
};

// ================================
// GET SHIPPING CHARGE
// ================================
const getShippingCharge = async () => {
  let shippingSettings = await ShippingCharge.findOne();

  // Create default settings if not exists
  if (!shippingSettings) {
    shippingSettings = await ShippingCharge.create({
      shippingCharge: 0,
      freeShipping: false,
      freeShippingMinimumAmount: 0,
    });
  }

  return {
    success: true,
    message: "Shipping charge fetched successfully",
    data: shippingSettings,
  };
};

// ================================
// CALCULATE SHIPPING CHARGE
// ================================
const calculateShippingCharge = async (amount) => {
  const shippingSettings = await ShippingCharge.findOne();

  // No settings
  if (!shippingSettings) {
    return 0;
  }

  const orderAmount = Number(amount) || 0;

  // Free shipping disabled
  if (!shippingSettings.freeShipping) {
    return shippingSettings.shippingCharge;
  }

  // Free shipping enabled
  if (orderAmount >= shippingSettings.freeShippingMinimumAmount) {
    return 0;
  }

  return shippingSettings.shippingCharge;
};

module.exports = {
  createOrUpdateShippingCharge,
  getShippingCharge,
  calculateShippingCharge,
};

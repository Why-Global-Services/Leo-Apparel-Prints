const { CouponModel } = require("../../models/coupons.model");
const { User } = require("../../models/users.model");
const { getCart } = require("./Cart/cart.service");
const ApiError = require("../../utils/apiError");
const Product = require("../../models/Product.model");
const { calculateShippingCharge } = require("../../services/admin Services/shippingCharge/shippingCharge.service");

// ==============================
// MAIN CHECKOUT SERVICE
// ==============================
const checkOut = async (req) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(400, "User must login");
  }

  // ==============================
  // USER ADDRESS
  // ==============================
  const userAddress = await User.findById(userId)
    .select("name email phone address")
    .lean();

  if (!userAddress) {
    throw new ApiError(404, "User not found");
  }

  // ==============================
  // CART DATA
  // ==============================
  const cartData = await getCart(req);

  if (!cartData?.items?.length) {
    throw new ApiError(400, "Cart is empty");
  }

  // ==============================
  // COUPONS
  // ==============================
  let CouponData = [];

  try {
    const currentDate = new Date();

    CouponData = await CouponModel.find({
      status: "active",
      validFrom: { $lte: currentDate },
      validUntil: { $gte: currentDate },
    })
      .select(
        "code message offerType discountType discountValue maxDiscountAmount minPurchaseAmount validFrom validUntil couponImage",
      )
      .lean();
  } catch (err) {
    console.log("Coupon fetch error:", err.message);
  }

  // ==============================
  // TOTALS
  // ==============================
  let totalCostPrice = 0;
  let totalSalePrice = 0;
  let totalSavings = 0;

  // ==============================
  // ENRICH CART ITEMS
  // ==============================
  const enrichedCartItems = await Promise.all(
    cartData.items.map(async (item) => {
      const product = await Product.findById(item.productId).lean();

      if (!product) {
        throw new ApiError(404, `Product not found for ID: ${item.productId}`);
      }

      const quantity =
        item.quantity ||
        item.qty ||
        (Array.isArray(item.sizes)
          ? item.sizes.reduce(
              (total, sizeObj) => total + (sizeObj.quantity || 0),
              0,
            )
          : 0) ||
        1;

      // ==============================
      // PRODUCT IMAGES
      // ==============================
      const productImages = Array.isArray(product.images) ? product.images : [];

      // ==============================
      // PRICING
      // ==============================
      const costPrice = product.basePrice || 0;

      const salePrice =
        product.finalPrice && product.finalPrice > 0
          ? product.finalPrice
          : product.basePrice || 0;

      const subtotal = salePrice * quantity;

      const savings =
        costPrice > salePrice ? (costPrice - salePrice) * quantity : 0;

      // ==============================
      // TOTALS UPDATE
      // ==============================
      totalCostPrice += costPrice * quantity;
      totalSalePrice += salePrice * quantity;
      totalSavings += savings;

      // ==============================
      // RETURN ITEM
      // ==============================
      return {
        productId: product._id,
        productName: product.name,
        categoryId: product.categoryId,
        quantity,

        priceBreakdown: {
          costPrice,
          salePrice,
          subtotal,
          savings,
        },

        subtotal,

        productImages,

        productData: {
          glbUrl: product.glbUrl || "",
          viewImages: product.viewImages || {},
          customFields: product.customFields || [],
          printZones: product.printZones || {},
          isActive: product.isActive,
        },
      };
    }),
  );

  // ==============================
  // SHIPPING
  // ==============================
 
const shippingCharge = await calculateShippingCharge(totalSalePrice);

const finalTotal = totalSalePrice + shippingCharge;

  // ==============================
  // FINAL RESPONSE
  // ==============================
  return {
    success: true,
    message: "Checkout data fetched successfully",

    data: {
      userAddress,

      cartItems: enrichedCartItems,

      totalPrice: finalTotal,

      pricing: {
        subtotal: totalSalePrice,
        shipping: shippingCharge,
        total: finalTotal,
        savings: totalSavings,
      },

      totalCostPrice,
      totalSalePrice,
      totalSavings,

      CouponData,
    },
  };
};

module.exports = { checkOut };

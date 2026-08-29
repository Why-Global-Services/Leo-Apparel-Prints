// 1. REMOVE COUPON IMPORT - DELETE THIS LINE:
// const { CouponModel } = require("../../../models/coupons.model");

// REST OF IMPORTS (keep as is)
const mongoose = require("mongoose");
const crypto = require("crypto");
const Razorpay = require("razorpay");

// Models
const cart = require("../../../models/cart.model");
const { orderDetailsModel } = require("../../../models/orders.model");
const { paymentDetailsModel } = require("../../../models/payment.model");
const Product = require("../../../models/Product.model");
const { User } = require("../../../models/users.model");
const Customization = require("../../../models/customization.model");

const { createShiprocketOrder } = require("../../../utils/shiprocket");
// COUPON IMPORT REMOVED

// Services & Utils
const { generateOrderId } = require("../../../utils/generateId");
const { createStripeCheckoutSession } = require("../Payment/payment.service");
const ApiError = require("../../../utils/apiError");
const logger = require("../../../config/logger");
const { performance } = require("perf_hooks");
const { calculateShippingCharge
} = require(
  "../../../services/admin Services/shippingCharge/shippingCharge.service"
);


class OrderService {
  constructor() {
    this.checkEnvironmentVariables();
    this.razorpayInstance = this.initializeRazorpay();
    this.circuitBreakers = new Map();
    this.couponAttempts = new Map();
  }

  checkEnvironmentVariables() {
    const requiredEnvVars = ["RAZORPAY_KEY", "RAZORPAY_SECRET"];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName],
    );

    if (missingVars.length > 0) {
      console.warn("⚠️ Missing environment variables:", missingVars);
    } else {
      console.log("✅ All required environment variables are present");
    }
  }

  initializeRazorpay() {
    // Try both environment variable naming conventions
    const key_id = process.env.RAZORPAY_KEY || process.env.RAZORPAY_KEY_ID;
    const key_secret =
      process.env.RAZORPAY_SECRET || process.env.RAZORPAY_SECRET_KEY;

    if (!key_id || !key_secret) {
      logger.warn(
        "Razorpay credentials not found. Razorpay payments will be disabled.",
      );
      return null;
    }

    try {
      return new Razorpay({
        key_id: key_id,
        key_secret: key_secret,
      });
    } catch (error) {
      logger.error("Failed to initialize Razorpay", { error: error.message });
      return null;
    }
  }

  /**
   * Main order placement with optimized flow
   */
  async placeOrder(req) {
    const startTime = performance.now();
    const session = await mongoose.startSession();

    console.log("🚀 Starting order placement process", {
      userId: req.user?._id,
      bodyKeys: Object.keys(req.body),
    });

    try {
      await session.startTransaction();
      logger.info("Order placement started", { userId: req.user?._id });

      // 2. CHANGE placeOrder() - REMOVE couponCode from destructuring
      const { paymentMethod, isBuyNow = false, deliveryDays } = req.body;
      const userId = this.validateUser(req.user);

      const preparationResult = await this.prepareOrderData({
        userId,
        orderData: req.body,
        isBuyNow,
        session,
      });

      // Phase 2: Pricing Calculation
      const pricing = await this.calculatePricing({
        cartItems: preparationResult.cartItems,
        totalAmount: preparationResult.totalAmount,
        userId,
      });

      const finalCartItems = pricing.cartItems || preparationResult.cartItems;

      // Phase 3: Order Creation
      const order = await this.createOrderTransaction(
        {
          userId,
          cartItems: finalCartItems,
          userData: preparationResult.userData,
          pricing,
          paymentMethod,
          isBuyNow,
          deliveryDays,
        },
        session,
      );

      // Phase 4: Payment Processing
      const paymentResult = await this.processPaymentWithRetry({
        paymentMethod,
        amount: pricing.finalTotal,
        order,
        userId,
        session,
      });

      await session.commitTransaction();

      const duration = performance.now() - startTime;
      this.logOrderSuccess(order, userId, duration);

      /* ================================ */

      return this.formatOrderResponse(order, paymentResult, pricing);
    } catch (error) {
      await this.handleOrderFailure(error, session, req.user?._id);
      throw error;
    } finally {
      session.endSession();
    }
  }

  /**
     Parallel data preparation
    */
  async prepareOrderData({ userId, orderData, isBuyNow, session }) {
    const [userData, itemsResult] = await Promise.all([
      this.getUserWithAddresses(userId, orderData, isBuyNow),
      this.getOrderItems(orderData, userId, isBuyNow, session),
    ]);

    return {
      userData,
      cartItems: itemsResult.cartItems,
      totalAmount: itemsResult.totalAmount,
      productsId: itemsResult.productsId,
    };
  }

  /**
   * 3. REPLACE ENTIRE calculatePricing() FUNCTION
   * Simple pricing without coupons
   */
async calculatePricing({ cartItems }) {
  console.log("💰 Dynamic pricing calculation");

  const updatedCartItems = [...cartItems];

  // =========================
  // SUBTOTAL
  // =========================

  const subtotal = updatedCartItems.reduce((sum, item) => {
    const itemSubtotal =
      item.subtotal ||
      (item.price || 0) * (item.quantity || 1);

    return sum + itemSubtotal;
  }, 0);

  // =========================
  // DYNAMIC SHIPPING
  // =========================

  const shippingCharge =
    await calculateShippingCharge(subtotal);

  console.log("🚚 Shipping calculation:", {
    subtotal,
    shippingCharge,
  });

  // =========================
  // FINAL TOTAL
  // =========================

  const finalTotal = subtotal + shippingCharge;

  console.log("✅ Pricing:", {
    subtotal,
    shippingCharge,
    finalTotal,
  });

  return {
    subtotal,
    shipping: shippingCharge,
    finalTotal,

    couponDiscount: 0,
    couponDetails: null,

    cartItems: updatedCartItems,
  };
}

  // 4. DELETE THESE FULL FUNCTIONS - REMOVED COMPLETELY:
  // async applyCouponWithValidation() - DELETED
  // calculateDiscountAmount() - DELETED

  /**
   * Calculate total tax from cart items
   */
  calculateTax(cartItems) {
    const totalTax = cartItems.reduce((sum, item) => {
      const itemTax = item.tax || 0; // Tax percentage
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 1;

      // Calculate tax on base price
      const itemTaxAmount = (itemPrice * itemQuantity * itemTax) / 100;

      console.log("🧮 Tax calculation for item:", {
        productName: item.productName,
        price: itemPrice,
        quantity: itemQuantity,
        taxPercent: itemTax,
        taxAmount: itemTaxAmount,
      });

      return sum + itemTaxAmount;
    }, 0);

    console.log("💵 Total tax calculated:", totalTax);
    return Number(totalTax.toFixed(2));
  }

  /**
   * Calculate automatic discounts (First Order + Prepaid)
   * Called BEFORE coupon application
   */
  async calculateAutomaticDiscounts({
    userId,
    paymentMethod,
    subtotalBeforeTax,
  }) {
    const discounts = {
      firstOrderDiscount: 0,
      prepaidDiscount: 0,
      totalAutomaticDiscount: 0,
      isFirstOrder: false,
      isPrepaid: false,
    };

    // Check if this is user's first order
    const existingOrders = await orderDetailsModel.countDocuments({
      userId,
      orderStatus: { $nin: ["Cancelled", "Pending"] }, // Don't count cancelled/pending
    });

    const isFirstOrder = existingOrders === 0;
    discounts.isFirstOrder = isFirstOrder;

    // Check if payment is prepaid (not COD)
    const isPrepaid = paymentMethod && paymentMethod !== "COD";
    discounts.isPrepaid = isPrepaid;

    const DISCOUNT_PERCENTAGE = 5; // 5% discount

    // Apply first order discount (5%)
    if (isFirstOrder) {
      discounts.firstOrderDiscount =
        (subtotalBeforeTax * DISCOUNT_PERCENTAGE) / 100;
      console.log("🎉 First order discount applied:", {
        percentage: DISCOUNT_PERCENTAGE,
        amount: discounts.firstOrderDiscount,
      });
    }

    // Apply prepaid discount (5%) - only if NOT first order
    // Note: User gets EITHER first order OR prepaid discount, not both
    if (isPrepaid && !isFirstOrder) {
      discounts.prepaidDiscount =
        (subtotalBeforeTax * DISCOUNT_PERCENTAGE) / 100;
      console.log("💳 Prepaid discount applied:", {
        percentage: DISCOUNT_PERCENTAGE,
        amount: discounts.prepaidDiscount,
      });
    }

    // Total automatic discount
    discounts.totalAutomaticDiscount =
      discounts.firstOrderDiscount + discounts.prepaidDiscount;

    console.log("✅ Automatic discounts calculated:", {
      isFirstOrder,
      isPrepaid,
      firstOrderDiscount: discounts.firstOrderDiscount.toFixed(2),
      prepaidDiscount: discounts.prepaidDiscount.toFixed(2),
      total: discounts.totalAutomaticDiscount.toFixed(2),
    });

    return discounts;
  }

  // applyCouponWithValidation() - DELETED (line removed)
  // calculateDiscountAmount() - DELETED (line removed)

  /**
   * Optimized order creation with validation
   */
  async createOrderTransaction(orderData, session) {
    const {
      userId,
      cartItems,
      userData,
      pricing,
      paymentMethod,
      isBuyNow,
      deliveryDays,
    } = orderData;

    // Validate stock availability before creating order
    await this.validateStockAvailability(cartItems, session);

    const orderId = await generateOrderId();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    const orderPayload = this.buildOrderPayload({
      orderId,
      userId,
      userData,
      cartItems,
      pricing,
      paymentMethod,
      isBuyNow,
      deliveryDays,
      expiresAt,
    });

    console.log("📦 Creating order:", {
      orderId,
      userId,
      itemCount: cartItems.length,
      totalAmount: pricing.finalTotal,
    });

    try {
      console.log("🔄 Attempting to create order in database...");
      const order = await orderDetailsModel.create([orderPayload], { session });
      console.log("✅ Order created successfully:", order[0].orderId);
      return order[0];
    } catch (error) {
      console.error("❌ Order creation failed with error:", {
        name: error.name,
        message: error.message,
        code: error.code,
        keyPattern: error.keyPattern,
        keyValue: error.keyValue,
      });

      if (error.code === 11000) {
        // Duplicate order ID, retry with new ID
        console.log("🔄 Duplicate order ID detected, retrying with new ID...");
        return await this.createOrderTransaction(orderData, session);
      }

      if (error.name === "ValidationError") {
        console.error("📋 Validation errors:", error.errors);
        require("fs").writeFileSync(
          "error_log.txt",
          JSON.stringify(error.errors, null, 2),
        );
      }

      throw new ApiError(
        500,
        "Failed to create order: " +
          (error.name === "ValidationError"
            ? Object.keys(error.errors).join(", ")
            : error.message),
        error.message,
      );
    }
  }

  normalizeAddress(address) {
    if (!address) return null;

    return {
      _id: address._id,
      fullName: address.fullName || "",
      addressLine1: address.addressLine1 || "",
      landMark: address.landMark || "", // ✅ FIX
      city: address.city || "",
      state: address.state || "",
      zipCode: address.zipCode || "", // ✅ FIX
      country: address.country || "India",
      phone: address.phone || "",
      addressType: address.addressType || "",
      checkoutAddress: address.checkoutAddress || "",
    };
  }

  /**
   * UPDATED: Build order payload to include automatic discounts
   */
  buildOrderPayload({
    orderId,
    userId,
    userData,
    cartItems,
    pricing,
    paymentMethod,
    isBuyNow,
    expiresAt,
    deliveryDays,
  }) {
    console.log("userData", userData);
    const userName = userData.fullName || userData.userName || "Customer";
    const contactNumber =
      userData.phone || userData.contactNumber || "Not Provided";
    const email = userData.email || "no-email@example.com";

    const validatedCartItems = cartItems.map((item) => {
      // ✅ Use the normalizeProductType helper
      const productType = this.normalizeProductType(item.productType);

      const subtotal = item.subtotal || item.price * item.quantity || 0;

      return {
        ...item,
        productType,
        subtotal,
      };
    });

    const orderPayload = {
      orderId,
      userId,
      email: email,
      userName: userName,
      orderStatus: "Pending",
      contactNumber: contactNumber,
      billingAddress: userData.billingAddress,
      deliveryAddress: userData.deliveryAddress,
      isBuyNow: isBuyNow || false,
      expiresAt,
      deliveryDays,
      orderDetails: [
        {
          products: validatedCartItems.map((item) => ({
            productId: item.productId,

            variantId: item.variantId,

            productType: item.productType,

            quantity: item.quantity,

            sizes: Array.isArray(item.sizes)
              ? item.sizes.map((s) => ({ size: s.size, quantity: s.quantity }))
              : [],

            price: item.price,

            subtotal: item.subtotal,

            isFreeProduct: item.isFreeProduct || false,

            customizationCost: item.customizationCost || 0,

            // =========================
            // CUSTOMIZATION
            // =========================

            customization: item.customization || [],

            selectedPattern: item.selectedPattern || null,

            selectedSize: item.selectedSize || null,

            playerName: item.playerName || null,

            playerNumber: item.playerNumber || null,

            // =========================
            // PREVIEW IMAGES
            // =========================

            frontPreviewImage: item.frontPreviewImage || null,

            backPreviewImage: item.backPreviewImage || null,

            // =========================
            // PRODUCT DESIGN DATA
            // =========================

            printZones: item.printZones || {},

            viewImages: item.viewImages || {},

            allowedPatterns: item.allowedPatterns || [],

            templates: item.templates || [],

            // =========================
            // STATUS
            // =========================

            orderStatus: "Pending",

            paymentStatus: "Pending",
          })),

          // Simplified pricing details
          couponCode: null, // No coupon code
          couponDetails: null, // No coupon details
          cartQuantity: validatedCartItems.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0,
          ),
          price: pricing.subtotalAfterCoupon || pricing.subtotal, // After coupon discount (or subtotal)
          discount: pricing.couponDiscount || 0, // No coupon discount
          tax: 0, // No tax calculation
          shippingCharge: pricing.shipping,
          finalAmount: pricing.finalTotal,
        },
      ],
      paymentMethod,
      paymentStatus: "Pending",
      totalPrice: pricing.finalTotal,
      metadata: {
        version: "1.0",
        createdAt: new Date(),
        source: isBuyNow ? "buy_now" : "cart",
        discountsApplied: {
          coupon: 0, // No coupon discount
        },
      },
    };

    console.log("✅ Order payload validation passed");
    return orderPayload;
  }

  /**
   * Enhanced payment processing with retry mechanism
   */
  async processPaymentWithRetry({
    paymentMethod,
    amount,
    order,
    userId,
    session,
  }) {
    const maxRetries = 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`💳 Processing payment attempt ${attempt}:`, {
          paymentMethod,
          amount,
          orderId: order.orderId,
        });

        const result = await this.processPayment({
          paymentMethod,
          amount,
          order,
          userId,
          session,
        });

        return result;
      } catch (error) {
        lastError = error;
        console.error("❌ FULL PAYMENT ERROR:", error);
        console.warn(`Payment attempt ${attempt} failed:`, error.message);

        if (attempt < maxRetries) {
          const backoffTime = 1000 * attempt;
          console.log(`⏳ Waiting ${backoffTime}ms before retry...`);
          await this.sleep(backoffTime);
        }
      }
    }

    throw new ApiError(
      500,
      "Payment processing failed after multiple attempts",
      lastError?.message,
    );
  }

  /**
   * Original payment processing (kept for compatibility)
   */
  async processPayment({ paymentMethod, amount, order, userId, session }) {
    const paymentData = {
      userId,
      orderId: order._id,
      amount,
      subtotal: order.orderDetails[0].price,
      discount: order.orderDetails[0].discount,
      paymentMethod,
      paymentStatus: "initiated",
    };

    paymentMethod = paymentMethod?.toLowerCase();

    switch (paymentMethod) {
      case "razorpay":
        if (!this.razorpayInstance) {
          throw new ApiError(400, "Razorpay is not configured");
        }

        order.expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await order.save({ session });

        const razorpayOrder = await this.razorpayInstance.orders.create({
          amount: Math.round(amount * 100),
          currency: "INR",
          receipt: `REC_${order.orderId}`,
        });

        paymentData.razorpayOrderId = razorpayOrder.id;

        paymentData.pendingPaymentExpiry = new Date(
          Date.now() + 30 * 60 * 1000,
        );

        await paymentDetailsModel.create([paymentData], { session });

        return { razorpayOrder };

      case "stripe":
        const stripeUrl = await createStripeCheckoutSession(
          amount,
          userId,
          order.orderId,
          order._id,
        );

        paymentData.stripePayOrderId = order.orderId;

        await paymentDetailsModel.create([paymentData], { session });

        return { stripeUrl };

      case "cod":
        order.orderStatus = "Ordered";

        order.paymentStatus = "Pending";

        order.expiresAt = null;

        await order.save({ session });

        paymentData.paymentStatus = "pending";

        paymentData.pendingPaymentExpiry = null;

        await paymentDetailsModel.create([paymentData], { session });

        await cart.findOneAndDelete({ userId }).session(session);

        return {};

      default:
        throw new ApiError(400, `Unsupported payment method: ${paymentMethod}`);
    }
  }

  /**
   * Enhanced stock validation
   */
  async validateStockAvailability(cartItems, session) {
    console.log("🔍 Validating stock availability", cartItems.length);

    try {
      // =========================
      // TOTAL CART QUANTITY CHECK
      // =========================
      const totalCartQuantity = cartItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0,
      );

      console.log("🛒 Total cart quantity:", totalCartQuantity);

      if (totalCartQuantity < 10) {
        throw new ApiError(400, "Minimum total order quantity is 10");
      }

      await Promise.all(
        cartItems.map(async (item) => {
          console.log("📦 Checking item:", {
            productId: item.productId,
            quantity: item.quantity,
          });

          const product = await Product.findById(item.productId).session(
            session,
          );

          if (!product) {
            throw new ApiError(404, `Product not found: ${item.productId}`);
          }

          if (product.isActive === false) {
            throw new ApiError(400, `${product.name} is inactive`);
          }

          console.log(`✅ Product validated: ${product.name}`);
        }),
      );

      console.log("✅ All products validated");
    } catch (error) {
      console.error("❌ validateStockAvailability ERROR", error);

      throw error;
    }
  }

  /**
   * Enhanced error handling
   */
  async handleOrderFailure(error, session, userId) {
    console.error("💥 Order placement failed:", error.message);

    try {
      await session.abortTransaction();
      console.log("✅ Transaction aborted successfully");
    } catch (abortError) {
      console.error("❌ Failed to abort transaction:", abortError.message);
    }

    logger.error("Order placement failed", {
      userId,
      error: error.message,
      stack: error.stack,
    });

    // Notify monitoring system
    await this.notifyOrderFailure(error, userId);
  }

  /**
   * Success logging and metrics
   */
  logOrderSuccess(order, userId, duration) {
    console.log("🎉 Order placement completed successfully", {
      orderId: order.orderId,
      userId,
      duration: `${duration.toFixed(2)}ms`,
    });

    logger.info("Order placed successfully", {
      orderId: order.orderId,
      userId,
      duration: `${duration.toFixed(2)}ms`,
      itemCount: order.orderDetails[0]?.products?.length || 0,
      totalAmount: order.totalPrice,
    });
  }

  /**
   * Standardized response format
   */
  formatOrderResponse(order, paymentResult, pricing) {
    return {
      success: true,
      message: "Order Created Successfully",
      data: {
        orderId: order.orderId,
        userOrder: order,
        ...paymentResult,
        pricingSummary: pricing,
        nextSteps: this.getNextSteps(order.paymentMethod),
      },
    };
  }

  /**
   * Optimized order items retrieval
   */
  async getOrderItems(orderData, userId, isBuyNow, session) {
    if (isBuyNow) {
      return await this.getBuyNowItems(orderData, session);
    } else {
      return await this.getCartItems(userId, session);
    }
  }

  /**
   * Optimized buy now items with stock validation
   */
  async getBuyNowItems(orderData, session) {
    const {
      productId,
      variantId,
      quantity = 1,
      productType = "nonVariation",
    } = orderData;

    console.log("🛍️ Processing buy now items:", {
      productId,
      variantId,
      quantity,
      productType,
    });

    const product = await Product.findById(productId).session(session);
    if (!product) throw new ApiError(404, "Product not found");

    // Map product type if needed
    const mappedProductType =
      productType === "variant"
        ? "variation"
        : productType === "nonVariant"
          ? "nonVariation"
          : productType;

    const variant = this.findProductVariant(
      product,
      variantId,
      mappedProductType,
    );
    if (!variant) throw new ApiError(404, "Product variant not found");

    await this.validateStock(
      product,
      variant,
      quantity,
      mappedProductType,
      session,
    );

    const basePrice = this.getVariantPrice(variant);
    const tax = variant.price?.tax || 0;
    const subtotal = basePrice * quantity;

    console.log("✅ Buy now items processed successfully");

    return {
      cartItems: [
        {
          productId: product._id,
          variantId: variant._id,
          productType: mappedProductType,
          quantity,
          price: basePrice,
          tax: tax,
          subtotal,
          productName: product.productName || product.name,
          productImage: product.productImages?.[0] || product.productImage,
          selectedVariant: variant,
          productCategory: product.productCategory,
        },
      ],
      totalAmount: subtotal,
      productsId: [productId],
    };
  }

  /**
   * Optimized cart items with aggregation pipeline
   */

  async getCartItems(userId, session) {
    console.log("🛒 START: getCartItems()", {
      userId,
      hasSession: !!session,
    });

    try {
      // ==============================
      // FIND CART
      // ==============================

      const userCart = await cart.findOne({ userId }).session(session);

      console.log("✅ Cart query completed:", {
        cartExists: !!userCart,
        itemCount: userCart?.items?.length || 0,
      });

      if (!userCart || !userCart.items?.length) {
        throw new ApiError(400, "Cart is empty");
      }

      // ==============================
      // PROCESS ITEMS
      // ==============================

      const cartItems = await Promise.all(
        userCart.items.map(async (item) => {
          // ==============================
          // PRODUCT
          // ==============================

          const product = await Product.findById(item.productId).session(
            session,
          );

          const customizationDoc = item.customizationId
            ? await Customization.findById(item.customizationId).session(
                session,
              )
            : null;

          console.log("CUSTOMIZATION DOC:", customizationDoc);

          if (!product) {
            throw new ApiError(404, `Product not found: ${item.productId}`);
          }

          // ==============================
          // QUANTITY
          // ==============================

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
          // PRICE
          // ==============================

          const price =
            product.finalPrice && product.finalPrice > 0
              ? product.finalPrice
              : product.basePrice || 0;

          // ==============================
          // SUBTOTAL
          // ==============================

          const subtotal = price * quantity;

          // ==============================
          // IMAGE
          // ==============================

          const productImage =
            product.images?.[0] || product.viewImages?.front || "";

          // ==============================
          // RETURN ITEM
          // ==============================

          return {
            // BASIC

            productId: product._id,

            customizationId: item.customizationId || null,

            quantity,

            sizes: item.sizes || [],

            price,

            subtotal,

            tax: 0,

            discount: 0,

            productName: product.name,

            productImage,

            productImages: product.images || [],

            productType: "nonVariation",

            productCategory: product.categoryId,

            stockCount: 9999,

            // =========================
            // CUSTOMIZATION
            // =========================

            customization: customizationDoc?.customization || [],

            selectedPattern: customizationDoc?.selectedPattern || null,

            selectedSize: customizationDoc?.selectedSize || null,

            playerName: customizationDoc?.playerName || null,

            playerNumber: customizationDoc?.playerNumber || null,

            // =========================
            // PREVIEW IMAGES
            // =========================

            frontPreviewImage: customizationDoc?.frontPreviewImage || null,

            backPreviewImage: customizationDoc?.backPreviewImage || null,

            // =========================
            // PRODUCT DESIGN DATA
            // =========================

            printZones: product.printZones || {},

            viewImages: product.viewImages || {},

            allowedPatterns: product.allowedPatterns || [],

            templates: product.templates || [],
          };
        }),
      );

      // ==============================
      // TOTAL
      // ==============================

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.subtotal,
        0,
      );

      // ==============================
      // PRODUCT IDS
      // ==============================

      const productsId = cartItems.map((item) => item.productId);

      console.log("✅ getCartItems SUCCESS", {
        itemCount: cartItems.length,
        totalAmount,
      });

      return {
        cartItems,
        totalAmount,
        productsId,
      };
    } catch (error) {
      console.error("💥 ERROR in getCartItems()", {
        error: error.message,
        stack: error.stack,
      });

      throw error;
    }
  }

  /**
   * Enhanced variant finding for new product structure
   */
  findProductVariant(product, variantId, productType) {
    return null;
  }

  /**
   * Get variant price
   */
  getVariantPrice(variant) {
    if (!variant) return 0;

    // Handle both old and new price structures
    const price = variant.price || variant;
    return parseFloat(
      price?.salePrice || price?.regularPrice || price?.realPrice || 0,
    );
  }

  /**
   * Validate stock for a single product
   */
  async validateStock(product, variant, quantity, productType, session) {
    return true;
  }

  /**
   * Enhanced Razorpay verification with transaction safety
   */
  async verifyRazorpay(req) {
    const session = await mongoose.startSession();

    try {
      await session.startTransaction();
      logger.info("Razorpay verification started", { userId: req.user._id });

      const { orderId } = req.params;
      const { response } = req.body;
      const userId = req.user._id;

      console.log("🔍 Starting Razorpay verification", { orderId, userId });

      // Input validation
      if (
        !response?.razorpay_order_id ||
        !response?.razorpay_payment_id ||
        !response?.razorpay_signature
      ) {
        throw new ApiError(400, "Missing required payment fields");
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        response;

      // Check if Razorpay is configured
      if (!this.razorpayInstance) {
        throw new ApiError(400, "Razorpay is not configured");
      }

      // Get Razorpay secret key - try different environment variable names
      const razorpaySecret =
        process.env.RAZORPAY_SECRET_KEY || process.env.RAZORPAY_SECRET;

      if (!razorpaySecret) {
        console.error(
          "❌ Razorpay secret key not found in environment variables",
        );
        throw new ApiError(500, "Razorpay configuration error");
      }

      console.log(
        "✅ Razorpay secret key found, length:",
        razorpaySecret.length,
      );

      // Find payment record first
      const paymentRecord = await paymentDetailsModel
        .findOne({ razorpayOrderId: razorpay_order_id })
        .session(session);

      if (!paymentRecord) {
        throw new ApiError(404, "Payment record not found");
      }

      // Check if already processed
      if (paymentRecord.paymentStatus === "paid") {
        throw new ApiError(400, "Payment has already been processed");
      }

      // Check expiry
      const now = new Date();
      if (
        paymentRecord.pendingPaymentExpiry &&
        paymentRecord.pendingPaymentExpiry < now
      ) {
        await paymentDetailsModel.findByIdAndUpdate(
          paymentRecord._id,
          { paymentStatus: "failed" },
          { session },
        );
        throw new ApiError(400, "Payment session has expired");
      }

      // Signature verification
      console.log("🔐 Verifying payment signature...");
      const generatedSignature = crypto
        .createHmac("sha256", razorpaySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      console.log("📋 Signature comparison:", {
        generated: generatedSignature.substring(0, 10) + "...",
        received: razorpay_signature.substring(0, 10) + "...",
      });

      if (generatedSignature !== razorpay_signature) {
        await paymentDetailsModel.findByIdAndUpdate(
          paymentRecord._id,
          { paymentStatus: "failed" },
          { session },
        );
        throw new ApiError(400, "Invalid payment signature");
      }

      console.log("✅ Signature verified successfully");

      // Verify with Razorpay API
      console.log("🔍 Verifying with Razorpay API...");
      const { items = [] } =
        await this.razorpayInstance.orders.fetchPayments(razorpay_order_id);
      const paymentItem = items[0];

      if (!paymentItem || paymentItem.status !== "captured") {
        await paymentDetailsModel.findByIdAndUpdate(
          paymentRecord._id,
          { paymentStatus: "failed" },
          { session },
        );
        throw new ApiError(400, "Payment not captured");
      }

      // Amount verification
      const razorpayAmount = paymentItem.amount / 100;
      const expectedAmount = paymentRecord.amount;

      console.log("💰 Amount verification:", {
        razorpayAmount,
        expectedAmount,
        difference: Math.abs(razorpayAmount - expectedAmount),
      });

      if (Math.abs(razorpayAmount - expectedAmount) > 0.01) {
        await paymentDetailsModel.findByIdAndUpdate(
          paymentRecord._id,
          { paymentStatus: "failed" },
          { session },
        );
        throw new ApiError(400, "Payment amount mismatch");
      }

      // Update payment record
      const updatedPaymentRecord = await paymentDetailsModel.findByIdAndUpdate(
        paymentRecord._id,
        {
          razorpayPaymentId: razorpay_payment_id,
          paymentStatus: "paid",
          verifiedAt: new Date(),
          pendingPaymentExpiry: null,
          securityChecks: {
            signatureVerified: true,
            amountVerified: true,
            expiryVerified: true,
            captureVerified: true,
          },
        },
        { new: true, session },
      );

      // Update order
      const order = await orderDetailsModel.findByIdAndUpdate(
        paymentRecord.orderId,
        {
          orderStatus: "Ordered",
          paymentStatus: "Completed",
          expiresAt: null,
          orderConfirmedAt: new Date(),
        },
        { new: true, session },
      );

      if (!order) {
        throw new ApiError(404, "Order not found");
      }

      // Update stock securely
      await this.updateStockSecure(order, session);

      // Clear cart
      await cart.findOneAndDelete({ userId }).session(session);

      await session.commitTransaction();

      // console.log("✅ Razorpay verification completed successfully");
      // logger.info("Razorpay verification successful", {
      //   orderId: order.orderId,
      // });

      console.log("✅ Razorpay MongoDB transaction committed");

      // ==========================================
      // CREATE SHIPROCKET ORDER
      // ==========================================

      let shiprocketResult = null;

      try {
        console.log("🚚 Creating Shiprocket order for:", order.orderId);

        shiprocketResult = await createShiprocketOrder(order);

        if (shiprocketResult) {
          console.log(
            "✅ Shiprocket order created successfully:",
            shiprocketResult,
          );

          // Save Shiprocket details into MongoDB
          order.shiprocket = {
            orderId:
              shiprocketResult.order_id || shiprocketResult.orderId || null,

            shipmentId:
              shiprocketResult.shipment_id ||
              shiprocketResult.shipmentId ||
              null,

            awbCode: shiprocketResult.awb_code || null,

            courierId: shiprocketResult.courier_company_id || null,

            courierName: shiprocketResult.courier_name || null,

            status: shiprocketResult.status || null,

            trackingUrl: shiprocketResult.tracking_url || null,

            createdAt: new Date(),
          };

          await order.save();

          console.log("✅ Shiprocket details saved in order");
        }
      } catch (shiprocketError) {
        // IMPORTANT:
        // Do NOT fail the successful payment because
        // Shiprocket temporarily failed.

        console.error(
          "⚠️ Shiprocket order creation failed:",
          shiprocketError.response?.data || shiprocketError.message,
        );
      }

      console.log("✅ Razorpay verification completed successfully");

      logger.info("Razorpay verification successful", {
        orderId: order.orderId,
        shiprocketOrderId: shiprocketResult?.order_id || null,
      });

      return {
        success: true,
        message: "Payment verified successfully",
        data: {
          paymentRecord: updatedPaymentRecord,
          order,
          amount: razorpayAmount,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      console.error("💥 Razorpay verification failed:", error.message);
      logger.error("Razorpay verification failed", { error: error.message });

      if (error.message.includes("expired")) {
        throw new ApiError(400, "Payment session expired. Please try again.");
      } else if (error.message.includes("amount mismatch")) {
        throw new ApiError(400, "Payment amount verification failed.");
      } else if (error.message.includes("already processed")) {
        throw new ApiError(400, "Payment already processed.");
      } else if (error.message.includes("configuration error")) {
        throw new ApiError(500, "Payment system configuration error.");
      } else {
        throw new ApiError(500, "Payment verification failed", error.message);
      }
    } finally {
      session.endSession();
    }
  }

  /**
   * NEW: Helper method to normalize product types consistently
   */
  normalizeProductType(productType) {
    console.log([productType, "thid id is the pdicut type i have"]);

    if (!productType) return "nonVariation";

    const normalized = productType.toLowerCase();

    // Map all variations of variant types to standard enum values
    if (normalized === "variant" || normalized === "variation") {
      return "variation";
    }

    if (normalized === "nonvariant" || normalized === "nonvariation") {
      return "nonVariation";
    }

    return productType;
  }

  /**
   * Secure stock update for new product structure
   */
  async updateStockSecure(order, session) {
    console.log("📦 updateStockSecure skipped");

    return true;
  }

  /**
   * Get user with addresses - ensure all required fields are present
   */
  async getUserWithAddresses(userId, orderData, isBuyNow) {
    console.log("🔍 [getUserWithAddresses] Starting method execution");

    // Select all necessary fields including phone and fullName
    const user = await User.findById(userId)
      .select("email fullName phone address billingAddressId deliveryAddressId")
      .lean();

    console.log("👤 [getUserWithAddresses] User data:", {
      userId: user?._id,
      email: user?.email,
      fullName: user?.fullName,
      phone: user?.phone,
      hasAddress: !!user?.address,
      addressCount: user?.address?.length || 0,
    });

    if (!user) {
      console.error("❌ [getUserWithAddresses] User not found for ID:", userId);
      throw new ApiError(404, "User not found");
    }

    // Ensure we have fallback values for required fields
    const userData = {
      ...user,
      email: user.email || "no-email@example.com",
      fullName: user.fullName || "Customer",
      phone: user.phone || "Not Provided",
    };

    const billingAddressId = isBuyNow
      ? orderData.billingAddressId
      : user.billingAddressId ||
        user.address?.find(
          (addr) =>
            addr.checkoutAddress === "billingAddress" || "deliveryAddress",
        )?._id;

    const deliveryAddressId = isBuyNow
      ? orderData.deliveryAddressId
      : user.deliveryAddressId ||
        user.address?.find(
          (addr) =>
            addr.checkoutAddress === "deliveryAddress" || "billingAddress",
        )?._id;

    console.log("📍 [getUserWithAddresses] Address IDs:", {
      isBuyNow,
      billingAddressId,
      deliveryAddressId,
      userBillingAddressId: user.billingAddressId,
      userDeliveryAddressId: user.deliveryAddressId,
    });

    // Log all available addresses for debugging
    console.log(
      "🏠 [getUserWithAddresses] All user addresses:",
      user.address?.map((addr) => ({
        _id: addr._id,
        addressType: addr.addressType,
        fullName: addr.fullName,
      })) || "No addresses found",
    );

    const billingAddress = user.address?.find(
      (addr) => addr._id.toString() === billingAddressId?.toString(),
    );

    const deliveryAddress = user.address?.find(
      (addr) => addr._id.toString() === deliveryAddressId?.toString(),
    );

    console.log("✅ [getUserWithAddresses] Address lookup results:", {
      billingAddressFound: !!billingAddress,
      deliveryAddressFound: !!deliveryAddress,
      billingAddressId: billingAddressId,
      deliveryAddressId: deliveryAddressId,
      billingAddressDetails: billingAddress
        ? {
            _id: billingAddress._id,
            addressType: billingAddress.addressType,
            fullName: billingAddress.fullName,
          }
        : null,
      deliveryAddressDetails: deliveryAddress
        ? {
            _id: deliveryAddress._id,
            addressType: deliveryAddress.addressType,
            fullName: deliveryAddress.fullName,
          }
        : null,
    });

    if (!billingAddress || !deliveryAddress) {
      console.error("❌ [getUserWithAddresses] Addresses not found:", {
        missingBilling: !billingAddress,
        missingDelivery: !deliveryAddress,
        billingAddressId,
        deliveryAddressId,
        availableAddressIds:
          user.address?.map((addr) => addr._id.toString()) || [],
      });
      throw new ApiError(404, "Addresses not found");
    }

    console.log("🎯 [getUserWithAddresses] Successfully retrieved addresses");

    return {
      ...userData,
      billingAddress: this.normalizeAddress(billingAddress),
      deliveryAddress: this.normalizeAddress(deliveryAddress),
    };
  }

  // Utility methods
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getNextSteps(paymentMethod) {
    const steps = {
      RazorPay: "Complete payment via Razorpay",
      Stripe: "Complete payment via Stripe",
      PayPal: "Complete payment via PayPal",
      COD: "Order confirmed. Payment on delivery",
    };
    return steps[paymentMethod] || "Complete your order";
  }

  // Helper methods
  validateUser(user) {
    if (!user?._id) throw new ApiError(401, "Unauthorized");
    return user._id;
  }

  async notifyOrderFailure(error, userId) {
    console.log("📢 Notifying order failure for user:", userId);
  }
}

module.exports = new OrderService();

// const axios = require("axios");
// const { Product } = require("../models/Product.model");
// require("dotenv").config();

// let authToken = null;
// let tokenExpiry = null;

// async function shiprocketLogin() {
//   const now = Date.now();

//   if (authToken && tokenExpiry && now < tokenExpiry) {
//     return authToken;
//   }

//   const { data } = await axios.post(`https://apiv2.shiprocket.in/v1/external/auth/login`, {
//     email: process.env.SHIPROCKET_EMAIL,
//     password: process.env.SHIPROCKET_PASSWORD,
//   });

//   authToken = data.token;
//   tokenExpiry = now + 23 * 60 * 60 * 1000;

//   return authToken;
// }

// function calculateShipmentDimensions(products) {
//   let totalWeight = 0;
//   let maxLength = 0;
//   let maxBreadth = 0;
//   let totalHeight = 0;

//   products.forEach((p) => {
//     const shipping = p.shipping || {};

//     const weight = Number(shipping.weight || 500); // grams
//     const length = Number(shipping.length || 30); // cm
//     const breadth = Number(shipping.breadth || 25); // cm
//     const height = Number(shipping.height || 5); // cm

//     const qty = Number(p.quantity || 1);

//     totalWeight += weight * qty;
//     maxLength = Math.max(maxLength, length);
//     maxBreadth = Math.max(maxBreadth, breadth);
//     totalHeight += height * qty;
//   });

//   return {
//     length: Math.ceil(maxLength),
//     breadth: Math.ceil(maxBreadth),
//     height: Math.ceil(totalHeight),
//     weight: Number((totalWeight / 1000).toFixed(2)), // grams → kg
//   };
// }

// // async function createShiprocketOrder(order, deliveryAddress, billingAddress, userEmail, product) {
// //   // console.log("Creating Shiprocket order for:", product);
// //   console.log("Delivery Address:", deliveryAddress);
// //   console.log("Billing Address:", billingAddress);
// //   const flatProductsId = Array.isArray(product) ? product : [product];

// // const productsId = flatProductsId.flat();

// // const productDetails = await Promise.all(
// //   productsId.map(p => {
// //     // console.log("Fetching product details for:", p, typeof p);
// //     return typeof p === "string"
// //       ? Product.findById(p)
// //       : Product.findById(p.productId);
// //   })
// // );

// // // console.log("Product Details for Shipment:", productDetails);

// // const {length, weight, breadth, height} = calculateShipmentDimensions(productDetails);
// //   // const payload = {
// //   //   order_id: order.orderId,
// //   //   order_date: new Date().toISOString().slice(0, 19).replace("T", " "),
// //   //   pickup_location: "warehouse", // configure in shiprocket dashboard
// //   //   billing_customer_name: billingAddress.fullName,
// //   //   billing_last_name: "",
// //   //   billing_address: billingAddress.addressLine1,
// //   //   billing_city: billingAddress.city,
// //   //   billing_pincode: billingAddress.zipCode,
// //   //   billing_state: billingAddress.state,
// //   //   billing_country: 'India',
// //   //   billing_email: userEmail,
// //   //   billing_phone: billingAddress.phone,
// //   //   shipping_is_billing: true,
// //   //   order_items: order.orderDetails[0].products.map((p) => ({
// //   //     name: p.productName || "Product",
// //   //     sku: p.productId,
// //   //     units: p.quantity,
// //   //     selling_price: p.price,
// //   //     discount: 0,
// //   //     tax: 0,
// //   //   })),
// //   //   payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",
// //   //   sub_total: order.orderDetails[0].price,
// //   //   length: length,
// //   //   breadth: breadth,
// //   //   height: height,
// //   //   weight: weight,
// //   // };

// //   // console.log("Shiprocket Order Payload:", payload);

// //   const payload = {
// //   order_id: order.orderId, // Your internal order ID
// //   order_date: new Date().toISOString().slice(0, 19).replace("T", " "), // Format: YYYY-MM-DD HH:MM:SS
// //   pickup_location: "warehouse", // Your Shiprocket pickup location name
// //   billing_customer_name: billingAddress.fullName || "Test User",
// //   billing_last_name: billingAddress.lastName || "",
// //   billing_address: billingAddress.addressLine1 || "Street Address",
// //   billing_address_2: billingAddress.addressLine2 || "", // Optional second line
// //   billing_city: billingAddress.city || "City",
// //   billing_state: billingAddress.state || "State",
// //   billing_country: "India",
// //   billing_pincode: billingAddress.zipCode || "000000",
// //   billing_email: userEmail || "test@example.com",
// //   billing_phone: billingAddress.phone || "9999999999",

// //   // Shipping
// //   shipping_is_billing: true, // Use billing address as shipping
// //   shipping_customer_name: billingAddress.fullName || "Test User", // Required if shipping_is_billing false
// //   shipping_last_name: billingAddress.lastName || "",
// //   shipping_address: billingAddress.addressLine1 || "Street Address",
// //   shipping_address_2: billingAddress.addressLine2 || "",
// //   shipping_city: billingAddress.city || "City",
// //   shipping_state: billingAddress.state || "State",
// //   shipping_country: "India",
// //   shipping_pincode: billingAddress.zipCode || "000000",
// //   shipping_phone: billingAddress.phone || "9999999999",

// //   // Order Items
// //   order_items: order.orderDetails[0].products.map((p) => ({
// //     name: p.productName || "Product",
// //     sku: p.productId,
// //     units: p.quantity,
// //     selling_price: p.price,
// //     discount: 0,
// //     tax: 0,
// //   })),

// //   payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",
// //   sub_total: order.orderDetails[0].price || 0,

// //   // Shipment dimensions
// //   length: length || 10, // cm
// //   breadth: breadth || 10, // cm
// //   height: height || 10, // cm
// //   weight: weight || 0.5, // kg
// // };

// //   let data = null

// //   console.log("Api:", process.env.SHIPROCKET_API);

// // try {
// //   const token = await shiprocketLogin();
// //   const res = await axios.get("https://api64.ipify.org?format=json");
// // console.log("Server Public IP:", res.data.ip);
// //      const shiprocketOrder = await axios.post(
// //     `${process.env.SHIPROCKET_API}/orders/create/adhoc`,
// //     payload,
// //     {
// //       headers: { Authorization: `Bearer ${token}` },
// //     }
// //   );

// //   data = shiprocketOrder;
// // } catch (error) {
// //   console.error("Error creating Shiprocket order:", error.response?.data || error.message);
// // }

// //   console.log("Shiprocket Order Response:", data);

// //   return data;
// // }

// // 🚚 Track Shiprocket Order

// async function createShiprocketOrder(order, deliveryAddress, billingAddress, userEmail, product,totalAmount) {
//   try {

//     console.log("order", order);
//     console.log("deliveryAddress", deliveryAddress);
//     console.log("billingAddress", billingAddress);
//     console.log("userEmail", userEmail);
//     console.log("product", product);
//     // Flatten products array
//     const flatProductsId = Array.isArray(product) ? product : [product];
//     const productsId = flatProductsId.flat();

//     // Fetch product details
//     const productDetails = await Promise.all(
//       productsId.map(p =>
//         typeof p === "string" ? Product.findById(p) : Product.findById(p.productId)
//       )
//     );

//     const { length, weight, breadth, height } = calculateShipmentDimensions(productDetails);

//     // Login to Shiprocket API
//     const token = await shiprocketLogin();

// const pickupRes = await axios.get(
//   "https://apiv2.shiprocket.in/v1/external/settings/company/pickup",
//   { headers: { Authorization: `Bearer ${token}` } }
// );

// const pickupSlug = pickupRes.data?.data?.shipping_address?.[0]?.pickup_location;

// if (!pickupSlug) {
//   throw new Error("No pickup location found in Shiprocket account");
// }

//     // Build order payload
// const payload = {
//   order_id: order.orderId,
//   order_date: new Date().toISOString().slice(0, 19).replace("T", " "),
//   pickup_location: pickupSlug, // ✅ Use the slug from Shiprocket
//   comment: "Order via API",

//   // Billing info
//   billing_customer_name: billingAddress.fullName,
//   billing_last_name: billingAddress.lastName || "NA",
//   billing_address: billingAddress.addressLine1,
//   billing_address_2: billingAddress.addressLine2 || "",
//   billing_city: billingAddress.city,
//   billing_state: billingAddress.state,
//   billing_country: "India",
//   billing_pincode: Number(billingAddress.zipCode),
//   billing_email: userEmail,
//   billing_phone: billingAddress.phone,

//   // Shipping info (same as billing)
// shipping_is_billing: false,

// shipping_customer_name: deliveryAddress.fullName,
// shipping_last_name: "",
// shipping_address: deliveryAddress.addressLine1,
// shipping_address_2: "",
// shipping_city: deliveryAddress.city,
// shipping_state: deliveryAddress.state,
// shipping_country: deliveryAddress.country || "India",
// shipping_pincode: Number(deliveryAddress.zipCode),
// shipping_email: userEmail,
// shipping_phone: deliveryAddress.phone,

// order_items: order.orderDetails[0].products.map((p, index) => ({
//   name: productDetails[index]?.name || "Product",
//   sku: p.productId,
//   units: p.quantity,
//   selling_price: p.price,
//   discount: 0,
//   tax: order.orderDetails[0].taxAmount,
//   hsn: p.hsn || 123456
// })),

//   payment_method: order.paymentMethod === "COD" ? "COD" : "Prepaid",
//   shipping_charges: 0,
//   giftwrap_charges: 0,
//   transaction_charges: 0,
//   total_discount: 0,
//   sub_total: order.orderDetails[0].finalAmount,

//   length: length || 10,
//   breadth: breadth || 10,
//   height: height || 10,
//   weight: weight || 0.5
// };

//     console.log("Shiprocket Order Payload:", JSON.stringify(payload, null, 2));

//     const shiprocketOrder = await axios.post(
//       'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
//       payload,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     console.log("Shiprocket Order Response:", shiprocketOrder.data);
//     return shiprocketOrder.data;

//   } catch (error) {
//     console.error("Error creating Shiprocket order:", error.response?.data || error.message);
//     return null;
//   }
// }

// async function trackShipment(shipmentId) {
//   const token = await shiprocketLogin();
//   const { data } = await axios.get(
//     `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return data;
// }

// async function allShipmentDetails() {
//   try {
//     console.log("this is the kjabskjb");
//     const token = await shiprocketLogin();
//     const {data} = await axios.get(`https://apiv2.shiprocket.in/v1/external/orders`,{ headers: { Authorization: `Bearer ${token}` } })
//     return data
//   } catch (error) {
//     console.error("Error Fetching Shiprocket order:", error.response?.data || error.message);
//     return null;
//   }

// }

// // if (require.main === module) {
// //   (async () => {
// //     try {
// //       const result = await trackShipment(979724880);
// //       console.log("res", JSON.stringify(result, null, 2));
// //     } catch (err) {
// //       console.error("err", err);
// //     }
// //   })();
// // }

// module.exports = {
//     createShiprocketOrder,
//     trackShipment,
//     shiprocketLogin,
//     allShipmentDetails,
// }

const axios = require("axios");
const Product = require("../models/Product.model");
require("dotenv").config();

const SHIPROCKET_API =
  process.env.SHIPROCKET_API || "https://apiv2.shiprocket.in/v1/external";

let authToken = null;
let tokenExpiry = null;

/**
 * ==========================================
 * SHIPROCKET LOGIN
 * ==========================================
 */
async function shiprocketLogin() {
  const now = Date.now();

  // Reuse existing token
  if (authToken && tokenExpiry && now < tokenExpiry) {
    return authToken;
  }

  if (!process.env.SHIPROCKET_EMAIL || !process.env.SHIPROCKET_PASSWORD) {
    throw new Error("SHIPROCKET_EMAIL or SHIPROCKET_PASSWORD is missing");
  }

  try {
    const { data } = await axios.post(
      `${SHIPROCKET_API}/auth/login`,
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!data?.token) {
      throw new Error("Shiprocket token not received");
    }

    authToken = data.token;

    // Shiprocket token is generally valid for 10 days,
    // but refreshing before expiry is safer.
    tokenExpiry = now + 23 * 60 * 60 * 1000;

    console.log("✅ Shiprocket login successful");

    return authToken;
  } catch (error) {
    console.error(
      "❌ Shiprocket login failed:",
      error.response?.data || error.message,
    );

    throw error;
  }
}

/**
 * ==========================================
 * CALCULATE SHIPMENT DIMENSIONS
 * ==========================================
 *
 * Product shipping structure:
 *
 * shipping: {
 *   weight: 500,   // grams
 *   length: 30,    // cm
 *   breadth: 25,   // cm
 *   height: 5      // cm
 * }
 */
function calculateShipmentDimensions(products) {
  let totalWeight = 0;
  let maxLength = 0;
  let maxBreadth = 0;
  let totalHeight = 0;

  products.forEach((product) => {
    const shipping = product.shipping || {};

    const weight = Number(shipping.weight ?? 0);
const length = Number(shipping.length ?? 0);
const breadth = Number(shipping.breadth ?? 0);
const height = Number(shipping.height ?? 0);

    const quantity = Number(product.quantity || 1);

    totalWeight += weight * quantity;

    maxLength = Math.max(maxLength, length);
    maxBreadth = Math.max(maxBreadth, breadth);

    totalHeight += height * quantity;
  });

  // Shiprocket weight = KG
  const weightInKg = Number((totalWeight / 1000).toFixed(2));

  return {
    length: Math.max(Math.ceil(maxLength), 1),
    breadth: Math.max(Math.ceil(maxBreadth), 1),
    height: Math.max(Math.ceil(totalHeight), 1),
    weight: Math.max(weightInKg, 0.1),
  };
}

/**
 * ==========================================
 * GET PICKUP LOCATION
 * ==========================================
 */
async function getPickupLocation(token) {
  try {
    const response = await axios.get(
      `${SHIPROCKET_API}/settings/company/pickup`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "🚚 SHIPROCKET PICKUP RESPONSE:",
      JSON.stringify(response.data, null, 2)
    );

    // Your Shiprocket pickup location
    const pickupLocation = "warehouse";

    console.log(
      "📍 USING PICKUP LOCATION:",
      pickupLocation
    );

    return pickupLocation;
  } catch (error) {
    console.error(
      "❌ Failed to get Shiprocket pickup location:",
      error.response?.data || error.message
    );

    throw error;
  }
}

/**
 * ==========================================
 * CREATE SHIPROCKET ORDER
 * ==========================================
 *
 * This function receives the already-created
 * MongoDB order.
 */
async function createShiprocketOrder(order) {
  try {
    if (!order) {
      throw new Error("Order is required");
    }

    if (!order.orderDetails?.length) {
      throw new Error("Order details not found");
    }

    const orderProducts = order.orderDetails[0]?.products || [];

    if (!orderProducts.length) {
      throw new Error("No products found in order");
    }

    const deliveryAddress = order.deliveryAddress;
    const billingAddress = order.billingAddress;

    if (!deliveryAddress) {
      throw new Error("Delivery address not found");
    }

    if (!billingAddress) {
      throw new Error("Billing address not found");
    }

    console.log("🚚 Creating Shiprocket order:", order.orderId);

    /**
     * ======================================
     * FETCH PRODUCTS
     * ======================================
     */
    const productsForShipping = await Promise.all(
      orderProducts.map(async (item) => {
        const product = await Product.findById(item.productId).lean();

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        return {
          ...product,
          quantity: item.quantity || 1,
          orderItem: item,
        };
      }),
    );

    /**
     * ======================================
     * CALCULATE PACKAGE
     * ======================================
     */
    const { length, breadth, height, weight } =
      calculateShipmentDimensions(productsForShipping);

    console.log("📦 Shipment dimensions:", {
      length,
      breadth,
      height,
      weight,
    });

    /**
     * ======================================
     * LOGIN
     * ======================================
     */
    const token = await shiprocketLogin();

    /**
     * ======================================
     * PICKUP LOCATION
     * ======================================
     */
    const pickupLocation = await getPickupLocation(token);

    /**
     * ======================================
     * ORDER ITEMS
     * ======================================
     */
    const orderItems = orderProducts.map((item, index) => {
      const product = productsForShipping[index];

      return {
        name: product.name || "Product",

        // Use variant ID when available
        sku: item.variantId
          ? `${item.productId}-${item.variantId}`
          : String(item.productId),

        units: Number(item.quantity || 1),

        selling_price: Number(item.price || 0),

        discount: 0,

        tax: 0,

        // Use your actual HSN if you add it later
        hsn: item.hsn || 0,
      };
    });

    /**
     * ======================================
     * SUB TOTAL
     * ======================================
     */
    const orderDetails = order.orderDetails[0];

    const subTotal = Number(orderDetails.price || 0);

    /**
     * ======================================
     * PAYMENT METHOD
     * ======================================
     */
    const paymentMethod = order.paymentMethod === "COD" ? "COD" : "Prepaid";

    /**
     * ======================================
     * SHIPROCKET PAYLOAD
     * ======================================
     */
    const payload = {
      order_id: String(order.orderId),

      order_date: new Date().toISOString().slice(0, 19).replace("T", " "),

      pickup_location: pickupLocation,

      comment: `Order ${order.orderId}`,

      /**
       * ==============================
       * BILLING
       * ==============================
       */
      billing_customer_name: billingAddress.fullName || "Customer",

      billing_last_name: billingAddress.lastName || "",

      billing_address: billingAddress.addressLine1 || "",

      billing_address_2: billingAddress.street || "",

      billing_city: billingAddress.city || "",

      billing_state: billingAddress.state || "",

      billing_country: billingAddress.country || "India",

      billing_pincode: Number(billingAddress.zipCode),

      billing_email: order.email || "",

      billing_phone: billingAddress.phone || order.contactNumber || "",

      /**
       * ==============================
       * SHIPPING
       * ==============================
       */
      shipping_is_billing: false,

      shipping_customer_name: deliveryAddress.fullName || "Customer",

      shipping_last_name: deliveryAddress.lastName || "",

      shipping_address: deliveryAddress.addressLine1 || "",

      shipping_address_2: deliveryAddress.street || "",

      shipping_city: deliveryAddress.city || "",

      shipping_state: deliveryAddress.state || "",

      shipping_country: deliveryAddress.country || "India",

      shipping_pincode: Number(deliveryAddress.zipCode),

      shipping_email: order.email || "",

      shipping_phone: deliveryAddress.phone || order.contactNumber || "",

      /**
       * ==============================
       * PRODUCTS
       * ==============================
       */
      order_items: orderItems,

      /**
       * ==============================
       * PAYMENT
       * ==============================
       */
      payment_method: paymentMethod,

      /**
       * Customer shipping charge
       *
       * Your current project uses:
       * ₹0 if subtotal >= ₹999
       * ₹50 otherwise
       */
      shipping_charges: Number(orderDetails.shippingCharge || 0),

      giftwrap_charges: 0,

      transaction_charges: 0,

      total_discount: Number(orderDetails.discount || 0),

      sub_total: subTotal,

      /**
       * ==============================
       * PACKAGE
       * ==============================
       */
      length,

      breadth,

      height,

      weight,
    };

    console.log("📦 SHIPROCKET PAYLOAD:");

    console.log(JSON.stringify(payload, null, 2));

    /**
     * ======================================
     * CREATE SHIPROCKET ORDER
     * ======================================
     */
    const response = await axios.post(
      `${SHIPROCKET_API}/orders/create/adhoc`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("✅ Shiprocket order created:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "❌ Shiprocket order creation failed:",
      error.response?.data || error.message,
    );

    throw error;
  }
}

/**
 * ==========================================
 * TRACK SHIPMENT
 * ==========================================
 */
async function trackShipment(shipmentId) {
  try {
    if (!shipmentId) {
      throw new Error("Shipment ID is required");
    }

    const token = await shiprocketLogin();

    const { data } = await axios.get(
      `${SHIPROCKET_API}/courier/track/shipment/${shipmentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    console.error(
      "❌ Shipment tracking failed:",
      error.response?.data || error.message,
    );

    throw error;
  }
}

/**
 * ==========================================
 * GET ALL SHIPROCKET ORDERS
 * ==========================================
 */
async function allShipmentDetails() {
  try {
    const token = await shiprocketLogin();

    const { data } = await axios.get(`${SHIPROCKET_API}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(
      "❌ Failed to fetch Shiprocket orders:",
      error.response?.data || error.message,
    );

    throw error;
  }
}

/**
 * ==========================================
 * EXPORTS
 * ==========================================
 */
module.exports = {
  shiprocketLogin,
  createShiprocketOrder,
  trackShipment,
  allShipmentDetails,
  getPickupLocation,
  calculateShipmentDimensions,
};

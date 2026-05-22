const Product = require("../../../models/Product.model");
const Template = require("../../../models/template.model");
const DesignZone = require("../../../models/designZone.model");
const Customization = require("../../../models/customization.model");
const ApiError = require("../../../utils/apiError");
const { uploadToCloud } = require("../../../utils/uploadFileToS3");
const Cart = require("../../../models/cart.model");


// const getCustomizer = async (req) => {
//   const { productId } = req.params;

//   const product = await Product.findById(productId).lean();
//   if (!product) {
//     throw new Error("Product not found");
//   }

//   const templates = await Template.find({
//     _id: { $in: product.templates }
//   }).lean();

//   let customization = [];

//   for (const template of templates) {
//     for (const zone of template.zones) {

//       const zoneData = await DesignZone.findById(zone.zoneId).lean();
//       if (!zoneData) continue;

  
//       const fields = zoneData.allowedFields.filter(field =>
//         zone.activeFields.includes(field.fieldName)
//       );

//       customization.push({
//         zoneKey: zone.zoneKey,
//         zoneName: zoneData.zoneName,
//         meshNames: zoneData.meshNames, 
//         fields
//       });
//     }
//   }

//   return {
//     success: true,
//     data: {
//       productSnapshot: {
//         _id: product._id,
//         name: product.name,
//         glbUrl: product.glbUrl,
//         basePrice: product.basePrice
//       },
//       customization
//     }
//   };
// };


// const saveCustomization = async (req) => {
//   const { productId, customizationId } = req.body;

//   console.log("req body",req.body)

//   if (!productId) {
//     throw new ApiError(400, "productId is required");
//   }

//   let customization = [];

//   // 1️⃣ Parse JSON fields
//   if (req.body.customization) {
//     customization = JSON.parse(req.body.customization);
//   }

//   // 2️⃣ Handle file uploads dynamically
//   if (req.files && req.files.length > 0) {
//     for (const file of req.files) {

//       // Example: logo_front → split
//       const [fieldName, zoneKey] = file.fieldname.split("_");

//       const fileUrl = await uploadToCloud(file, "customization/logo");
// A
//       customization.push({
//         zoneKey,
//         fieldName,
//         value: fileUrl
//       });
//     }
//   }

// const product = await Product.findById(productId).lean();

// console.log("Saving customization for product:", productId);
// console.log("product:", product);
// if (!product) {
//   throw new ApiError(404, "Product not found");
// }

// const userId = req.user?._id || null;
// const guestId = req.headers["guestid"] || null;

// let data;

// if (customizationId) {

//   // ✅ UPDATE EXISTING
//   data = await Customization.findByIdAndUpdate(
//     customizationId,
//     {
//       customization,

//       productSnapshot: {
//         name: product.name,
//         glbUrl: product.glbUrl,
//         basePrice: product.basePrice,
//         totalPrice: product.basePrice,
//       },
//     },
//     {
//       new: true,
//     }
//   );

// } else {

//   // ✅ CREATE NEW
//   data = await Customization.create({
//     userId,
//     guestId,
//     productId,

//     productSnapshot: {
//       name: product.name,
//       glbUrl: product.glbUrl,
//       basePrice: product.basePrice,
//       totalPrice: product.basePrice,
//     },

//     customization,
//   });

// }



//   return {
//     success: true,
//     message: "Customization saved successfully",
//     data
//   };
// };



// const getCustomizationById = async (req) => {
//   const { customizationId } = req.params;

//   // customization
//   const customization =
//     await Customization.findById(customizationId).lean();

//   if (!customization) {
//     throw new ApiError(
//       404,
//       "Customization not found"
//     );
//   }

//   // 🔥 FIND CART
//   const cart = await Cart.findOne({
//     "items.customizationId": customizationId,
//   }).lean();

//   // 🔥 FIND ITEM
//   const cartItem = cart?.items?.find(
//     (item) =>
//       String(item.customizationId) ===
//       String(customizationId)
//   );

//   console.log(
//     "cartItem",
//     cartItem
//   );

//   return {
//     success: true,
//     data: {
//       ...customization,

//       // ✅ SIZES
//       sizes: cartItem?.sizes || [],
//     },
//   };
// };


const getCustomizer = async (req) => {
  const { productId } = req.params;

  const product = await Product.findOne({ _id: productId }).lean();
  if (!product) throw new Error("Product not found");

  const templates = await Template.find({
    _id: { $in: product.templates }
  }).lean();

  let customization = [];

  for (const template of templates) {
    for (const zone of template.zones) {
      const zoneData = await DesignZone.findOne({ _id: zone.zoneId }).lean();
      if (!zoneData) continue;

      const fields = zoneData.allowedFields.filter(field =>
        zone.activeFields.includes(field.fieldName)
      );

      customization.push({
        zoneKey: zone.zoneKey,
        zoneName: zoneData.zoneName,
        meshNames: zoneData.meshNames,
        fields
      });
    }
  }

  return {
    success: true,
    data: {
      productSnapshot: {
        _id: product._id,
        name: product.name,
        glbUrl: product.glbUrl,
        basePrice: product.basePrice
      },
      customization
    }
  };
};


const saveCustomization = async (req) => {
  const { productId, customizationId } = req.body;

  console.log("req body", req.body);

  if (!productId) throw new ApiError(400, "productId is required");

  let customization = [];

  if (req.body.customization) {
    customization = JSON.parse(req.body.customization);
  }

  // Handle file uploads
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const [fieldName, zoneKey] = file.fieldname.split("_");
      const fileUrl = await uploadToCloud(file, "customization/logo"); // ← typo 'A' removed
      customization.push({ zoneKey, fieldName, value: fileUrl });
    }
  }

  // ✅ UUID-safe lookup
  const product = await Product.findOne({ _id: productId }).lean();

  console.log("Saving customization for product:", productId);
  console.log("product:", product);

  if (!product) throw new ApiError(404, "Product not found");

  const userId = req.user?._id || null;
  const guestId = req.headers["guestid"] || null;

  let data;

  if (customizationId) {
    // ✅ UPDATE
    data = await Customization.findOneAndUpdate(
      { _id: customizationId },
      {
        customization,
        productSnapshot: {
          name: product.name,
          glbUrl: product.glbUrl,
          basePrice: product.basePrice,
          totalPrice: product.basePrice,
        },
      },
      { new: true }
    );
  } else {
    // ✅ CREATE
    data = await Customization.create({
      userId,
      guestId,
      productId,
      productSnapshot: {
        name: product.name,
        glbUrl: product.glbUrl,
        basePrice: product.basePrice,
        totalPrice: product.basePrice,
      },
      customization,
    });
  }

  return {
    success: true,
    message: "Customization saved successfully",
    data
  };
};


const getCustomizationById = async (req) => {
  const { customizationId } = req.params;

  // ✅ UUID-safe
  const customization = await Customization.findOne({ _id: customizationId }).lean();
  if (!customization) throw new ApiError(404, "Customization not found");

  const cart = await Cart.findOne({
    "items.customizationId": customizationId,
  }).lean();

  const cartItem = cart?.items?.find(
    (item) => String(item.customizationId) === String(customizationId)
  );

  console.log("cartItem", cartItem);

  return {
    success: true,
    data: {
      ...customization,
      sizes: cartItem?.sizes || [],
    },
  };
};
  
module.exports = {
  getCustomizer,
  saveCustomization,
  getCustomizationById
};
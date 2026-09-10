// const Product = require("../../../models/Product.model");
// const Template = require("../../../models/template.model");
// const DesignZone = require("../../../models/designZone.model");
// const Customization = require("../../../models/customization.model");
// const ApiError = require("../../../utils/apiError");
// const { uploadToCloud } = require("../../../utils/uploadFileToS3");
// const Cart = require("../../../models/cart.model");

// const COTTON_CUSTOMIZATION_TYPE = "CUSTOM_COTTON_TEES";
// const COTTON_TYPES = ["OUR_DESIGN", "UPLOAD_DESIGN"];
// const IMAGE_MIMETYPES = new Set([
//   "image/png",
//   "image/jpg",
//   "image/jpeg",
//   "image/avif",
//   "image/webp",
// ]);

// const getOwner = (req) => ({
//   userId: req.user?._id || null,
//   guestId: req.headers.guestid || req.headers["guest-id"] || null,
// });

// const getProductSnapshot = (product) => ({
//   _id: product._id,
//   name: product.name,
//   basePrice: product.basePrice,
//   finalPrice: product.finalPrice,
//   glbUrl: product.glbUrl,
//   frontImage: product.cottonTee?.frontImage || product.viewImages?.front || "",
//   backImage: product.cottonTee?.backImage || product.viewImages?.back || "",
// });

// const parseCustomization = (value) => {
//   if (!value) return [];

//   let parsed;
//   try {
//     parsed = typeof value === "string" ? JSON.parse(value) : value;
//   } catch (error) {
//     throw new ApiError(400, "Invalid customization data");
//   }

//   if (!Array.isArray(parsed)) {
//     throw new ApiError(400, "customization must be an array");
//   }

//   return parsed;
// };

// const validateCottonTransform = (item) => {
//   if (!item.fieldName?.endsWith("Transform")) return;

//   let transform;
//   try {
//     transform = typeof item.value === "string" ? JSON.parse(item.value) : item.value;
//   } catch (error) {
//     throw new ApiError(400, "Invalid transform data");
//   }

//   const valid = transform &&
//     Number.isFinite(Number(transform.x)) &&
//     Number(transform.x) >= 0 && Number(transform.x) <= 100 &&
//     Number.isFinite(Number(transform.y)) &&
//     Number(transform.y) >= 0 && Number(transform.y) <= 100 &&
//     Number.isFinite(Number(transform.scale)) && Number(transform.scale) > 0 &&
//     Number.isFinite(Number(transform.rotation)) && Math.abs(Number(transform.rotation)) <= 360;

//   if (!valid) throw new ApiError(400, "Invalid transform data");

//   item.value = JSON.stringify({
//     x: Number(transform.x),
//     y: Number(transform.y),
//     scale: Number(transform.scale),
//     rotation: Number(transform.rotation),
//   });
// };

// const validateCottonFiles = (files) => {
//   for (const file of files) {
//     if (!["frontDesign", "backDesign", "cottonLogo"].includes(file.fieldname)) {
//       throw new ApiError(400, `Unsupported cotton customization file: ${file.fieldname}`);
//     }
//     if (!IMAGE_MIMETYPES.has(file.mimetype)) {
//       throw new ApiError(400, `${file.fieldname} must be an image`);
//     }
//   }
// };

// const saveCottonUploadCustomization = async (req, product, existingData = null) => {
//   const files = req.files || [];
//   validateCottonFiles(files);

//   const frontDesign = files.find((file) => file.fieldname === "frontDesign");
//   const backDesign = files.find((file) => file.fieldname === "backDesign");
//   const logo = files.find((file) => file.fieldname === "cottonLogo");
//   const existingItems = existingData?.customization || [];
//   const existingFront = existingItems.find((item) => item.fieldName === "frontDesign")?.value;
//   const existingBack = existingItems.find((item) => item.fieldName === "backDesign")?.value;

//   if (!frontDesign && !existingFront) throw new ApiError(400, "Front design is required");
//   if (!backDesign && !existingBack) throw new ApiError(400, "Back design is required");

//   const submittedCustomization = parseCustomization(req.body.customization);
//   const customizationMap = new Map();
//   [...existingItems, ...submittedCustomization].forEach((item) => {
//     customizationMap.set(`${item.zoneKey}:${item.fieldName}`, { ...item });
//   });
//   const customization = [...customizationMap.values()];
//   customization.forEach(validateCottonTransform);

//   const [frontUrl, backUrl, logoUrl] = await Promise.all([
//     frontDesign ? uploadToCloud(frontDesign, "customization/cotton-tees") : null,
//     backDesign ? uploadToCloud(backDesign, "customization/cotton-tees") : null,
//     logo ? uploadToCloud(logo, "customization/cotton-tees") : null,
//   ]);

//   const upsert = (zoneKey, fieldName, value) => {
//     const index = customization.findIndex(
//       (item) => item.zoneKey === zoneKey && item.fieldName === fieldName,
//     );
//     const item = { zoneKey, fieldName, value };
//     if (index === -1) customization.push(item);
//     else customization[index] = { ...customization[index], ...item };
//   };

//   if (frontUrl) upsert("front", "frontDesign", frontUrl);
//   if (backUrl) upsert("back", "backDesign", backUrl);
//   if (logoUrl) upsert("front", "logo", logoUrl);

//   return customization;
// };

// const assertCustomizationOwner = (req, customization) => {
//   const { userId, guestId } = getOwner(req);
//   const ownsUser = userId && String(customization.userId) === String(userId);
//   const ownsGuest = guestId && String(customization.guestId) === String(guestId);
//   if (!ownsUser && !ownsGuest) {
//     throw new ApiError(403, "You are not allowed to modify this customization");
//   }
// };

// const getCottonProduct = (product) => {
//   if (product.customizationType !== COTTON_CUSTOMIZATION_TYPE) {
//     throw new ApiError(400, "Product is not a Custom Cotton Tee");
//   }
//   if (!COTTON_TYPES.includes(product.cottonTeeType)) {
//     throw new ApiError(400, "Invalid Custom Cotton Tee type");
//   }
//   return product;
// };


// // const getCustomizer = async (req) => {
// //   const { productId } = req.params;

// //   const product = await Product.findById(productId).lean();
// //   if (!product) {
// //     throw new Error("Product not found");
// //   }

// //   const templates = await Template.find({
// //     _id: { $in: product.templates }
// //   }).lean();

// //   let customization = [];

// //   for (const template of templates) {
// //     for (const zone of template.zones) {

// //       const zoneData = await DesignZone.findById(zone.zoneId).lean();
// //       if (!zoneData) continue;

  
// //       const fields = zoneData.allowedFields.filter(field =>
// //         zone.activeFields.includes(field.fieldName)
// //       );

// //       customization.push({
// //         zoneKey: zone.zoneKey,
// //         zoneName: zoneData.zoneName,
// //         meshNames: zoneData.meshNames, 
// //         fields
// //       });
// //     }
// //   }

// //   return {
// //     success: true,
// //     data: {
// //       productSnapshot: {
// //         _id: product._id,
// //         name: product.name,
// //         glbUrl: product.glbUrl,
// //         basePrice: product.basePrice
// //       },
// //       customization
// //     }
// //   };
// // };


// // const saveCustomization = async (req) => {
// //   const { productId, customizationId } = req.body;

// //   console.log("req body",req.body)

// //   if (!productId) {
// //     throw new ApiError(400, "productId is required");
// //   }

// //   let customization = [];

// //   // 1️⃣ Parse JSON fields
// //   if (req.body.customization) {
// //     customization = JSON.parse(req.body.customization);
// //   }

// //   // 2️⃣ Handle file uploads dynamically
// //   if (req.files && req.files.length > 0) {
// //     for (const file of req.files) {

// //       // Example: logo_front → split
// //       const [fieldName, zoneKey] = file.fieldname.split("_");

// //       const fileUrl = await uploadToCloud(file, "customization/logo");
// // A
// //       customization.push({
// //         zoneKey,
// //         fieldName,
// //         value: fileUrl
// //       });
// //     }
// //   }

// // const product = await Product.findById(productId).lean();

// // console.log("Saving customization for product:", productId);
// // console.log("product:", product);
// // if (!product) {
// //   throw new ApiError(404, "Product not found");
// // }

// // const userId = req.user?._id || null;
// // const guestId = req.headers["guestid"] || null;

// // let data;

// // if (customizationId) {

// //   // ✅ UPDATE EXISTING
// //   data = await Customization.findByIdAndUpdate(
// //     customizationId,
// //     {
// //       customization,

// //       productSnapshot: {
// //         name: product.name,
// //         glbUrl: product.glbUrl,
// //         basePrice: product.basePrice,
// //         totalPrice: product.basePrice,
// //       },
// //     },
// //     {
// //       new: true,
// //     }
// //   );

// // } else {

// //   // ✅ CREATE NEW
// //   data = await Customization.create({
// //     userId,
// //     guestId,
// //     productId,

// //     productSnapshot: {
// //       name: product.name,
// //       glbUrl: product.glbUrl,
// //       basePrice: product.basePrice,
// //       totalPrice: product.basePrice,
// //     },

// //     customization,
// //   });

// // }



// //   return {
// //     success: true,
// //     message: "Customization saved successfully",
// //     data
// //   };
// // };



// // const getCustomizationById = async (req) => {
// //   const { customizationId } = req.params;

// //   // customization
// //   const customization =
// //     await Customization.findById(customizationId).lean();

// //   if (!customization) {
// //     throw new ApiError(
// //       404,
// //       "Customization not found"
// //     );
// //   }

// //   // 🔥 FIND CART
// //   const cart = await Cart.findOne({
// //     "items.customizationId": customizationId,
// //   }).lean();

// //   // 🔥 FIND ITEM
// //   const cartItem = cart?.items?.find(
// //     (item) =>
// //       String(item.customizationId) ===
// //       String(customizationId)
// //   );

// //   console.log(
// //     "cartItem",
// //     cartItem
// //   );

// //   return {
// //     success: true,
// //     data: {
// //       ...customization,

// //       // ✅ SIZES
// //       sizes: cartItem?.sizes || [],
// //     },
// //   };
// // };


// const getCustomizer = async (req) => {
//   const { productId } = req.params;

//   const product = await Product.findOne({ _id: productId }).lean();
//   if (!product) throw new ApiError(404, "Product not found");

//   if (product.customizationType === COTTON_CUSTOMIZATION_TYPE) {
//     getCottonProduct(product);

//     const cottonProduct = {
//       _id: product._id,
//       name: product.name,
//       customizationType: product.customizationType,
//       cottonTeeType: product.cottonTeeType,
//       cottonTee: product.cottonTee,
//       basePrice: product.basePrice,
//       finalPrice: product.finalPrice,
//     };

//     if (product.cottonTeeType === "OUR_DESIGN") {
//       return {
//         success: true,
//         data: {
//           product: cottonProduct,
//           customizationRequired: false,
//           customization: [],
//         },
//       };
//     }

//     return {
//       success: true,
//       data: {
//         product: cottonProduct,
//         customizationRequired: true,
//         customization: {
//           front: { image: product.cottonTee?.frontImage || "", printableArea: "A4" },
//           back: { image: product.cottonTee?.backImage || "", printableArea: "A4" },
//           logo: { optional: true },
//         },
//       },
//     };
//   }

//   const templates = await Template.find({
//     _id: { $in: product.templates }
//   }).lean();

//   let customization = [];

//   for (const template of templates) {
//     for (const zone of template.zones) {
//       const zoneData = await DesignZone.findOne({ _id: zone.zoneId }).lean();
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
//         basePrice: product.basePrice,
//         finalPrice: product.finalPrice,
//       },
//       customization
//     }
//   };
// };


// const saveCustomization = async (req) => {
//   const { productId, customizationId } = req.body;

//   if (!productId) throw new ApiError(400, "productId is required");

//   // ✅ UUID-safe lookup
//   const product = await Product.findOne({ _id: productId }).lean();
//   if (!product) throw new ApiError(404, "Product not found");

//   if (product.customizationType === COTTON_CUSTOMIZATION_TYPE) {
//     getCottonProduct(product);

//     if (product.cottonTeeType === "OUR_DESIGN") {
//       if (req.files?.length) {
//         throw new ApiError(400, "OUR_DESIGN does not accept customization files");
//       }
//       return {
//         success: true,
//         customizationRequired: false,
//         customizationId: null,
//         productId: product._id,
//       };
//     }

//     const { userId, guestId } = getOwner(req);
//     let data;
//     let existingData = null;

//     if (customizationId) {
//       const owner = getOwner(req);
//       const ownerFilter = owner.userId
//         ? { userId: owner.userId }
//         : owner.guestId
//           ? { guestId: owner.guestId }
//           : null;
//       if (!ownerFilter) throw new ApiError(403, "Customization owner is required");

//       data = await Customization.findOne({ _id: customizationId, ...ownerFilter });
//       if (!data) throw new ApiError(404, "Customization not found");
//       if (String(data.productId) !== String(product._id)) {
//         throw new ApiError(400, "Customization product does not match");
//       }
//       existingData = data;
//     }

//     const customization = await saveCottonUploadCustomization(req, product, existingData);

//     if (existingData) {
//       data = existingData;
//       data.customization = customization;
//       data.customizationType = COTTON_CUSTOMIZATION_TYPE;
//       data.cottonTeeType = product.cottonTeeType;
//       data.productSnapshot = getProductSnapshot(product);
//       await data.save();
//     } else {
//       data = await Customization.create({
//         userId,
//         guestId,
//         productId: product._id,
//         customizationType: COTTON_CUSTOMIZATION_TYPE,
//         cottonTeeType: product.cottonTeeType,
//         productSnapshot: getProductSnapshot(product),
//         customization,
//       });
//     }

//     return {
//       success: true,
//       message: "Customization saved successfully",
//       customizationId: data._id,
//       productId: product._id,
//       data,
//     };
//   }

//   let customization = parseCustomization(req.body.customization);

//   // Existing Jersey upload behavior remains dynamic and unchanged.
//   if (req.files && req.files.length > 0) {
//     for (const file of req.files) {
//       const [fieldName, zoneKey] = file.fieldname.split("_");
//       const fileUrl = await uploadToCloud(file, "customization/logo");
//       customization.push({ zoneKey, fieldName, value: fileUrl });
//     }
//   }

//   const userId = req.user?._id || null;
//   const guestId = req.headers["guestid"] || req.headers["guest-id"] || null;

//   let data;

//   if (customizationId) {
//     // ✅ UPDATE
//     data = await Customization.findOneAndUpdate(
//       { _id: customizationId },
//       {
//         customization,
//         productSnapshot: {
//           _id: product._id,
//           name: product.name,
//           glbUrl: product.glbUrl,
//           basePrice: product.basePrice,
//           finalPrice: product.finalPrice,
//         },
//       },
//       { new: true }
//     );
//   } else {
//     // ✅ CREATE
//     data = await Customization.create({
//       userId,
//       guestId,
//       productId,
//       productSnapshot: {
//         _id: product._id,
//         name: product.name,
//         glbUrl: product.glbUrl,
//         basePrice: product.basePrice,
//         finalPrice: product.finalPrice,
//       },
//       customization,
//     });
//   }

//   return {
//     success: true,
//     message: "Customization saved successfully",
//     data
//   };
// };


// const getCustomizationById = async (req) => {
//   const { customizationId } = req.params;

//   // ✅ UUID-safe
//   const customization = await Customization.findOne({ _id: customizationId }).lean();
//   if (!customization) throw new ApiError(404, "Customization not found");

//   if (customization.customizationType === COTTON_CUSTOMIZATION_TYPE) {
//     assertCustomizationOwner(req, customization);
//   }

//   const cart = await Cart.findOne({
//     "items.customizationId": customizationId,
//   }).lean();

//   const cartItem = cart?.items?.find(
//     (item) => String(item.customizationId) === String(customizationId)
//   );

//   console.log("cartItem", cartItem);

//   return {
//     success: true,
//     data: {
//       ...customization,
//       sizes: cartItem?.sizes || [],
//     },
//   };
// };

// module.exports = {
//   getCustomizer,
//   saveCustomization,
//   getCustomizationById
// };
















const Product = require("../../../models/Product.model");
const Template = require("../../../models/template.model");
const DesignZone = require("../../../models/designZone.model");
const Customization = require("../../../models/customization.model");
const ApiError = require("../../../utils/apiError");
const { uploadToCloud } = require("../../../utils/uploadFileToS3");
const Cart = require("../../../models/cart.model");

const COTTON_CUSTOMIZATION_TYPE = "CUSTOM_COTTON_TEES";
const COTTON_TYPES = ["OUR_DESIGN", "UPLOAD_DESIGN"];
const IMAGE_MIMETYPES = new Set([
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/avif",
  "image/webp",
]);

const getOwner = (req) => ({
  userId: req.user?._id || null,
  guestId: req.headers.guestid || req.headers["guest-id"] || null,
});

const getProductSnapshot = (product) => ({
  _id: product._id,
  name: product.name,
  basePrice: product.basePrice,
  finalPrice: product.finalPrice,
  glbUrl: product.glbUrl,
  frontImage: product.cottonTee?.frontImage || product.viewImages?.front || "",
  backImage: product.cottonTee?.backImage || product.viewImages?.back || "",
});

const parseCustomization = (value) => {
  if (!value) return [];

  let parsed;
  try {
    parsed = typeof value === "string" ? JSON.parse(value) : value;
  } catch (error) {
    throw new ApiError(400, "Invalid customization data");
  }

  if (!Array.isArray(parsed)) {
    throw new ApiError(400, "customization must be an array");
  }

  return parsed;
};

const validateCottonTransform = (item) => {
  if (!item.fieldName?.endsWith("Transform")) return;

  let transform;
  try {
    transform = typeof item.value === "string" ? JSON.parse(item.value) : item.value;
  } catch (error) {
    throw new ApiError(400, "Invalid transform data");
  }

  const valid = transform &&
    Number.isFinite(Number(transform.x)) &&
    Number(transform.x) >= 0 && Number(transform.x) <= 100 &&
    Number.isFinite(Number(transform.y)) &&
    Number(transform.y) >= 0 && Number(transform.y) <= 100 &&
    Number.isFinite(Number(transform.scale)) && Number(transform.scale) > 0 &&
    Number.isFinite(Number(transform.rotation)) && Math.abs(Number(transform.rotation)) <= 360;

  if (!valid) throw new ApiError(400, "Invalid transform data");

  item.value = JSON.stringify({
    x: Number(transform.x),
    y: Number(transform.y),
    scale: Number(transform.scale),
    rotation: Number(transform.rotation),
  });
};

const validateCottonFiles = (files) => {
  for (const file of files) {
    if (!["frontDesign", "backDesign", "cottonLogo"].includes(file.fieldname)) {
      throw new ApiError(400, `Unsupported cotton customization file: ${file.fieldname}`);
    }
    if (!IMAGE_MIMETYPES.has(file.mimetype)) {
      throw new ApiError(400, `${file.fieldname} must be an image`);
    }
  }
};

const saveCottonUploadCustomization = async (req, product, existingData = null) => {
  const files = req.files || [];
  validateCottonFiles(files);

  const frontDesign = files.find((file) => file.fieldname === "frontDesign");
  const backDesign = files.find((file) => file.fieldname === "backDesign");
  const logo = files.find((file) => file.fieldname === "cottonLogo");
  const existingItems = existingData?.customization || [];
  const existingFront = existingItems.find((item) => item.fieldName === "frontDesign")?.value;
  const existingBack = existingItems.find((item) => item.fieldName === "backDesign")?.value;

  if (!frontDesign && !existingFront) throw new ApiError(400, "Front design is required");
  if (!backDesign && !existingBack) throw new ApiError(400, "Back design is required");

  const submittedCustomization = parseCustomization(req.body.customization);

  // =============================
  // CUSTOM COTTON TEE / FIX
  // The frontend always sends placeholder entries for the image fields
  // (value: "") even when the user is only editing an existing
  // customization and did not re-upload that particular file. Because
  // submittedCustomization was previously merged AFTER existingItems,
  // those empty placeholders silently overwrote the real Cloudinary
  // URL already stored for frontDesign / backDesign / logo. Strip out
  // empty-value entries for those three fields before merging so an
  // untouched image is preserved on edit.
  // =============================
  const IMAGE_FIELDS = new Set(["frontDesign", "backDesign", "logo"]);
  const meaningfulSubmitted = submittedCustomization.filter(
    (item) => !(IMAGE_FIELDS.has(item.fieldName) && !item.value)
  );

  const customizationMap = new Map();
  [...existingItems, ...meaningfulSubmitted].forEach((item) => {
    customizationMap.set(`${item.zoneKey}:${item.fieldName}`, { ...item });
  });
  const customization = [...customizationMap.values()];
  customization.forEach(validateCottonTransform);

  const [frontUrl, backUrl, logoUrl] = await Promise.all([
    frontDesign ? uploadToCloud(frontDesign, "customization/cotton-tees") : null,
    backDesign ? uploadToCloud(backDesign, "customization/cotton-tees") : null,
    logo ? uploadToCloud(logo, "customization/cotton-tees") : null,
  ]);

  const upsert = (zoneKey, fieldName, value) => {
    const index = customization.findIndex(
      (item) => item.zoneKey === zoneKey && item.fieldName === fieldName,
    );
    const item = { zoneKey, fieldName, value };
    if (index === -1) customization.push(item);
    else customization[index] = { ...customization[index], ...item };
  };

  if (frontUrl) upsert("front", "frontDesign", frontUrl);
  if (backUrl) upsert("back", "backDesign", backUrl);
  if (logoUrl) upsert("front", "logo", logoUrl);

  return customization;
};

const assertCustomizationOwner = (req, customization) => {
  const { userId, guestId } = getOwner(req);
  const ownsUser = userId && String(customization.userId) === String(userId);
  const ownsGuest = guestId && String(customization.guestId) === String(guestId);
  if (!ownsUser && !ownsGuest) {
    throw new ApiError(403, "You are not allowed to modify this customization");
  }
};

const getCottonProduct = (product) => {
  if (product.customizationType !== COTTON_CUSTOMIZATION_TYPE) {
    throw new ApiError(400, "Product is not a Custom Cotton Tee");
  }
  if (!COTTON_TYPES.includes(product.cottonTeeType)) {
    throw new ApiError(400, "Invalid Custom Cotton Tee type");
  }
  return product;
};


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
  if (!product) throw new ApiError(404, "Product not found");

  if (product.customizationType === COTTON_CUSTOMIZATION_TYPE) {
    getCottonProduct(product);

    const cottonProduct = {
      _id: product._id,
      name: product.name,
      customizationType: product.customizationType,
      cottonTeeType: product.cottonTeeType,
      cottonTee: product.cottonTee,
      basePrice: product.basePrice,
      finalPrice: product.finalPrice,
    };

    if (product.cottonTeeType === "OUR_DESIGN") {
      return {
        success: true,
        data: {
          product: cottonProduct,
          customizationRequired: false,
          customization: [],
        },
      };
    }

    return {
      success: true,
      data: {
        product: cottonProduct,
        customizationRequired: true,
        customization: {
          front: { image: product.cottonTee?.frontImage || "", printableArea: "A4" },
          back: { image: product.cottonTee?.backImage || "", printableArea: "A4" },
          logo: { optional: true },
        },
      },
    };
  }

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
        basePrice: product.basePrice,
        finalPrice: product.finalPrice,
      },
      customization
    }
  };
};


const saveCustomization = async (req) => {
  const { productId, customizationId } = req.body;

  if (!productId) throw new ApiError(400, "productId is required");

  // ✅ UUID-safe lookup
  const product = await Product.findOne({ _id: productId }).lean();
  if (!product) throw new ApiError(404, "Product not found");

  if (product.customizationType === COTTON_CUSTOMIZATION_TYPE) {
    getCottonProduct(product);

    if (product.cottonTeeType === "OUR_DESIGN") {
      if (req.files?.length) {
        throw new ApiError(400, "OUR_DESIGN does not accept customization files");
      }
      return {
        success: true,
        customizationRequired: false,
        customizationId: null,
        productId: product._id,
      };
    }

    const { userId, guestId } = getOwner(req);
    let data;
    let existingData = null;

    if (customizationId) {
      const owner = getOwner(req);
      const ownerFilter = owner.userId
        ? { userId: owner.userId }
        : owner.guestId
          ? { guestId: owner.guestId }
          : null;
      if (!ownerFilter) throw new ApiError(403, "Customization owner is required");

      data = await Customization.findOne({ _id: customizationId, ...ownerFilter });
      if (!data) throw new ApiError(404, "Customization not found");
      if (String(data.productId) !== String(product._id)) {
        throw new ApiError(400, "Customization product does not match");
      }
      existingData = data;
    }

    const customization = await saveCottonUploadCustomization(req, product, existingData);

    if (existingData) {
      data = existingData;
      data.customization = customization;
      data.customizationType = COTTON_CUSTOMIZATION_TYPE;
      data.cottonTeeType = product.cottonTeeType;
      data.productSnapshot = getProductSnapshot(product);
      await data.save();
    } else {
      data = await Customization.create({
        userId,
        guestId,
        productId: product._id,
        customizationType: COTTON_CUSTOMIZATION_TYPE,
        cottonTeeType: product.cottonTeeType,
        productSnapshot: getProductSnapshot(product),
        customization,
      });
    }

    return {
      success: true,
      message: "Customization saved successfully",
      customizationId: data._id,
      productId: product._id,
      data,
    };
  }

  let customization = parseCustomization(req.body.customization);

  // Existing Jersey upload behavior remains dynamic and unchanged.
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const [fieldName, zoneKey] = file.fieldname.split("_");
      const fileUrl = await uploadToCloud(file, "customization/logo");
      customization.push({ zoneKey, fieldName, value: fileUrl });
    }
  }

  const userId = req.user?._id || null;
  const guestId = req.headers["guestid"] || req.headers["guest-id"] || null;

  let data;

  if (customizationId) {
    // ✅ UPDATE
    data = await Customization.findOneAndUpdate(
      { _id: customizationId },
      {
        customization,
        productSnapshot: {
          _id: product._id,
          name: product.name,
          glbUrl: product.glbUrl,
          basePrice: product.basePrice,
          finalPrice: product.finalPrice,
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
        _id: product._id,
        name: product.name,
        glbUrl: product.glbUrl,
        basePrice: product.basePrice,
        finalPrice: product.finalPrice,
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

  if (customization.customizationType === COTTON_CUSTOMIZATION_TYPE) {
    assertCustomizationOwner(req, customization);
  }

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
const Product = require("../../../models/Product.model");
const Template = require("../../../models/template.model");
const DesignZone = require("../../../models/designZone.model");
const Customization = require("../../../models/customization.model");
const ApiError = require("../../../utils/apiError");
const { uploadToCloud } = require("../../../utils/uploadFileToS3");

const getCustomizer = async (req) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).lean();
  if (!product) {
    throw new Error("Product not found");
  }

  const templates = await Template.find({
    _id: { $in: product.templates }
  }).lean();

  let customization = [];

  for (const template of templates) {
    for (const zone of template.zones) {

      const zoneData = await DesignZone.findById(zone.zoneId).lean();
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
  const { productId } = req.body;

  if (!productId) {
    throw new ApiError(400, "productId is required");
  }

  let customization = [];

  // 1️⃣ Parse JSON fields
  if (req.body.customization) {
    customization = JSON.parse(req.body.customization);
  }

  // 2️⃣ Handle file uploads dynamically
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {

      // Example: logo_front → split
      const [fieldName, zoneKey] = file.fieldname.split("_");

      const fileUrl = await uploadToCloud(file, "customization/logo");

      customization.push({
        zoneKey,
        fieldName,
        value: fileUrl
      });
    }
  }

const product = await Product.findById(productId).lean();

console.log("Saving customization for product:", productId);
console.log("product:", product);
if (!product) {
  throw new ApiError(404, "Product not found");
}

const data = await Customization.create({
  userId: req.user?._id || "guest",
  productId,

  productSnapshot: {
    name: product.name,
    glbUrl: product.glbUrl,
    basePrice: product.basePrice,
    totalPrice: product.basePrice
  },

  customization
});



  return {
    success: true,
    message: "Customization saved successfully",
    data
  };
};
  
module.exports = {
  getCustomizer,
  saveCustomization
};
const CottonDesign = require("../../../models/cottonDesign.model");
const ApiError = require("../../../utils/apiError");
const httpStatus = require("http-status");

const { uploadToCloud } = require("../../../utils/uploadFileToS3");

// ============================================================
// CONSTANTS
// ============================================================

const DESIGN_TYPES = ["OUR_DESIGN", "UPLOAD_DESIGN"];

// ============================================================
// BOOLEAN HELPER
// ============================================================

const parseaBoolean = (value, defaultValue = true) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true") return true;
  if (value === "false") return false;

  throw new ApiError(httpStatus.BAD_REQUEST, "isActive must be a boolean");
};

// ============================================================
// VALIDATE DESIGN TYPE
// ============================================================

const validateDesignType = (designType) => {
  if (!designType) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Design type is required");
  }

  if (!DESIGN_TYPES.includes(designType)) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid design type. Allowed values: OUR_DESIGN, UPLOAD_DESIGN",
    );
  }
};

// ============================================================
// CREATE COTTON DESIGN
// ============================================================

const createCottonDesign = async (req) => {
  const {
    name,
    designType,
    apparel,
    baseColor = "",
    isActive,
  } = req.body || {};

  // ----------------------------------------------------------
  // VALIDATION
  // ----------------------------------------------------------

  if (!name || !name.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Design name is required");
  }

  validateDesignType(designType);

  if (!apparel || !apparel.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Apparel is required");
  }

  // BASE COLOR ONLY FOR UPLOAD DESIGN
  if (designType === "UPLOAD_DESIGN" && (!baseColor || !baseColor.trim())) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Base color is required for upload design",
    );
  }

  // ----------------------------------------------------------
  // FILES
  // ----------------------------------------------------------

  const frontImage = req.files?.frontImage?.[0];
  const backImage = req.files?.backImage?.[0];

  if (!frontImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Front image is required");
  }

  if (!backImage) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Back image is required");
  }

  // ----------------------------------------------------------
  // UPLOAD FRONT + BACK
  // ----------------------------------------------------------

  const [frontImageURL, backImageURL] = await Promise.all([
    uploadToCloud(frontImage, "cotton-tees/designs"),

    uploadToCloud(backImage, "cotton-tees/designs"),
  ]);

  // ----------------------------------------------------------
  // CREATE DATABASE RECORD
  // ----------------------------------------------------------

  const design = await CottonDesign.create({
    name: name.trim(),

    designType,

    apparel: apparel.trim(),

    baseColor: designType === "UPLOAD_DESIGN" ? baseColor.trim() : "",

    frontImage: frontImageURL,

    backImage: backImageURL,

    isActive: parseBoolean(isActive, true),
  });

  return {
    success: true,

    message: "Cotton tee design created successfully",

    data: design,
  };
};

// ============================================================
// GET ALL COTTON DESIGNS
// ============================================================

const getCottonDesigns = async (req) => {
  const { designType, apparel, baseColor, isActive } = req.query || {};

  const filter = {};

  // ----------------------------------------------------------
  // FILTER DESIGN TYPE
  // ----------------------------------------------------------

  if (designType) {
    validateDesignType(designType);

    filter.designType = designType;
  }

  // ----------------------------------------------------------
  // FILTER APPAREL
  // ----------------------------------------------------------

  if (apparel) {
    filter.apparel = apparel;
  }

  // ----------------------------------------------------------
  // FILTER BASE COLOR
  // ----------------------------------------------------------

  if (baseColor) {
    filter.baseColor = baseColor;
  }

  // ----------------------------------------------------------
  // FILTER STATUS
  // ----------------------------------------------------------

  if (isActive !== undefined) {
    if (isActive !== "true" && isActive !== "false") {
      throw new ApiError(httpStatus.BAD_REQUEST, "isActive must be a boolean");
    }

    filter.isActive = isActive === "true";
  }

  // ----------------------------------------------------------
  // FETCH
  // ----------------------------------------------------------

  const designs = await CottonDesign.find(filter)
    .sort({
      createdAt: -1,
    })
    .select("-basePrice -finalPrice -discountType -discountValue")
    .lean();

  return {
    success: true,

    message: "Cotton tee designs fetched successfully",

    data: designs,
  };
};

// ============================================================
// GET SINGLE COTTON DESIGN
// ============================================================

const getCottonDesign = async (req) => {
  const { _id } = req.params;

  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Design ID is required");
  }

  const design = await CottonDesign.findById(_id)
    .select("-basePrice -finalPrice -discountType -discountValue")
    .lean();

  if (!design) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cotton tee design not found");
  }

  return {
    success: true,

    message: "Cotton tee design fetched successfully",

    data: design,
  };
};

// ============================================================
// UPDATE COTTON DESIGN
// ============================================================

const updateCottonDesign = async (req) => {
  const { _id } = req.params;

  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Design ID is required");
  }

  // ----------------------------------------------------------
  // FIND EXISTING
  // ----------------------------------------------------------

  const design = await CottonDesign.findById(_id);

  if (!design) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cotton tee design not found");
  }

  const {
    name,
    designType,
    apparel,
    baseColor,
    isActive,
  } = req.body || {};

  // ----------------------------------------------------------
  // DETERMINE FINAL VALUES
  // ----------------------------------------------------------

  const finalDesignType =
    designType !== undefined ? designType : design.designType;

  const finalApparel = apparel !== undefined ? apparel : design.apparel;

  const finalBaseColor = baseColor !== undefined ? baseColor : design.baseColor;

  // ----------------------------------------------------------
  // VALIDATION
  // ----------------------------------------------------------

  validateDesignType(finalDesignType);

  if (!finalApparel || !finalApparel.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Apparel is required");
  }

  if (
    finalDesignType === "UPLOAD_DESIGN" &&
    (!finalBaseColor || !finalBaseColor.trim())
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Base color is required for upload design",
    );
  }

  // ----------------------------------------------------------
  // EXISTING IMAGES
  // ----------------------------------------------------------

  let frontImage = design.frontImage;
  let backImage = design.backImage;

  // ----------------------------------------------------------
  // NEW FILES
  // ----------------------------------------------------------

  const newFrontImage = req.files?.frontImage?.[0];

  const newBackImage = req.files?.backImage?.[0];

  // ----------------------------------------------------------
  // UPLOAD NEW IMAGES IN PARALLEL
  // ----------------------------------------------------------

  const [uploadedFrontImage, uploadedBackImage] = await Promise.all([
    newFrontImage
      ? uploadToCloud(newFrontImage, "cotton-tees/designs")
      : Promise.resolve(null),

    newBackImage
      ? uploadToCloud(newBackImage, "cotton-tees/designs")
      : Promise.resolve(null),
  ]);

  if (uploadedFrontImage) {
    frontImage = uploadedFrontImage;
  }

  if (uploadedBackImage) {
    backImage = uploadedBackImage;
  }

  // ----------------------------------------------------------
  // UPDATE OBJECT
  // ----------------------------------------------------------

  const updateData = {
    designType: finalDesignType,

    apparel: finalApparel.trim(),

    baseColor: finalDesignType === "UPLOAD_DESIGN" ? finalBaseColor.trim() : "",

    frontImage,

    backImage,
  };

  if (name !== undefined) {
    if (!name.trim()) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Design name cannot be empty");
    }

    updateData.name = name.trim();
  }

  if (isActive !== undefined) {
    updateData.isActive = parseBoolean(isActive, design.isActive);
  }

  // ----------------------------------------------------------
  // UPDATE DATABASE
  // ----------------------------------------------------------

  const updatedDesign = await CottonDesign.findByIdAndUpdate(_id, updateData, {
    new: true,
    runValidators: true,
  }).select("-basePrice -finalPrice -discountType -discountValue");

  return {
    success: true,

    message: "Cotton tee design updated successfully",

    data: updatedDesign,
  };
};

const updateCottonDesignStatus = async (req) => {
  const { _id } = req.params;
  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Design ID is required");
  }

  if (req.body?.isActive !== true && req.body?.isActive !== false) {
    throw new ApiError(httpStatus.BAD_REQUEST, "isActive must be a boolean");
  }

  const design = await CottonDesign.findByIdAndUpdate(
    _id,
    { isActive: req.body.isActive },
    { new: true, runValidators: true },
  )
    .select("-basePrice -finalPrice -discountType -discountValue")
    .lean();

  if (!design) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cotton tee design not found");
  }

  return {
    success: true,
    message: "Cotton tee design status updated successfully",
    data: design,
  };
};

// ============================================================
// DELETE COTTON DESIGN
// ============================================================

const deleteCottonDesign = async (req) => {
  const { _id } = req.params;

  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Design ID is required");
  }

  // ----------------------------------------------------------
  // FIND
  // ----------------------------------------------------------

  const design = await CottonDesign.findById(_id);

  if (!design) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cotton tee design not found");
  }

  // ----------------------------------------------------------
  // DELETE DATABASE RECORD
  // ----------------------------------------------------------

  await CottonDesign.findByIdAndDelete(_id);

  return {
    success: true,

    message: "Cotton tee design deleted successfully",
  };
};

// ============================================================
// EXPORT
// ============================================================

module.exports = {
  createCottonDesign,
  getCottonDesigns,
  getCottonDesign,
  updateCottonDesign,
  deleteCottonDesign,
  updateCottonDesignStatus,
};

const PatternDesign = require("../../models/patternDesign.model");
const { uploadToCloud } = require("../../utils/uploadFileToS3");
const ApiError = require("../../utils/apiError");

const createPattern = async (req) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "Name required");
  }

  let frontPattern = "";
  let backPattern = "";
  let thumbnail = "";

  if (req.files?.frontPattern?.[0]) {
    frontPattern = await uploadToCloud(req.files.frontPattern[0], "patterns");
  }

  if (req.files?.backPattern?.[0]) {
    backPattern = await uploadToCloud(req.files.backPattern[0], "patterns");
  }

  if (req.files?.thumbnail?.[0]) {
    thumbnail = await uploadToCloud(req.files.thumbnail[0], "patterns");
  }

  const pattern = await PatternDesign.create({
    name,
    frontPattern,
    backPattern,
    thumbnail,
  });

  return {
    success: true,
    message: "Pattern created",
    data: pattern,
  };
};

const getPatterns = async () => {
  const patterns = await PatternDesign.find().sort({ createdAt: -1 });

  return {
    success: true,
    data: patterns,
  };
};

const deletePattern = async (req) => {
  const { id } = req.params;

  await PatternDesign.findByIdAndDelete(id);

  return {
    success: true,
    message: "Pattern deleted",
  };
};


const getPatternsByIds = async(req) => {
    const { ids } = req.body;

    const patterns =
      await  PatternDesign.find({
        _id: { $in: ids },
      });

    return {
      success: true,
      data: patterns,
    }
}

module.exports = {
  createPattern,
  getPatterns,
  deletePattern,
  getPatternsByIds
};

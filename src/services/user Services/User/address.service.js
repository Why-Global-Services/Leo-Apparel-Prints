const { User } = require("../../../models/users.model");
const ApiError = require("../../../utils/apiError");
const httpStatus = require("http-status");



// const addAddress = async (req, res) => {
//   const { formattedData } = req.body;
//   console.log(formattedData, "data");
  
//   const {
//     fullName,
//     addressLine1,
//     city,
//     state,
//     zipCode,
//     country,
//     phone,
//     addressType,
//     checkoutAddress,
//   } = formattedData;
//   const userId = req.user._id;

//   if (!userId) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "No userId provided");
//   }

//   if (
//     !fullName ||
//     !addressLine1 ||
//     !city ||
//     !state ||
//     !zipCode ||
//     !country ||
//     !phone
//   ) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Provide all Details");
//   }

//   let userDetails = await User.findById(userId);

//   if (userDetails.address.length == 0) {
//     const newAddress = await User.findByIdAndUpdate(userId, {
//       address: { ...req.body, id: 1 },
//     });

//     return { success: true, message: "New Address added", newAddress };
//   }

//   const newAddress = {
//     fullName,
//     addressLine1,
//     city,
//     state,
//     zipCode,
//     country,
//     phone,
//     addressType: addressType || "home",
//     checkoutAddress: checkoutAddress || "billingAddress",
//   };
//   userDetails.address.push(newAddress);
//   await userDetails.save();

//   return { success: true, message: "New Address added", userDetails };
// };

const addAddress = async (req, res) => {
  const { formattedData } = req.body;
  const {
    fullName,
    addressLine1,
    landMark,
    city,
    state,
    zipCode,
    country,
    phone,
    addressType,
    checkoutAddress,
  } = formattedData || {};

  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No userId provided");
  }

  if (
    !fullName ||
    !addressLine1 ||
    !landMark ||
    !city ||
    !state ||
    !zipCode ||
    !country ||
    !phone
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Provide all Details");
  }

  let userDetails = await User.findById(userId);
  if (!userDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const newAddress = {
    fullName,
    addressLine1,
    landMark,
    city,
    state,
    zipCode,
    country,
    phone,
    addressType: addressType || "home",
    checkoutAddress: checkoutAddress || "billingAddress",
  };

  // ✅ Always push the new address — even if it's the first one
  userDetails.address.push(newAddress);
  await userDetails.save();

  return {
    success: true,
    message: "New Address added",
    address: userDetails.address, // Return updated list directly
  };
};


const getAddress = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No userId provided");
  }

  const user = await User.findById(userId).select("address");

  return {
    success: true,
    message: "Fetched Address",
    address: user?.address || [],
  };
};


const updateAddress = async (req) => {
  const userId = req.user._id;
  const { addressId } = req.params;
  const updatedData = req.body;

  console.log("Update Address - Received ID:", addressId); // Debug log
  console.log("Update Address - User ID:", userId);

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // Log all address IDs for debugging
  console.log("Available address IDs:", user.address.map(addr => addr._id || addr.id));

  // For UUID stored as string - direct comparison (no toString needed)
  const addressIndex = user.address.findIndex(
    (addr) => (addr._id || addr.id) === addressId
  );

  console.log("Found address at index:", addressIndex);

  if (addressIndex === -1) {
    throw new ApiError(404, "Address not found");
  }

  // Extract data from formattedData
  const addressData = updatedData.formattedData || updatedData;

  // Update the address
  user.address[addressIndex] = {
    ...user.address[addressIndex].toObject(),
    ...addressData,
  };

  await user.save();

  return {
    success: true,
    address: user.address,
  };
};

const deleteAddress = async (req) => {
  const userId = req.user._id;
  const { addressId } = req.params;

  console.log("Delete Address - Received ID:", addressId);

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  // For UUID stored as string - direct comparison
  user.address = user.address.filter(
    (addr) => (addr._id || addr.id) !== addressId
  );

  await user.save();

  return {
    success: true,
    address: user.address,
  };
};


module.exports = {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress
}
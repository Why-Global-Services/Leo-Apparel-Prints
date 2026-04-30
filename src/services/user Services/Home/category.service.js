const httpStatus = require("http-status");
const { CategoryModel } = require("../../../models/category.model");
const ApiError = require("../../../utils/apiError");


const category = async () => {

  const categories = await CategoryModel
    .find({ isActive: true }) 
    .sort({ createdAt: 1 })  
    .lean();

  const mainCategories = categories.filter(c => !c.parentId);

  const result = mainCategories.map(cat => ({
    ...cat,
    subcategories: categories.filter(sub => sub.parentId === cat._id)
  }));

  return {
    success: true,
    message: "Category fetched successfully",
    data: result
  };
};



module.exports = {
    category
}
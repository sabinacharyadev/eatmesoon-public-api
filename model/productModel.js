import productModel from "../schema/productSchema.js";

// create a product
export const createProduct = (productObj) => {
  return productModel(productObj).save();
};

// get all products
export const getAllProducts = (user_id) => {
  return productModel.find({ user_id });
};

// find a product by id
export const findProductById = (id) => {
  return productModel.findOne({ id });
};

// update a product
export const updateProduct = (filterParam, updatedObj) => {
  return productModel.findOneAndUpdate(filterParam, updatedObj, { new: true });
};

// delete products
export const deleteProducts = (selectedIdsArray) => {
  return productModel.deleteMany({ _id: { $in: selectedIdsArray } });
};

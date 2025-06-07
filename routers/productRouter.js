import express from "express";
import { userAuth } from "../middlewares/authMiddleware";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper";
import {
  createProduct,
  deleteProducts,
  findProductById,
  getAllProducts,
  updateProduct,
} from "../model/productModel";

const productRouter = express.Router();

// Private routes
// Create a product | POST
productRouter.post("/", userAuth, async (req, res) => {
  try {
    // get user details
    const currentUser = req.userInfo;
    // create a product
    const product = await createProduct(req.body);
    // send response back
    product?._id
      ? buildSuccessResponse(res, product, "Product created successfully")
      : buildErrorResponse(res, "Could not create product, please try again");
  } catch (error) {
    console.log(error);
    buildErrorResponse(res, "Something went wrong");
  }
});

// Get products | SHOW | GET
productRouter.get("/", userAuth, async (req, res) => {
  try {
    // get current user info
    const currentUser = req.userInfo;
    // get products details from db
    const allProducts = await getAllProducts(currentUser._id);
    // send response
    allProducts?._id
      ? buildSuccessResponse(res, allProducts, "Products fetched successfully")
      : buildErrorResponse(res, "Unable to fetch products");
  } catch (error) {
    console.log(error);
    buildErrorResponse(res, "Something went wrong");
  }
});

// Get product | INDEX | GET
productRouter.get("/:_id", userAuth, async (req, res) => {
  try {
    // get product info
    const product = await findProductById(req.params._id);
    // send response
    product?._id
      ? buildSuccessResponse(res, product, "Product fetched successfully")
      : buildErrorResponse(res, "Unable to fetch product");
  } catch (error) {
    console.log(error);
    buildErrorResponse(res, "Something went wrong");
  }
});

// update product | PATCH
productRouter.patch("/", userAuth, async (req, res) => {
  // update product in db
  const updatedProduct = await updateProduct(req.body._id, req.body);
  // send response
  updatedProduct?._id
    ? buildSuccessResponse(res, product, "Product updated successfully")
    : buildErrorResponse(res, "Unable to update product");
});

// delete product | DELETE
productRouter.delete("/", userAuth, async (req, res) => {
  try {
    // delete products
    const result = await deleteProducts(req.body);
    // send response back
    result?.acknowledged
      ? buildSuccessResponse(res, result, "Product(s) deleted successfully")
      : buildErrorResponse(res, "Could not delete product(s)");
  } catch (error) {
    console.log(error);
    buildErrorResponse(res, "Something went wrong");
  }
});

export default productRouter;

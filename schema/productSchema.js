import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    best_before: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);
export default productModel;

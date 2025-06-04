import mongoose from "mongoose";

const DB_NAME = process.env.PROD
  ? process.env.PROD_DB_NAME
  : process.env.LOCAL_DB_NAME;

export const connectToDB = () => {
  try {
    const connect = mongoose.connect(DB_NAME);
    if (connect) {
      console.log(`Database connected: ${DB_NAME}`);
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

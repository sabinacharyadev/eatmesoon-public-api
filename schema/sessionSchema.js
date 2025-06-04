import mongoose from "mongoose";

const sessionSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: "",
    },
  },
  { timestamp: true }
);

const sessionModel = mongoose.model("session", sessionSchema);
export default sessionModel;

import userModel from "../schema/userSchema";

// create a user
export const createUser = (userObj) => {
  return userModel(userObj).save();
};

// find user by email
export const findUserByEmail = (email) => {
  return userModel.findOne({ email });
};

import userModel from "../schema/userSchema";

// create a user
export const createUser = (userObj) => {
  return userModel(userObj).save();
};

// find user by email
export const findUserByEmail = (email) => {
  return userModel.findOne({ email });
};

// update user
export const updateUser = (filterParam, updateParam) => {
  return userModel.findOneAndUpdate(filterParam, updateParam, { new: true });
};

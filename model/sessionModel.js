import sessionModel from "../schema/sessionSchema.js";

// Create Session
export const createSession = (sessionObj) => {
  return sessionModel(sessionObj).save();
};

// Delete Session
export const deleteSession = (deleteFilter) => {
  return sessionModel.findOneAndDelete(deleteFilter);
};

// Find Session
export const findSession = (sessionFilter) => {
  return sessionModel.findOne(sessionFilter);
};

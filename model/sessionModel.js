import sessionModel from "../schema/sessionSchema";

// Create Session
export const createSession = (sessionObj) => {
  return sessionModel(sessionObj).save();
};

// Delete Session
export const deleteSession = (deleteFilter) => {
  return sessionModel.findOneAndDelete(deleteFilter);
};

// Find Session
export const findSession = (sessionId) => {
  return sessionModel.findOne({ sessionId });
};

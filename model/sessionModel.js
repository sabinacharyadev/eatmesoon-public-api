import sessionModel from "../schema/sessionSchema";

// Create Session
export const createSession = (sessionObj) => {
  return sessionModel(sessionObj).save();
};

// Delete Session
export const deleteSession = (sessionId) => {
  return sessionModel.findOneAndDelete({ sessionId });
};

// Find Session
export const findSession = (sessionId) => {
  return sessionModel.findOne({ sessionId });
};

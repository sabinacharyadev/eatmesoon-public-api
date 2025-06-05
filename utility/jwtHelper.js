import jwt from "jsonwebtoken";

// Generate Access JWT
export const generateAccessJWT = (email) => {
  const accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
  return accessJWT;
};

// Generate Refresh JWT
export const generateRefreshJWT = (email) => {
  const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return refreshJWT;
};

// Generate JWT
export const generateJWT = (email) => {
  return {
    accessJWT: generateAccessJWT(email),
    refreshJWT: generateRefreshJWT(email),
  };
};

// Verify accessJWT
export const verifyAccessJWT = (accessJWT) => {
  return jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET);
};

// Verify refreshJWT
export const verifyRefreshJWT = (refreshJWT) => {
  return jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET);
};

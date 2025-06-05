import { verifyAccessJWT } from "../utility/jwtHelper.js";
import { buildErrorResponse } from "../utility/responseHelper.js";
import { findSession } from "../model/sessionModel.js";
import { findUserByEmail } from "../model/userModel.js";

export const userAuth = async (req, res, next) => {
  try {
    // verify token
    const { authorization } = req.headers;
    const decodedAccessJWT = verifyAccessJWT(authorization);

    if (!decodedAccessJWT?.email) {
      buildErrorResponse(res, "Invalid auth token");
      return;
    }

    // verify session
    const session = await findSession({
      email: decodedAccessJWT.email,
      token: authorization,
    });

    if (!session?._id) {
      buildErrorResponse(res, "Could not find session");
    }

    // get user info

    const user = await findUserByEmail(decodedAccessJWT.email);

    // send user info

    if (user?._id && user?.isVerified) {
      user.password = undefined;
      req.userInfo = user;
      return next();
    }
    throw new Error("Invalid auth token");
  } catch (error) {
    console.log(error);
    buildErrorResponse(res, "Invalid auth tokens");
  }
};

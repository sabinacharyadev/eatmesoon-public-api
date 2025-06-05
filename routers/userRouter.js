import express from "express";
import { comparePassword, hashPassword } from "../utility/bcryptHelper";
import { createUser, findUserByEmail, updateUser } from "../model/userModel";
import { createSession, deleteSession } from "../model/sessionModel";
import { v4 as uuidv4 } from "uuid";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper";
import {
  sendVerificationEmail,
  sendVerifiedEmail,
} from "../utility/nodeMailerHelper";
import { generateJWT } from "../utility/jwtHelper";

const userRouter = express.Router();

// CREATE USER | POST
userRouter.post("/", async (req, res) => {
  try {
    // Hash password
    const { password } = req.body;
    const hashedPassword = hashPassword(password);

    // create a new user
    const user = await createUser({ ...req.body, password: hashedPassword });

    // create session
    if (user?._id) {
      const uniqueToken = uuidv4();
      const session = await createSession({
        token: uniqueToken,
        email: user.email,
      });
      // send verification email

      if (session?._id) {
        const CLIENT_ROOT_URL = process.env.PROD
          ? PROD_CLIENT_URL
          : LOCAL_CLIENT_URL;
        const verificationUrl = `${CLIENT_ROOT_URL}/verify_user?email=${user.email}?token=${session.token}`;
        sendVerificationEmail(user.email, user.name, verificationUrl);
      }
    }

    user?._id
      ? buildSuccessResponse(
          res,
          {},
          "A verification email has been sent to your email, please verify your email"
        )
      : buildErrorResponse(res, "An error occurred, please try again");
  } catch (error) {
    if (error.code === 11000) {
      error.message = "User with this email already exists!!";
    }
    console.log(error);
    buildErrorResponse(res, "Something went wrong");
  }
});

// Verify User | PATCH
userRouter.patch("/", async (req, res) => {
  try {
    const { token, email } = req.body;
    //   verify email in session table
    const result = deleteSession({ token, email });

    if (!result?._id) {
      buildErrorResponse(res, "Invalid Link");
      return;
    }

    // update user in db
    const user = await updateUser({ email: email }, { isVerified: true });

    if (user?._id) {
      // Send Verified email
      sendVerifiedEmail(user.email, user.name);
    }

    user?._id
      ? buildSuccessResponse(res, {}, "User verified, please Login")
      : buildErrorResponse(res, {}, "Could not verify user");
  } catch (error) {
    console.log("Error:", error);
    buildErrorResponse(res, "Something went wrong");
  }
});

// Login USER | POST
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user?._id) {
      buildErrorResponse(res, "User not found");
      return;
    }
    // check for verification
    if (!user?.isVerified) {
      buildErrorResponse(res, "User not verified, please check your email");
    }
    // check password
    if (!comparePassword(password, user?.password)) {
      buildErrorResponse(res, "Credentials do not match");
    }
    // Generate JWT
    const jwt = generateJWT(user.email);
    // create a session
    const session = await createSession({
      token: jwt.accessJWT,
      email: user.email,
    });

    // send token
    session?._id
      ? buildSuccessResponse(res, jwt, "Logged in successfully")
      : buildErrorResponse(res, "Could not start session, please try again");
  } catch (error) {
    console.log(error);
    buildErrorResponse(res, "Something went wrong");
  }
});

export default userRouter;

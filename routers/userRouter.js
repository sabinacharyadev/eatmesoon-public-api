import express from "express";
import { hashPassword } from "../utility/bcryptHelper";
import { createUser } from "../model/userModel";
import { createSession } from "../model/sessionModel";
import { v4 as uuidv4 } from "uuid";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper";
import { sendVerificationEmail } from "../utility/nodeMailerHelper";

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
    buildErrorResponse(res, error.message);
  }
});

export default userRouter;

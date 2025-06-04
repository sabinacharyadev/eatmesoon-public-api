import nodemailer from "nodemailer";

// create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

// send email
const sendEmail = async (emailObj) => {
  try {
    const result = await transporter.sendMail(emailObj);
    console.log("Message", result?.messageId);
  } catch (error) {
    console.log("Error", error);
  }
};

// Email content
export const sendVerificationEmail = (email, name, verificationUrl) => {
  const emailObj = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Email Verification For your Account",
    html: `
    <table style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border-collapse: collapse;">
        <tr>
            <td style="text-align: center;">
                <h1>Account Verification</h1>
            </td>
        </tr>
        <tr>
            <td>
                <p>Dear ${name},</p>
                <p>Thank you for signing up with us. To complete your registration, please click the link below to verify your email address:</p>
                <p><a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Verify Email</a></p>
                <p>If you did not sign up for an account, please ignore this email.</p>
                <p>Thank you,<br> Eatmesoon Team</p>
            </td>
        </tr>
    </table>
    `,
  };
  sendEmail(emailObj);
};

export const sendVerifiedEmail = (email, name) => {
  const emailObj = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Email Verified For your Account",
    html: `
    <table style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border-collapse: collapse;">
        <tr>
            <td style="text-align: center;">
                <h1>Account Verification</h1>
            </td>
        </tr>
        <tr>
            <td>
                <p>Dear ${name},</p>
                <p>Thank you for signing up with us.</p>
                <p>You are now verified.</p>
                <p>Thank you,<br> Eatmesoon Team</p>
            </td>
        </tr>
    </table>
    `,
  };
  sendEmail(emailObj);
};

import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const html_content = `<p>Click <a href="${
      process.env.DOMAIN
    }/verifypassword?token:${hashedToken}">here</a> to ${
      emailType === "VERIFY" ? "Verify your email" : "Reset your password"
    } or copy paste the link in your browser </br>
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`;

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordtokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILUSERID,
        pass: process.env.MAILUSERPASSWORD,
      },
    });

    const mailOptions = {
      from: "sagar@s.ai",
      to: email,
      subject: emailType === "VERIFY" ? "Email Verification" : "Reset Password",
      html: html_content,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

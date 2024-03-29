/* import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const onSendOtpToMail = async (email: string, otp: string): Promise<void> => {
  try {
    const msg: sgMail.MailDataRequired = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: "Your OTP",
      text: `Your email verification otp is: ${otp}`,
    };

    await sgMail.send(msg);
  } catch (error) {
    throw new Erro r(error);
  }
};
 */

import  { createTransport } from "nodemailer";

const transporter = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "zeshanshakil0@gmail.com", //blogpost
    pass: "phff wtbt cvhj gvek",
  },
});

export const onSendOtpToMail = async (email: string, otp: string): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: "zeshanshakil0@gmail.com",
      to: email, 
      subject: "Your OTP", 
      text: `Your email verification otp is: ${otp}`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error(error);
  }
};

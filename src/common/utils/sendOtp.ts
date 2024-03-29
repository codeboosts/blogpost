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
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

export const onSendOtpToMail = async (email: string, otp: string): Promise<void> => {
  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL, // sender address
      to: email, // list of receivers
      subject: "Your OTP", // Subject line
      text: `Your email verification otp is: ${otp}`, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error(error);
  }
};

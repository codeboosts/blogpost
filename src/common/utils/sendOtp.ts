import  { createTransport } from "nodemailer";

const transporter = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

export const onSendOtpToMail = async (email: string, otp: string): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email, 
      subject: "Your OTP", 
      text: `Your email verification otp is: ${otp}`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error(error);
  }
};

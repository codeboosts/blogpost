import * as sgMail from "@sendgrid/mail";

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
    throw new Error(error);
  }
};

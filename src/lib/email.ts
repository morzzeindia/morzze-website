import {
  sendEmail,
  sendTemplateEmail,
} from "@/lib/email";

export { sendEmail, sendTemplateEmail };

export async function sendOTPEmail(email: string, otp: string) {
  try {
    await sendTemplateEmail({
      to: email,
      subject: "Your Password Reset OTP",
      template: "resetpass",
      type: "generic",
      data: {
        OTP: otp,
      },
    });

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}

export async function sendPasswordResetConfirmation(email: string) {
  try {
    await sendTemplateEmail({
      to: email,
      subject: "Password Reset Successful",
      template: "password-reset-confirmation",
      type: "generic",
    });

    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}

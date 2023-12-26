import { Resend } from "resend";
import { createHttpException } from "./exceptions";
import { HTTP_STATUS_CODE } from "../enums/HttpStatusCodes";
import { sendOtpCodeTemplate } from "./email-templates/sendOtpCodeTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpCodeMail = async (
  receiverEmail: string,
  otpVerificationCode: string,
  firstName: string
) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", //! change this email with you email domain
      to: receiverEmail,
      subject: "OTP verification code",
      html: sendOtpCodeTemplate(firstName, otpVerificationCode),
    });
  } catch (error) {
    const errorResponse = error as Error;
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      `[sendOtpCodeMail]: ${errorResponse.message}`
    );
  }
};

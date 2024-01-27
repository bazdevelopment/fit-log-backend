import { Resend } from "resend";
import { createHttpException } from "./httpResponse";
import { HTTP_STATUS_CODE } from "../enums/http-status-codes";
import { environmentVariables } from "../config/environment-variables";

const resend = new Resend(environmentVariables.emailProvider.resendApiKey);

/**
 * sendOtpCodeMail function is responsible for sending an email containing an OTP (One-Time Password) verification code to a user.
 */
export const sendOtpCodeMail = async ({
  receiverEmail,
  subject,
  htmlTemplate,
}: {
  receiverEmail: string;
  subject: string;
  htmlTemplate: string;
}) => {
  try {
    return await resend.emails.send({
      from: "onboarding@resend.dev", //! change this email with you email domain
      to: receiverEmail,
      subject,
      html: htmlTemplate,
    });
  } catch (error) {
    const errorResponse = error as Error;
    return createHttpException({
      status: HTTP_STATUS_CODE.BAD_REQUEST,
      message: errorResponse.message,
      method: "sendOtpCodeMail",
    });
  }
};

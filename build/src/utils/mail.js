"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpCodeMail = void 0;
const resend_1 = require("resend");
const httpResponse_1 = require("./httpResponse");
const environment_variables_1 = require("../config/environment-variables");
const resend = new resend_1.Resend(environment_variables_1.environmentVariables.emailProvider.resendApiKey);
/**
 * sendOtpCodeMail function is responsible for sending an email containing an OTP (One-Time Password) verification code to a user.
 */
const sendOtpCodeMail = ({ receiverEmail, subject, htmlTemplate, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield resend.emails.send({
            from: "onboarding@resend.dev", //! change this email with you email domain
            to: receiverEmail,
            subject,
            html: htmlTemplate,
        });
    }
    catch (error) {
        const errorResponse = error;
        return (0, httpResponse_1.createHttpException)({
            status: 400 /* HTTP_STATUS_CODE.BAD_REQUEST */,
            message: errorResponse.message,
            method: "sendOtpCodeMail",
        });
    }
});
exports.sendOtpCodeMail = sendOtpCodeMail;

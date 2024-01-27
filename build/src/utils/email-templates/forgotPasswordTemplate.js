"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateForgotPasswordTemplate = void 0;
/**
 * Generates an HTML template for a password reset email.
 * The template includes the user's name and a unique reset code for resetting the password.
 */
const generateForgotPasswordTemplate = (userName, resetCode) => {
    const template = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FitLog Password Reset</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f3f3f3;">
            <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="background-color: #663399; max-width: 600px; margin: 20px auto; border-radius: 10px; overflow: hidden;">
                <tr>
                    <td style="padding: 20px; text-align: center;">
                        <h2 style="color: #ffffff; margin-bottom: 20px;">FitLog Password Reset</h2>
                        <p style="color: #ffffff; font-size: 18px;">Hello ${userName},</p>
                        <p style="color: #ffffff; font-size: 18px;">You've requested a password reset for your FitLog account.</p>
                        <p style="color: #ffffff; font-size: 18px;">Your new reset code is:</p>
                        <div style="background-color: #ffffff; color: #663399; font-size: 36px; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">
                            ${resetCode}
                        </div>
                        <p style="color: #ffffff; font-size: 18px; margin-top: 20px;">Please use this code to reset your password.</p>
                        <p style="color: #ffffff; font-size: 18px;">If you didn't request this reset, please ignore this email.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
    return template;
};
exports.generateForgotPasswordTemplate = generateForgotPasswordTemplate;

/**
 * Function used to send HTML template via email to the user in order to receive the confirmation code
 */
export const sendOtpCodeTemplate = (
  firstName: string,
  otpCode: string
): string => {
  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FitLog Email Confirmation</title>
  </head>
  <body style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f3f3f3;">
      <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="background-color: #663399; max-width: 600px; margin: 20px auto; border-radius: 10px; overflow: hidden;">
          <tr>
              <td style="padding: 20px; text-align: center;">
                  <h2 style="color: #ffffff; margin-bottom: 20px;">FitLog Email Confirmation</h2>
                  <p style="color: #ffffff; font-size: 18px;">Hello ${firstName},</p>
                  <p style="color: #ffffff; font-size: 18px;">Thank you for using FitLog! Your OTP confirmation code is:</p>
                  <div style="background-color: #ffffff; color: #663399; font-size: 36px; padding: 10px 20px; border-radius: 5px; margin-top: 20px;">
                      ${otpCode}
                  </div>
                  <p style="color: #ffffff; font-size: 18px; margin-top: 20px;">Please use this code to confirm your identity in FitLog.</p>
                  <p style="color: #ffffff; font-size: 18px;">If you didn't request this code, please ignore this email.</p>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
  return template;
};

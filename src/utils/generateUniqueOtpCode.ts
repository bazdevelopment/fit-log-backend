/**
 * Generates a random OTP of length 6 (One-Time Password) code of the specified length using numeric characters (0-9).
 */
export const generateOTPCode = (codeLength = 6): string => {
  const characters = "0123456789";

  return Array.from(
    { length: codeLength },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

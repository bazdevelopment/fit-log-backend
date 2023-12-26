export const generateOTPCode = (codeLength: number = 6) => {
  const characters = "0123456789";

  return Array.from(
    { length: codeLength },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

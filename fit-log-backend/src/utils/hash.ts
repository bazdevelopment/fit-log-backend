import crypto from "crypto";

interface IHashedPassword {
  salt: string;
  hash: string;
}
/**
 * Hashes a password using a random salt and the PBKDF2 key derivation algorithm.
 */
export const hashPassword = (password: string): IHashedPassword => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 65, "sha512")
    .toString("hex");

  return { salt, hash };
};

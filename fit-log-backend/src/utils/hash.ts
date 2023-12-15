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
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
};

/**
 * This function verifies a candidate password by comparing its hashed representation with a provided hash and salt.
 * It uses the PBKDF2 key derivation algorithm for secure password verification.
 */
export const verifyPassword = (
  candidatePassword: string,
  salt: string,
  candidateHash: string
): boolean => {
  const hash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512")
    .toString("hex");

  return candidateHash === hash;
};

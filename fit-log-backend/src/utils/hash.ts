import crypto from "crypto";

interface IHashedField {
  salt: string;
  hash: string;
}
/**
 * Hashes a field using a random salt and the PBKDF2 key derivation algorithm.
 */
export const hashField = (password: string): IHashedField => {
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
export const verifyHashedField = (
  candidatePassword: string,
  salt: string,
  candidateHash: string
): boolean => {
  const hash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, "sha512")
    .toString("hex");

  return candidateHash === hash;
};

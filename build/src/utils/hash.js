"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHashedField = exports.hashField = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Hashes a field using a random salt and the PBKDF2 key derivation algorithm.
 */
const hashField = (input) => {
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    const hash = crypto_1.default
        .pbkdf2Sync(input, salt, 1000, 64, "sha512")
        .toString("hex");
    return { salt, hash };
};
exports.hashField = hashField;
/**
 * This function verifies a candidate password by comparing its hashed representation with a provided hash and salt.
 * It uses the PBKDF2 key derivation algorithm for secure password verification.
 */
const verifyHashedField = (candidateInput, salt, candidateHash) => {
    const hash = crypto_1.default
        .pbkdf2Sync(candidateInput, salt, 1000, 64, "sha512")
        .toString("hex");
    return candidateHash === hash;
};
exports.verifyHashedField = verifyHashedField;

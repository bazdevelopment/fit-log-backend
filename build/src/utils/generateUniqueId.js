"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueId = void 0;
/**
 * generateUniqueId
 * This function generates a unique identifier by combining a timestamp with a random alphanumeric string.
 * It is commonly used to create unique IDs for various purposes in applications.
 */
function generateUniqueId(length = 16) {
    const timestamp = new Date().getTime().toString(36);
    const randomString = Math.random()
        .toString(36)
        .substring(2, 2 + length - timestamp.length);
    return timestamp + randomString;
}
exports.generateUniqueId = generateUniqueId;

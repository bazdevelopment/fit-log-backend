"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
/**
 * generateTokens
 * This function generates an access/refresh JSON Web Token (JWT) by signing user information using the provided `userInfo`.
 */
const generateTokens = ({ request, userInfo, expiresAccessToken, expiresRefreshToken, }) => {
    const { email, id, firstName, lastName, role } = userInfo;
    const accessToken = expiresAccessToken
        ? request.jwt.sign({
            email,
            id,
            firstName,
            lastName,
            role,
        }, { expiresIn: expiresAccessToken })
        : undefined;
    const refreshToken = expiresRefreshToken
        ? request.jwt.sign({
            email,
            id,
            firstName,
            lastName,
            role,
        }, { expiresIn: expiresRefreshToken })
        : undefined;
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;

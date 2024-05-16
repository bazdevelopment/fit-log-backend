import { FastifyRequest } from "fastify";
import { IEncodedToken } from "../modules/auth/auth.types";

/**
 * generateTokens
 * This function generates an access/refresh JSON Web Token (JWT) by signing user information using the provided `userInfo`.
 */
export const generateTokens = ({
  request,
  userInfo,
  expiresAccessToken,
  expiresRefreshToken,
}: {
  request: FastifyRequest;
  userInfo: IEncodedToken;
  expiresAccessToken?: string;
  expiresRefreshToken?: string;
}): { accessToken: string | undefined; refreshToken: string | undefined } => {
  const { email, id, userName, role } = userInfo;

  const accessToken = expiresAccessToken
    ? request.jwt.sign(
        {
          email,
          id,
          userName,
          role,
        },
        { expiresIn: expiresAccessToken }
      )
    : undefined;

  const refreshToken = expiresRefreshToken
    ? request.jwt.sign(
        {
          email,
          id,
          userName,
          role,
        },
        { expiresIn: expiresRefreshToken }
      )
    : undefined;

  return { accessToken, refreshToken };
};

import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const environmentVariables = {
  database: {
    url: process.env.DATABASE_URL,
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    jwtAccessTokenExpires: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    jwtRefreshTokenExpires: process.env.JWT_REFRESH_TOKEN_EXPIRES,
  },
  emailProvider: {
    resendApiKey: process.env.RESEND_API_KEY,
  },
  default: {
    port: process.env.PORT,
    host: process.env.HOST,
    nodeEnvironment: process.env.NODE_ENV,
  },
};

export const tokenCookieOptions = {
  maxAge: Number(process.env.JWT_TOKEN_EXPIRES),
  secure: true,
  httpOnly: true,
  path: "/",
};

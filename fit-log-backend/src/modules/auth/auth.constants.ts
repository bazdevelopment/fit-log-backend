import { CookieSerializeOptions } from "@fastify/cookie";
/**
 * maxAge - This option sets the maximum age of the cookie in milliseconds. It determines how long the cookie will be valid
 * secure:true - This option indicates whether the cookie should only be sent over secure HTTPS connections. Setting it to true means the cookie will only be sent if the connection is secure.
 * httpOnly:true - When set to true, this option prevents the cookie from being accessed through JavaScript. It's a security measure to mitigate certain types of cross-site scripting (XSS) attacks.
 * path:/ - Specifies the path for which the cookie is valid. In this case, it's set to the root path ("/"), meaning the cookie is valid for the entire domain.
 * maxAge - 0 - This is set to 0, which means the cookie will expire immediately. Essentially, setting maxAge to 0 is a way to delete a cookie when the browser receives it.
 */
export const tokenCookieOptions: CookieSerializeOptions = {
  maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES),
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  path: "/",
  // signed: true, //this value produce the error when jwt.decode method is called- The token payload is not a valid base64url serialized JSON
  domain: "localhost",
  sameSite: "strict",
};

export const logoutCookieOptions = {
  maxAge: 0,
  path: "/",
};

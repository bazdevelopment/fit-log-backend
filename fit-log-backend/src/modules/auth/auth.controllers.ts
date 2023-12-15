import { FastifyReply, FastifyRequest } from "fastify";
import { TSignInUser, TTSignUpUserWithoutId } from "./auth.types";
import {
  getUserByEmail,
  signJwtToken,
  signUpUserService,
} from "./auth.services";
import { HTTP_STATUS_CODE } from "../../enums/HttpStatusCodes";
import { createHttpException } from "../../utils/exceptions";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { tokenCookieOptions } from "./auth.constants";
import { verifyPassword } from "../../utils/hash";
import { P } from "pino";

/**
 *  signUpController
 *  This asynchronous function serves as the controller for user registration.
 *  It handles the registration process by checking if the user already exists, uploading an avatar image to Cloudinary (if applicable), adding the user to the database, and creating a JSON Web Token (JWT) for authentication.
 */
export const signUpController = async (
  request: FastifyRequest<{
    Body: TTSignUpUserWithoutId;
  }>,
  reply: FastifyReply
): Promise<void> => {
  const { email, password, firstName, lastName } = request.body;

  /** 1. Check if the user already exists in db */
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "User already exists!"
    );
  }

  /* 2. Upload avatar image to cloudinary after the account has been created successfully*/

  /* 3.Add user to database */
  const userUniqueId = generateUniqueId();
  const userCreated = await signUpUserService({
    email,
    id: userUniqueId,
    password,
    firstName,
    lastName,
  });

  /* 4. create the JWT token */
  const jwtToken = signJwtToken({
    email,
    password,
    id: userUniqueId,
    firstName,
    lastName,
  });

  return reply
    .code(HTTP_STATUS_CODE.CREATED)
    .cookie("Authorization", jwtToken, tokenCookieOptions)
    .send({ message: "User registered successfully!", user: userCreated });
};

/**
 * signInController
 * This function serves as the controller for user authentication, handling the process of user sign-in.
 * It checks if the user exists in the database, verifies the entered password, and generates a JWT access token upon successful authentication.
 */

export const signInController = async (
  request: FastifyRequest<{
    Body: TSignInUser;
  }>,
  reply: FastifyReply
) => {
  const { email, password } = request.body;

  /** 1. Check if the users exists in db, otherwise throw an error */
  const registeredUser = await getUserByEmail(email);

  if (!registeredUser) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "[signInController]:User not found"
    );
  }

  /** 2. Check if the password from db matches the password entered, otherwise throw an error */

  const isPasswordMatching = verifyPassword(
    password,
    registeredUser.salt,
    registeredUser.password
  );

  if (!isPasswordMatching) {
    return createHttpException(
      HTTP_STATUS_CODE.BAD_REQUEST,
      "[signInController]:Password doesn't match!"
    );
  }

  /**  generate JWT access token */
  const jwtToken: string = signJwtToken({
    email,
    password,
    id: registeredUser.id,
    firstName: registeredUser.id,
    lastName: registeredUser.lastName,
  });

  /** 3. In the end return a successful message, token and also user if needed */

  return reply
    .code(HTTP_STATUS_CODE.CREATED)
    .cookie("Authorization", jwtToken, tokenCookieOptions)
    .send({ message: "Successfully logged in!", token: jwtToken });
};

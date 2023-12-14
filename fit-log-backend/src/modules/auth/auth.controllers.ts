import { FastifyReply, FastifyRequest } from "fastify";
import { TTSignUpUserWithoutId } from "./auth.types";
import {
  getUserByEmail,
  signJwtToken,
  signUpUserService,
} from "./auth.services";
import { HTTP_STATUS_CODE } from "../../enums/HttpStatusCodes";
import { createHttpException } from "../../utils/exceptions";
import { generateUniqueId } from "../../utils/generateUniqueId";
import { tokenCookieOptions } from "./auth.constants";

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

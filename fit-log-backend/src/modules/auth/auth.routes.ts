import { FastifyInstance } from "fastify";
import { signUpController } from "./auth.controllers";
import { signUpUserJsonSchema } from "./auth.schemas";

/**
 * authRoutes
 * This function is responsible for defining authentication-related routes within a Fastify application.
 * In particular, it registers a POST endpoint for user registration, utilizing the `signUpController` to handle the registration process.
 */
export const authRoutes = async (app: FastifyInstance) => {
  app.post(
    "/register",
    { schema: { body: signUpUserJsonSchema.body } },
    signUpController
  );
};

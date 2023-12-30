import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifytJwt from "@fastify/jwt";
import { logger } from "./logger";
import { authRoutes } from "../modules/auth/auth.routes";
import { createHttpException } from "../utils/httpResponse";
import { HTTP_STATUS_CODE } from "../enums/HttpStatusCodes";
import { TSignInUser } from "../modules/auth/auth.types";
import { userRoutes } from "../modules/user/user.routes";
import { TUpdateUser } from "../modules/user/user.types";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest<{ Body: TSignInUser | TUpdateUser }>,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number }; // payload type is used for signing and verifying
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    }; // user type is return type of `request.user` object
  }
}

/**
 * This function creates and configures a Fastify server instance, registering plugins, defining routes, and returning the configured server.
 */
export async function buildServer() {
  const app = fastify({
    logger,
  });

  /* REGISTER PLUGINS */
  app.register(fastifytJwt, {
    secret: process.env.JWT_SECRET!,
  });

  //! check if fastify cookie is needed
  app.register(fastifyCookie, {
    secret: process.env.JWT_SECRET!,
  });

  /* DECORATORS */
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      try {
        /** by calling jwtVerify() method by default user object will be added to the response object and can be accessed by request.user */
        await request.jwtVerify();
      } catch (error) {
        return createHttpException({
          status: HTTP_STATUS_CODE.UNAUTHORIZED,
          message: "Unauthorized",
          method: "Authenticate decorator",
        });
      }
    }
  );

  /* REGISTER ROUTES */
  app.get("/healthcheck", async () => {
    return { status: "OK" };
  });

  app.register(authRoutes, { prefix: "/api/auth" });
  app.register(userRoutes, { prefix: "/api/user" });

  return app;
}

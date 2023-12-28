import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifytJwt from "@fastify/jwt";
import { logger } from "./logger";
import { authRoutes } from "../modules/auth/auth.routes";
import { createHttpException } from "../utils/exceptions";
import { HTTP_STATUS_CODE } from "../enums/HttpStatusCodes";
import { TSignInUser } from "../modules/auth/auth.types";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest<{ Body: TSignInUser }>,
      reply: FastifyReply
    ) => Promise<void>;
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
        await request.jwtVerify();
      } catch (error) {
        return createHttpException(
          HTTP_STATUS_CODE.UNAUTHORIZED,
          "Unauthorized"
        );
      }
    }
  );

  /* REGISTER ROUTES */
  app.get("/healthcheck", async () => {
    return { status: "OK" };
  });

  app.register(authRoutes, { prefix: "/api/auth" });

  return app;
}

import fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import { logger } from "./logger";
import { authRoutes } from "../modules/auth/auth.routes";

/**
 * This function creates and configures a Fastify server instance, registering plugins, defining routes, and returning the configured server.
 */
export async function buildServer() {
  const app = fastify({
    logger,
  });

  /* REGISTER PLUGINS */
  app.register(fastifyCookie, {
    secret: "my-secret", // for cookies signature
    hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  });

  /* REGISTER ROUTES */
  app.get("/healthcheck", async () => {
    return { status: "OK" };
  });

  app.register(authRoutes, { prefix: "/api/auth" });

  return app;
}

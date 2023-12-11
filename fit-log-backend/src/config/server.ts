import fastify from "fastify";
import { logger } from "./logger";

export async function buildServer() {
  const app = fastify({
    logger,
  });

  /* REGISTER PLUGINS */

  /* REGISTER ROUTES */

  return app;
}

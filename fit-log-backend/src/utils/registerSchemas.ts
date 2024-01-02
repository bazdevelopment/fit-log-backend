import { FastifyInstance, RawServerDefault } from "fastify";
import { IncomingMessage, ServerResponse } from "http";
import { Logger } from "pino";

/**
 * Utility function used to register all json schemas linked to models
 */
export function registerSchemas(
  app: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    Logger
  >,
  schemas: object[]
) {
  schemas.forEach((schema) => app.addSchema(schema));
}

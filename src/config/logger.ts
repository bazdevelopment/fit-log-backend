import pino from "pino";
import { environmentVariables } from "./environment-variables";

export const logger = pino({
  enabled: environmentVariables.default.nodeEnvironment === "local",
  transport: {
    target: "pino-pretty",
  },
});

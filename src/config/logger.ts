import pino from "pino";

export const logger = pino({
  enabled: false,
  transport: {
    target: "pino-pretty",
  },
});

import { buildServer } from "./config/server";
import dotenv from "dotenv";
dotenv.config();

const signals = ["SIGINT", "SIGTERM"];

/**
 * The gracefulShutDownApp function is responsible for performing the necessary cleanup and shutting down the application gracefully. In this specific example, it closes the application instance asynchronously.
 */
const gracefulShutDownApp = async (
  app: Awaited<ReturnType<typeof buildServer>>
) => {
  await app.close();
};

async function main() {
  const app = await buildServer();

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.listen({
    port,
    host: process.env.HOST,
  });

  /** The following code snippet demonstrates the implementation of a graceful shutdown mechanism for a Node.js application using signals. This ensures that the application handles termination signals gracefully, allowing it to perform necessary cleanup tasks before shutting down.
   */
  for (const signal of signals) {
    process.on(signal, async () => {
      await gracefulShutDownApp(app);
    });
  }
}

main();

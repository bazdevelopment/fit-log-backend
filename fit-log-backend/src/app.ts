import { buildServer } from "./config/server";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const app = await buildServer();

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.listen({
    port,
    host: process.env.HOST,
  });
}

main();

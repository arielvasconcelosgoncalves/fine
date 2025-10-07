import Fastify from "fastify";
import routes from "./routes/index.ts";
import type { FastifyInstance } from "fastify";
import { env } from "./config/env.ts";
import cors from "@fastify/cors";

const app: FastifyInstance = Fastify({
  logger: {
    level: env.NODE_ENV === "dev" ? "info" : "error",
  },
});

app.register(cors, {
  origin: true,
  methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS", "PUT"],
});

app.register(routes, { prefix: "/api" });

export default app;

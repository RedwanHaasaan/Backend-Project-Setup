import http, { type Server } from "http";
import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import { verifyMailTransporter } from "./lib/mailTransporter.js";

const PORT = env.port;

const bootstrap = async () => {
  let server: Server;

  // Reusable shutdown function
  const shutdown = async (exitCode: number, message: string, error?: unknown) => {
    console.log(message);

    if (error) {
      console.error(error);
    }

    if (server) {
      server.close(async () => {
        console.log("Server closed gracefully.");

        await prisma.$disconnect();
        console.log("Database connection closed.");

        process.exit(exitCode);
      });
    } else {
      await prisma.$disconnect();
      console.log("Database connection closed.");

      process.exit(exitCode);
    }
  };

  // Graceful shutdown
  process.on("SIGTERM", () => {
    shutdown(0, "SIGTERM received. Shutting down...");
  });

  process.on("SIGINT", () => {
    shutdown(0, "SIGINT received. Shutting down...");
  });

  // Unhandled Promise Rejection
  process.on("unhandledRejection", (error) => {
    shutdown(1, "Unhandled Promise Rejection detected. Shutting down...", error);
  });

  // Uncaught Exception
  process.on("uncaughtException", (error) => {
    shutdown(1, "Uncaught Exception detected. Shutting down...", error);
  });

  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected successfully");
    await verifyMailTransporter();

    const httpServer = http.createServer(app);

    server = httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT} PORT`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);

    await prisma.$disconnect();
    process.exit(1);
  }
};

bootstrap();
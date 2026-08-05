import http, { type Server } from "http";
import app from "./app.js";
import { env } from "./config/env.js";

const PORT = env.port;

const bootstrap = async () => {
  let server: Server;

  // Reusable shutdown function
  const shutdown = (exitCode: number,message: string,error?: unknown) => {
    console.log(message);

    if (error) {
      console.error(error);
    }

    if (server) {
      server.close(() => {
        console.log("Server closed gracefully.");
        process.exit(exitCode);
      });
    } else {
      process.exit(exitCode);
    }
  };

  try {
    const httpServer = http.createServer(app);

    server = httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT} PORT`);
    });

    // Graceful shutdown
    process.on("SIGTERM", () => {
      shutdown(0, "SIGTERM received. Shutting down...");
    });

    process.on("SIGINT", () => {
      shutdown(0, "SIGINT received. Shutting down...");
    });

    // Unhandled Promise Rejection
    process.on("unhandledRejection", (error) => {
      shutdown(1,"Unhandled Promise Rejection detected. Shutting down...",error);
    });

    // Uncaught Exception
    process.on("uncaughtException", (error) => {
      shutdown(1,"Uncaught Exception detected. Shutting down...",error);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

bootstrap();
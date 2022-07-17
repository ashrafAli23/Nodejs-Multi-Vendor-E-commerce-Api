import http from "http";
import app from "./app";
import config from "./config/dotenv";
import dbConnect from "./config/dbConnect";

// DB Connect
dbConnect();

const start = async () => {
  const server = http
    .createServer(app)
    .listen(config.port, () => console.log(`server up on port ${config.port}`));

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: any) => {
    console.error(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    console.info("SIGTERM received");
    if (server) {
      server.close();
    }
  });
};

start();

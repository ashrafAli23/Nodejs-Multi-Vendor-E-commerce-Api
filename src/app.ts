import express, { Request, Response } from "express";
import { NotFoundError } from "./apiResponse/notFoundError";
import errorHandler from "./middleware/errorHandler";

// middlewares
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import limiter from "./middleware/rateLimte";
// import xss from "xss-clean";
import path from "path";

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(mongoSanitize());
app.use("/public", express.static(path.join(__dirname, "src", "uploads")));
app.use(limiter);

// passport middleware
// app.use(passport.initialize());
// passportMiddle(passport);

// catch all routes
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError(`Route[${req.method}::${req.url}] not found!`);
});

// Error Handler
app.use(errorHandler);

export default app;

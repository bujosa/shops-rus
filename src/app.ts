import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { createUserRouter } from "./routes/user/new";

const app = express();
app.set("trust proxy", true);
app.use(json());

//Customers
app.use(createUserRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

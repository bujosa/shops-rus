import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { createUserRouter } from "./routes/user/create-user";
import { getAllUsersRouter } from "./routes/user/users";
import {
  getOneUserRouterById,
  getOneUserRouterByName,
} from "./routes/user/get-one";

const app = express();
app.set("trust proxy", true);
app.use(json());

//Users
app.use(createUserRouter);
app.use(getAllUsersRouter);
app.use(getOneUserRouterByName);
app.use(getOneUserRouterById);

//Invoice

//Discounts

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

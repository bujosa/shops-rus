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
import { getOneItemRouterById } from "./routes/item/get-one";
import { getAllItemsRouter } from "./routes/item/items";
import { createItemRouter } from "./routes/item/create-item";

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

//Items
app.use(createItemRouter);
app.use(getAllItemsRouter);
app.use(getOneItemRouterById);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

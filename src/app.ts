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
import { createDiscountRouter } from "./routes/discounts/create-discount";
import { getAllDiscountsRouter } from "./routes/discounts/discounts";
import { getOneDiscountRouterByType } from "./routes/discounts/get-one";
import { createInvoiceRouter } from "./routes/invoice/create-invoice";
import { getAllInvoicesRouter } from "./routes/invoice/invoices";
import { getOneInvoiceRouterById } from "./routes/invoice/get-one";

const app = express();
app.set("trust proxy", true);
app.use(json());

//Users
app.use(createUserRouter);
app.use(getAllUsersRouter);
app.use(getOneUserRouterByName);
app.use(getOneUserRouterById);

//Invoice
app.use(getOneInvoiceRouterById);
app.use(getAllInvoicesRouter);
app.use(createInvoiceRouter);

//Discounts
app.use(createDiscountRouter);
app.use(getAllDiscountsRouter);
app.use(getOneDiscountRouterByType);

//Items
app.use(createItemRouter);
app.use(getAllItemsRouter);
app.use(getOneItemRouterById);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

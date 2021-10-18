import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Schema } from "mongoose";
import { createAwait, tokenToString } from "typescript";
import { NotFoundError } from "../../errors/not-found-error";
import { IItem } from "../../interfaces/item.interface";
import { validateRequest } from "../../middlewares/validate-request";
import { Invoice } from "../../models/invoice/invoice.entity";
import { Item } from "../../models/item/item.entity";
import { User } from "../../models/user/user.entity";
import { calculateTotal } from "../../utils/calculate-total";

const router = express.Router();

router.post(
  "/api/invoices",
  [
    body("client").notEmpty().isString().withMessage("client is required"),
    body("items").isArray({ min: 1 }).withMessage("items is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { client: clientId, items } = req.body;

    const invoice = await Invoice.build({
      client: clientId,
      items,
      total: await createTotal(items, clientId),
    });

    await invoice.save();

    res.status(201).send(invoice);
  }
);

export { router as createInvoiceRouter };

const createTotal = async (
  items: string[],
  clientId: string
): Promise<number> => {
  const products: IItem[] = [];

  const client = await User.findById(clientId);

  if (!client) {
    throw new NotFoundError();
  }

  let total = 0;
  let itemsProcessed = 0;

  for (const item of items) {
    const product = await Item.findOne({ id: item });

    if (product) {
      products.push({
        name: product.name,
        price: product.price,
        type: product.type,
      });

      itemsProcessed++;

      if (itemsProcessed === items.length) {
        total = calculateTotal(products, client);
      }
    } else {
      throw new NotFoundError();
    }
  }

  return total;
};

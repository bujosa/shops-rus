import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Schema } from "mongoose";
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
    body("client").not().isEmpty().isUUID().withMessage("client is required"),
    body("items")
      .not()
      .isEmpty()
      .isArray()
      .isUUID()
      .withMessage("items is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { client: clientId, items } = req.body;

    const products: IItem[] = [];

    const client = await User.findById(clientId);

    if (!client) {
      throw new NotFoundError();
    }

    items.forEach(async (item: Schema.Types.ObjectId) => {
      const product = await Item.findById(item);

      if (product) {
        products.push({
          name: product.name,
          price: product.price,
          type: product.type,
        });
      } else {
        throw new NotFoundError();
      }
    });

    const total = calculateTotal(products, client);

    const invoice = Invoice.build({
      client: clientId,
      items,
      total,
    });

    await invoice.save();

    res.status(201).send(invoice);
  }
);

export { router as createInvoiceRouter };

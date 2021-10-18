import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { Invoice } from "../../models/invoice/invoice.entity";
import { Item } from "../../models/item/item.entity";
import { User } from "../../models/user/user.entity";

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
    body("discount")
      .not()
      .isEmpty()
      .isArray()
      .isUUID()
      .withMessage("discount is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { client: clientId, items, discount } = req.body;

    const products = [];

    const client = await User.findById(clientId);

    items.forEach(async (item: string) => {
      const product = await Item.findById(item);
      products.push(product);
    });

    let total = 0;

    const invoice = Invoice.build({
      client: clientId,
      items,
      discount,
      total,
    });

    await invoice.save();

    res.status(201).send(invoice);
  }
);

export { router as createItemRouter };

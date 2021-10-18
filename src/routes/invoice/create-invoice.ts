import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ItemType } from "../../enums/item-type.enum";
import { validateRequest } from "../../middlewares/validate-request";
import { Invoice } from "../../models/invoice/invoice.entity";
import { Item } from "../../models/item/item.entity";

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
    const { client, items, discount } = req.body;

    let total = 0;

    const invoice = Invoice.build({
      client,
      items,
      discount,
      total,
    });

    await invoice.save();

    res.status(201).send(invoice);
  }
);

export { router as createItemRouter };

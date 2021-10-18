import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ItemType } from "../../enums/item-type.enum";
import { validateRequest } from "../../middlewares/validate-request";
import { Item } from "../../models/item/item.entity";

const router = express.Router();

router.post(
  "/api/items",
  [
    body("name").not().isEmpty().withMessage("name is required"),
    body("price").isNumeric().withMessage("price is required"),
    body("type")
      .isString()
      .isIn(Object.values(ItemType))
      .withMessage("type is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, price, type } = req.body;

    const item = Item.build({
      name,
      price,
      type,
    });

    await item.save();

    res.status(201).send(item);
  }
);

export { router as createItemRouter };

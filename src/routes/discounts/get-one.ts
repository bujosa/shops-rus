import express, { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { Item } from "../../models/item/item.entity";

const getOneDiscountRouterByName = express.Router();

getOneDiscountRouterByName.get(
  "/api/discounts/:name",
  async (req: Request, res: Response) => {
    const discount = await Item.findOne({ name: req.params.name });

    if (!discount) {
      throw new NotFoundError();
    }

    return res.send(discount);
  }
);

export { getOneDiscountRouterByName };

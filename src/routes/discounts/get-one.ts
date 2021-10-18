import express, { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { Item } from "../../models/item/item.entity";

const getOneDiscountRouterByType = express.Router();

getOneDiscountRouterByType.get(
  "/api/discounts/:type",
  async (req: Request, res: Response) => {
    const discount = await Item.findOne({ type: req.params.type });

    if (!discount) {
      throw new NotFoundError();
    }

    return res.send(discount);
  }
);

export { getOneDiscountRouterByType };

import express, { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { Discount } from "../../models/discount/discount.entity";

const getOneDiscountRouterByType = express.Router();

getOneDiscountRouterByType.get(
  "/api/discounts/:type",
  async (req: Request, res: Response) => {
    const discount = await Discount.findOne({ type: req.params.type });

    if (!discount) {
      throw new NotFoundError();
    }

    return res.send(discount);
  }
);

export { getOneDiscountRouterByType };

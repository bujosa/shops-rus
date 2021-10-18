import express, { Request, Response } from "express";
import { Discount } from "../../models/discount/discount.entity";

const router = express.Router();

router.get("/api/discounts", async (req: Request, res: Response) => {
  const items = await Discount.find({});
  res.send(items);
});

export { router as getAllDiscountsRouter };

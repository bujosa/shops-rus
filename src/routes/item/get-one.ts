import express, { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { Item } from "../../models/item/item.entity";

const getOneItemRouterById = express.Router();

getOneItemRouterById.get(
  "/api/items/:id",
  async (req: Request, res: Response) => {
    const item = await Item.findOne({ id: req.params.id });

    if (!item) {
      throw new NotFoundError();
    }

    return res.send(item);
  }
);

export { getOneItemRouterById };

import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { Discount } from "../../models/discount/discount.entity";

const router = express.Router();

router.post(
  "/api/discounts",
  [
    body("type").not().isEmpty().withMessage("type is required"),
    body("discount").isNumeric().withMessage("discount is required"),
    body("percentage")
      .isBoolean()
      .optional()
      .withMessage("percentage needs to be boolean"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { discount, percentage, type } = req.body;

    const entity = Discount.build({
      type,
      discount,
      percentage,
    });

    await entity.save();

    res.status(201).send(entity);
  }
);

export { router as createDiscountRouter };

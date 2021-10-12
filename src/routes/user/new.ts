import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user/user.entity";

const router = express.Router();

router.post(
  "/api/users",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = User.build({
      title,
      price,
    });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createUserRouter };

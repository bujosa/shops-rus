import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user/user.entity";

const router = express.Router();

router.post(
  "/api/users",
  [
    body("fullName").not().isEmpty().withMessage("fullName is required"),
    body("affiliate")
      .isBoolean()
      .optional()
      .withMessage("affiliate needs to be Boolean"),
    body("employee")
      .isBoolean()
      .optional()
      .withMessage("affiliate needs to be Boolean"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { fullName, employee, affiliate } = req.body;

    const user = User.build({
      fullName,
      employee,
      affiliate,
      createdAt: new Date().toISOString(),
    });

    await user.save();

    res.status(201).send(user);
  }
);

export { router as createUserRouter };

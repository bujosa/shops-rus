import express, { Request, Response } from "express";
import { User } from "../../models/user/user.entity";

const router = express.Router();

router.get("/api/users", async (req: Request, res: Response) => {
  const users = await User.find({});
  res.send(users);
});

export { router as getAllUsersRouter };

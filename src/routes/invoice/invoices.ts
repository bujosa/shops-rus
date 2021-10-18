import express, { Request, Response } from "express";
import { Invoice } from "../../models/invoice/invoice.entity";

const router = express.Router();

router.get("/api/invoices", async (req: Request, res: Response) => {
  const invoices = await Invoice.find({});
  res.send(invoices);
});

export { router as getAllInvoicesRouter };

import express, { Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
import { Invoice } from "../../models/invoice/invoice.entity";

const getOneInvoiceRouterById = express.Router();

getOneInvoiceRouterById.get(
  "/api/invoices/:id",
  async (req: Request, res: Response) => {
    const invoice = await Invoice.findOne({ id: req.params.id });

    if (!invoice) {
      throw new NotFoundError();
    }

    return res.send(invoice);
  }
);

export { getOneInvoiceRouterById };

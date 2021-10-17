import mongoose, { Schema } from "mongoose";
import { IInvoice } from "../../interfaces/invoice.interface";

export interface IInvoiceModel extends mongoose.Model<IInvoice> {
  build(invoice: IInvoice): IInvoiceDoc;
}

export interface IInvoiceDoc extends mongoose.Document {
  name: string;
  price: number;
  type: string;
}

const invoiceSchema = new mongoose.Schema(
  {
    discount: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Discount",
      autopopulate: { maxDepth: 1 },
    },
    client: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: { maxDepth: 1 },
    },
    items: {
      required: true,
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "Item",
      autopopulate: { maxDepth: 1 },
    },
    total: {
      required: true,
      type: Number,
    },
    createdAt: {
      type: String,
      default: new Date().toISOString(),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

invoiceSchema.plugin(require("mongoose-autopopulate"));

invoiceSchema.statics.build = (invoice: IInvoice) => {
  return new Invoice(invoice);
};

const Invoice = mongoose.model<IInvoiceDoc, IInvoiceModel>(
  "invoice",
  invoiceSchema
);

export { Invoice };

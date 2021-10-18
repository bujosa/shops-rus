import mongoose, { Schema } from "mongoose";
import { IInvoice } from "../../interfaces/invoice.interface";

export interface IInvoiceModel extends mongoose.Model<IInvoice> {
  build(invoice: IInvoice): IInvoiceDoc;
}

export interface IInvoiceDoc extends mongoose.Document {
  id: string;
  client: string;
  items: string[];
  total: number;
}

const invoiceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
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
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

invoiceSchema.plugin(require("mongoose-autopopulate"));

invoiceSchema.statics.build = (invoice: IInvoice) => {
  console.log(invoice.total);
  return new Invoice(invoice);
};

invoiceSchema.pre("save", function (next) {
  this.id = this._id;

  next();
});

const Invoice = mongoose.model<IInvoiceDoc, IInvoiceModel>(
  "Invoice",
  invoiceSchema
);

export { Invoice };

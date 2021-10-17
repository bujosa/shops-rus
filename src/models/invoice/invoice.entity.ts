import mongoose from "mongoose";
import { ItemType } from "../../enums/item-type.enum";
import { IItem } from "../../interfaces/item.interface";

export interface IInvoiceModel extends mongoose.Model<IInvoice> {
  build(item: IItem): IItemDoc;
}

export interface IItemDoc extends mongoose.Document {
  name: string;
  price: number;
  type: string;
}

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      required: true,
      type: String,
      enum: Object.values(ItemType),
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

itemSchema.statics.build = (item: IItem) => {
  return new Item(item);
};

const Item = mongoose.model<IItemDoc, IItemModel>("Item", itemSchema);

export { Item };

import mongoose from "mongoose";
import { ItemType } from "../../enums/item-type.enum";
import { IItem } from "../../interfaces/item.interface";

export interface IItemModel extends mongoose.Model<IItemDoc> {
  build(item: IItem): IItemDoc;
}

export interface IItemDoc extends mongoose.Document {
  id: string;
  name: string;
  price: number;
  type: string;
}

const itemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
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
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

itemSchema.statics.build = (item: IItem) => {
  return new Item(item);
};

itemSchema.pre("save", function (next) {
  this.id = this._id;

  next();
});

const Item = mongoose.model<IItemDoc, IItemModel>("Item", itemSchema);

export { Item };

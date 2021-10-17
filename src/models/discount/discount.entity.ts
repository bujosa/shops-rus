import mongoose from "mongoose";
import { IDiscount } from "../../interfaces/discount.interface";

export interface IDiscountModel extends mongoose.Model<IDiscountDoc> {
  build(discount: IDiscount): IDiscountDoc;
}

export interface IDiscountDoc extends mongoose.Document {
  type: string;
  discount: boolean;
  percentage: boolean;
}

const discountSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: false,
    },
    percentage: {
      type: Boolean,
      default: false,
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

discountSchema.statics.build = (discount: IDiscount) => {
  return new Discount(discount);
};

const Discount = mongoose.model<IDiscountDoc, IDiscountModel>(
  "Discount",
  discountSchema
);

export { Discount };

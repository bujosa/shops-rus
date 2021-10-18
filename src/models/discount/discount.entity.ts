import mongoose from "mongoose";
import { IDiscount } from "../../interfaces/discount.interface";

export interface IDiscountModel extends mongoose.Model<IDiscountDoc> {
  build(discount: IDiscount): IDiscountDoc;
}

export interface IDiscountDoc extends mongoose.Document {
  id: string;
  type: string;
  discount: boolean;
  percentage: boolean;
}

const discountSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
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
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

discountSchema.statics.build = (discount: IDiscount) => {
  return new Discount(discount);
};

discountSchema.pre("save", function (next) {
  this.id = this._id;

  next();
});

const Discount = mongoose.model<IDiscountDoc, IDiscountModel>(
  "Discount",
  discountSchema
);

export { Discount };

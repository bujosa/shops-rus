import { IDiscountType } from "./discounts-type";

export interface IDiscounts {
  name: string;
  discount: string;
  type: IDiscountType;
}

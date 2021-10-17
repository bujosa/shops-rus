import { IDiscount } from "./discount.interface";
import { IItem } from "./item.interface";
import { IUser } from "./user.interface";

export interface IInvoice {
  client: IUser;
  discount: IDiscount;
  items: IItem[];
  total: number;
}

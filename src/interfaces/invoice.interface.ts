import { IDiscounts } from "./discount.interface";
import { IItem } from "./item.interface";
import { IUser } from "./user.interface";

export interface IInvoice {
  client: IUser;
  discount: IDiscounts;
  items: IItem[];
  total: number;
}

import { IDiscounts } from "./discounts.interface";
import { IUser } from "./user.interface";

export interface IInvoices {
  client: IUser;
  discount: IDiscounts;
  items: IItems[];
  total: number;
}

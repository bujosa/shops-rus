import { IItem } from "./item.interface";
import { IUser } from "./user.interface";

export interface IInvoice {
  client: IUser;
  items: IItem[];
  total: number;
}

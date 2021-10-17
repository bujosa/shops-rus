import { TypeOfItems } from "../enums/type-of-items.enum";

export interface IItem {
  name: string;
  price: number;
  type: TypeOfItems;
}

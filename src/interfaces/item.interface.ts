import { ItemType } from "../enums/item-type.enum";

export interface IItem {
  name: string;
  price: number;
  type: ItemType;
}

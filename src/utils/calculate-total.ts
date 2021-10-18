import { IItem } from "../interfaces/item.interface";
import { IUser } from "../interfaces/user.interface";

export const calculateTotal = (products: IItem[], client: IUser): number => {
  let total = 0;

  products.forEach((product) => {
    if (productType(product)) {
      return;
    }

    if (client.affiliate && client.employee) {
      product.price = product.price * 0.7;
    } else if (client.affiliate) {
      product.price = product.price * 0.9;
    } else if (client.employee) {
      product.price = product.price * 0.7;
    }

    total += product.price;
  });

  return total - Math.floor(total / 100) * 5;
};

const productType = (product: IItem): boolean => {
  if (product.type === "food") {
    return true;
  } else {
    return false;
  }
};

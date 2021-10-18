import { IItem } from "../interfaces/item.interface";
import { IUser } from "../interfaces/user.interface";

export const calculateTotal = (products: IItem[], client: IUser): number => {
  let total = 0;

  const date = new Date(client.createdAt);
  const year = date.getFullYear();

  products.forEach((product) => {
    if (productType(product)) {
      total += product.price;
      return;
    }

    if (client.affiliate && client.employee) {
      // if the client is an affiliate and an employee of the company, the biggest discount is taken
      product.price = product.price * 0.7;
    } else if (client.affiliate) {
      // if the client is an affiliate, the price is multiplied by 0.9
      product.price = product.price * 0.9;
    } else if (client.employee) {
      // if the client is an employee, the price is multiplied by 0.7
      product.price = product.price * 0.7;
    } else if (year + 2 <= new Date().getFullYear()) {
      // If the client is older than 2 years
      product.price = product.price * 0.95;
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

import request from "supertest";
import * as faker from "faker";
import { app } from "../../../app";
import { Invoice } from "../../../models/invoice/invoice.entity";
import { User } from "../../../models/user/user.entity";
import { Item } from "../../../models/item/item.entity";
import { ItemType } from "../../../enums/item-type.enum";

const buildUser = async () => {
  const entity = await User.create({
    fullName: faker.name.findName(),
    affiliate: faker.datatype.boolean(),
    employee: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
  });

  return await entity.save();
};

const buildItem = async () => {
  const entity = await Item.create({
    name: faker.name.findName(),
    price: faker.datatype.number({ min: 100, max: 1000 }),
    type: ItemType.FOOD,
  });

  return await entity.save();
};

const buildEntity = async () => {
  const user = await buildUser();
  const item = await buildItem();

  const entity = await Invoice.create({
    client: user.id,
    items: [item.id],
    total: faker.datatype.number({ min: 100, max: 1000 }),
  });

  return await entity.save();
};

describe("GET /api/invoices", () => {
  it("Returns all invoices", async () => {
    await buildEntity();
    await buildEntity();
    await buildEntity();

    const { body: fetchedInvoices } = await request(app)
      .get(`/api/invoices`)
      .send({})
      .expect(200);

    expect(fetchedInvoices.length).toEqual(3);
  });

  it("return empty array", async () => {
    const { body: fetchedInvoices } = await request(app)
      .get(`/api/invoices`)
      .send({})
      .expect(200);

    expect(fetchedInvoices).toEqual([]);
  });
});

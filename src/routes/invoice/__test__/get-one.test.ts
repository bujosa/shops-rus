import request from "supertest";
import * as faker from "faker";
import { app } from "../../../app";
import { Item } from "../../../models/item/item.entity";
import { ItemType } from "../../../enums/item-type.enum";
import { User } from "../../../models/user/user.entity";
import { Invoice } from "../../../models/invoice/invoice.entity";

const buildUser = async () => {
  const entity = await User.build({
    fullName: faker.name.findName(),
    affiliate: faker.datatype.boolean(),
    employee: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
  });

  return await entity.save();
};

const buildItem = async () => {
  const entity = await Item.build({
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

describe("GET /api/invoices/:id", () => {
  it("fetches the invoice", async () => {
    const invoice = await buildEntity();

    const { body: fetchedInvoice } = await request(app)
      .get(`/api/invoices/${invoice.id}`)
      .send({})
      .expect(200);

    expect(fetchedInvoice.id).toEqual(invoice.id);
  });

  it("return status code 404", async () => {
    await request(app)
      .get(`/api/invoices/${faker.lorem.word()}`)
      .send({})
      .expect(404);
  });

  it("throw message Not Found Error", async () => {
    await request(app)
      .get(`/api/invoices/${faker.lorem.word()}`)
      .send({})
      .expect({ errors: [{ message: "Not Found" }] });
  });
});

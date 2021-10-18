import request from "supertest";
import * as faker from "faker";
import { app } from "../../../app";
import { ItemType } from "../../../enums/item-type.enum";
import { IInvoice } from "../../../interfaces/invoice.interface";
import { User } from "../../../models/user/user.entity";
import { Item } from "../../../models/item/item.entity";
import { calculateTotal } from "../../../utils/calculate-total";

const buildUser = async () => {
  const entity = await User.build({
    fullName: faker.name.findName(),
    affiliate: faker.datatype.boolean(),
    employee: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
  });

  return await entity.save();
};

const buildItem = async (type?: ItemType) => {
  const entity = await Item.build({
    name: faker.name.findName(),
    price: faker.datatype.number({ min: 100, max: 1000 }),
    type: type || ItemType.FOOD,
  });

  return await entity.save();
};

describe("POST /api/invoices", () => {
  it("create item", async () => {
    const item = await buildItem(ItemType.FOOD);
    const item2 = await buildItem(ItemType.OTHER);
    const item3 = await buildItem(ItemType.MEDICINE);

    const user = await buildUser();

    const invoice = {
      items: [item.id, item2.id, item3.id],
      client: user.id,
    };

    const total = calculateTotal([item, item2, item3], user);

    const { body: fetchedInvoices } = await request(app)
      .post(`/api/invoices`)
      .send(invoice)
      .expect(201);

    console.log(fetchedInvoices);

    expect(fetchedInvoices.total).toEqual(total);
  });

  it(" returns a 400 an invalid type", async () => {
    const invoice = {
      client: faker.lorem.word(),
      items: [faker.lorem.word],
    };

    await request(app).post("/api/invoices").send(invoice).expect(400);
  });
});

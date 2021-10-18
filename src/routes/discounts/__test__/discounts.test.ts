import request from "supertest";
import * as faker from "faker";
import { app } from "../../../app";
import { Item } from "../../../models/item/item.entity";
import { ItemType } from "../../../enums/item-type.enum";

const buildEntity = async () => {
  const entity = Item.build({
    name: faker.name.findName(),
    price: faker.datatype.number({ min: 100, max: 1000 }),
    type: ItemType.FOOD,
  });

  return await entity.save();
};

describe("GET /api/items", () => {
  it("Returns all items", async () => {
    await buildEntity();
    await buildEntity();
    await buildEntity();

    const { body: fetchedItems } = await request(app)
      .get(`/api/items`)
      .send({})
      .expect(200);

    expect(fetchedItems.length).toEqual(3);
  });

  it("return empty array", async () => {
    const { body: fetchedItems } = await request(app)
      .get(`/api/items`)
      .send({})
      .expect(200);

    expect(fetchedItems).toEqual([]);
  });
});

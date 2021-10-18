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

describe("GET /api/item/:id", () => {
  it("fetches the item", async () => {
    const item = await buildEntity();

    const { body: fetchedItem } = await request(app)
      .get(`/api/items/${item.id}`)
      .send({})
      .expect(200);

    expect(fetchedItem.name).toEqual(item.name);
  });

  it("return status code 404", async () => {
    const item = await buildEntity();

    const { body: fetchedItem } = await request(app)
      .get(`/api/items/${faker.lorem.word()}`)
      .send({})
      .expect(404);
  });

  it("throw message Not Found Error", async () => {
    await request(app)
      .get(`/api/items/${faker.lorem.word()}`)
      .send({})
      .expect({ errors: [{ message: "Not Found" }] });
  });
});

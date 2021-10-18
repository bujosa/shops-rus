import request from "supertest";
import * as faker from "faker";
import { app } from "../../../app";
import { IItem } from "../../../interfaces/item.interface";
import { ItemType } from "../../../enums/item-type.enum";

describe("POST /api/items", () => {
  it("create item", async () => {
    const item: IItem = {
      name: faker.name.findName(),
      price: faker.datatype.number({ min: 100, max: 1000 }),
      type: ItemType.FOOD,
    };

    const { body: fetchedItem } = await request(app)
      .post(`/api/items`)
      .send(item)
      .expect(201);

    expect(fetchedItem.name).toEqual(item.name);
  });

  it(" returns a 400 an invalid type", async () => {
    const item: IItem = {
      name: faker.name.findName(),
      price: faker.datatype.number({ min: 100, max: 1000 }),
      type: faker.lorem.word(),
    };

    await request(app).post("/api/items").send(item).expect(400);
  });
});

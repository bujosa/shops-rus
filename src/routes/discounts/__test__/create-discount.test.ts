import request from "supertest";
import * as faker from "faker";
import { app } from "../../../app";
import { IDiscount } from "../../../interfaces/discount.interface";

describe("POST /api/discounts", () => {
  it("create discount", async () => {
    const discount: IDiscount = {
      type: faker.lorem.word(),
      discount: faker.datatype.number({ min: 0.01, max: 0.99 }),
      percentage: true,
    };

    const { body: fetchedDiscount } = await request(app)
      .post(`/api/discounts`)
      .send(discount)
      .expect(201);

    expect(fetchedDiscount.type).toEqual(discount.type);
  });

  it(" returns a 400 an invalid type", async () => {
    const discount = {
      type: faker.lorem.word(),
      discount: faker.datatype.number({ min: 0.01, max: 0.99 }),
      percentage: faker.lorem.word(),
    };
    await request(app).post("/api/discounts").send(discount).expect(400);
  });
});

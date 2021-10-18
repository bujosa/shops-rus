import request from "supertest";
import * as faker from "faker";
import { app } from "../../../app";
import { Discount } from "../../../models/discount/discount.entity";

const buildEntity = async () => {
  const entity = Discount.build({
    type: faker.lorem.word(),
    discount: faker.datatype.number({ min: 0.01, max: 0.99 }),
    percentage: true,
  });

  return await entity.save();
};

describe("GET /api/discounts", () => {
  it("Returns all discounts", async () => {
    await buildEntity();
    await buildEntity();
    await buildEntity();

    const { body: fetchedDiscounts } = await request(app)
      .get(`/api/discounts`)
      .send({})
      .expect(200);

    expect(fetchedDiscounts.length).toEqual(3);
  });

  it("return empty array", async () => {
    const { body: fetchedDiscounts } = await request(app)
      .get(`/api/discounts`)
      .send({})
      .expect(200);

    expect(fetchedDiscounts).toEqual([]);
  });
});

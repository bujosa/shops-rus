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

describe("GET /api/discount/:type", () => {
  it("fetches the discount", async () => {
    const discount = await buildEntity();

    const { body: fetchedDiscount } = await request(app)
      .get(`/api/discounts/${discount.type}`)
      .send({})
      .expect(200);

    expect(fetchedDiscount.type).toEqual(discount.type);
  });

  it("return status code 404", async () => {
    await request(app)
      .get(`/api/discounts/${faker.lorem.word()}`)
      .send({})
      .expect(404);
  });

  it("throw message Not Found Error", async () => {
    await request(app)
      .get(`/api/discounts/${faker.lorem.word()}`)
      .send({})
      .expect({ errors: [{ message: "Not Found" }] });
  });
});

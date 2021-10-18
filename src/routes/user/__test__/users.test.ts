import request from "supertest";
import * as faker from "faker";
import { User } from "../../../models/user/user.entity";
import { app } from "../../../app";

const buildEntity = async () => {
  const entity = User.build({
    fullName: faker.name.findName(),
    affiliate: faker.datatype.boolean(),
    employee: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
  });

  return await entity.save();
};

describe("GET /api/users", () => {
  it("Returns all users", async () => {
    await buildEntity();
    await buildEntity();
    await buildEntity();

    const { body: fetchedUsers } = await request(app)
      .get(`/api/users`)
      .send({})
      .expect(200);

    expect(fetchedUsers.length).toEqual(3);
  });

  it("return empty array", async () => {
    const { body: fetchedUsers } = await request(app)
      .get(`/api/users`)
      .send({})
      .expect(200);

    expect(fetchedUsers).toEqual([]);
  });
});

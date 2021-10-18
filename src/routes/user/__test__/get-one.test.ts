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

describe("GET /user/:id", () => {
  it("fetches the user", async () => {
    const user = await buildEntity();

    console.log(user);

    const { body: fetchedUser } = await request(app)
      .get(`/api/user/${user.id}`)
      .send({})
      .expect(200);

    expect(fetchedUser.fullName).toEqual(user.fullName);
  });
});

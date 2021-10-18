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

describe("GET /api/user/:id", () => {
  it("fetches the user", async () => {
    const user = await buildEntity();

    console.log(user);

    const { body: fetchedUser } = await request(app)
      .get(`/api/user/${user.id}`)
      .send({})
      .expect(200);

    expect(fetchedUser.fullName).toEqual(user.fullName);
  });

  it("throw message Not Found Error", async () => {
    await request(app)
      .get(`/api/user/${faker.lorem.word()}`)
      .send({})
      .expect({ errors: [{ message: "Not Found" }] });
  });
});

describe("GET /api/user/get/:name", () => {
  it("fetches the user", async () => {
    const user = await buildEntity();

    console.log(user);

    const { body: fetchedUser } = await request(app)
      .get(`/api/user/get/${user.fullName}`)
      .send({})
      .expect(200);

    expect(fetchedUser.fullName).toEqual(user.fullName);
  });

  it("throw message Not Found Error", async () => {
    await request(app)
      .get(`/api/user/get/${faker.lorem.word()}`)
      .send({})
      .expect({ errors: [{ message: "Not Found" }] });
  });
});

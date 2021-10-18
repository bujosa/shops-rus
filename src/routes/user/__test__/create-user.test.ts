import request from "supertest";
import * as faker from "faker";
import { app } from "../../../app";

describe("POST /api/users", () => {
  it("create user", async () => {
    const user = {
      fullName: faker.name.findName(),
      affiliate: faker.datatype.boolean(),
      employee: faker.datatype.boolean(),
      createdAt: faker.date.past().toISOString(),
    };

    const { body: fetchedUser } = await request(app)
      .post(`/api/users`)
      .send(user)
      .expect(201);

    expect(fetchedUser.fullName).toEqual(user.fullName);
  });

  it(" returns a 400 an invalid affiliate", async () => {
    const user = {
      fullName: faker.name.findName(),
      affiliate: faker.datatype.boolean(),
      employee: faker.lorem.word(),
      createdAt: faker.date.past().toISOString(),
    };

    request(app).post("/api/users").send(user).expect(400);
  });
});

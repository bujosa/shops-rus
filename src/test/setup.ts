import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

beforeAll(async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

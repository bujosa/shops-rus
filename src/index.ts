import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conneting to de database");
  } catch (error) {}

  app.listen(3000, () => {
    console.log(`Listening on port 3000`);
  });
};

start();

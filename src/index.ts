import mongoose from "mongoose";
import { app } from "./app";
require("dotenv").config();

const start = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL must be defined");
  }

  if (!process.env.PORT) {
    throw new Error("PORT must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Conneting to de database");
  } catch (error) {}

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();

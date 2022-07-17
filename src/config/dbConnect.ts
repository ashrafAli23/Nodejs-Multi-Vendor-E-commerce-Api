import mongoose from "mongoose";
import config from "./dotenv";

async function dbConnect() {
  try {
    await mongoose.connect(config.dbURL).then(() => {
      console.log("db connected");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(`DB Connect Error: ${error.message}`);
      process.exit(1);
    }
  }
}

export default dbConnect;

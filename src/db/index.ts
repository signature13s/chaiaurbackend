import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
  console.log("connecting to db");

  try {
    const connectioninstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB Connected !! DB Host :${connectioninstance.connection.host}`
    );
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

export default connectDB;

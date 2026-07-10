import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
    );
    console.log("DB connection is successful!!!");
  } catch (error) {
    console.log("DB Conncetion Failed!!!", error);
    process.exit(1);
  }
};

import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {});
    console.log(`✅ DB connected successfully`);
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
  }
};

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_USER_URL = process.env.DB_USER_URL;

export default mongoose
  .connect(DB_USER_URL)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

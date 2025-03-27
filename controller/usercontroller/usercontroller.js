import mongoose from "mongoose";
import dotenv from "dotenv";
import { userModel } from "../../db/schema/userschema/userschema.js";
import jwt from "jsonwebtoken";

dotenv.config();

export const createUser = async (userdata) => {
  try {
    const user = new userModel(userdata);
    await user.save();
    return { jwttoken, ...jwtuserData };
  } catch (err) {
    return { error: err?.message };
  }
};

export const loginUser = async (userdata) => {
  try {
    if (!userdata?.email || !userdata?.password) {
      return { error: "Email or Password is required" };
    }

    const user = await userModel.findOne({ email: userdata?.email });
    if (!user) {
      return { error: "User not found with this email" };
    }

    const isValidUser = user.comparePassword(userdata?.password);
    if (!isValidUser) {
      return { error: "Incorrect Password" };
    } else {
      const jwtuserData = {
        id: user?._id,
        email: user?.email,
        fullname: user?.fullname,
      };
      const jwttoken = jwt.sign(jwtuserData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      return { jwttoken, ...jwtuserData };
    }
  } catch (err) {
    return { error: err?.message };
  }
};

import mongoose from "mongoose";
import dotenv from "dotenv";
import { userModel } from "../../db/schema/userschema/userschema.js";
import jwt from "jsonwebtoken";
import { messages } from "../../utils/messages/messages.js";

dotenv.config();

export const createUser = async (userdata) => {
  try {
    const user = new userModel(userdata);
    await user.save();
    return { message: messages.success.userCreate_msg };
  } catch (err) {
    return { error: err?.message };
  }
};

export const loginUser = async (userdata) => {
  try {
    if (!userdata?.email || !userdata?.password) {
      return { error: messages.failure.error_missingFields };
    }

    const user = await userModel.findOne({ email: userdata?.email });
    if (!user) {
      return { error: messages.failure.error_userNotFound };
    }

    const isValidUser = user.comparePassword(userdata?.password);
    if (!isValidUser) {
      return { error: messages.failure.error_incorrectPassword };
    } else {
      const jwtuserData = {
        id: user?._id,
        email: user?.email,
        fullname: user?.fullname,
      };
      const jwttoken = jwt.sign(jwtuserData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      return {
        jwttoken,
        ...jwtuserData,
        message: messages.success.userLogin_msg,
      };
    }
  } catch (err) {
    return { error: err?.message };
  }
};

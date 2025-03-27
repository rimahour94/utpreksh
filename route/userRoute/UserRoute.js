import express from "express";
import {
  createUser,
  loginUser,
} from "../../controller/usercontroller/usercontroller.js";
import { messages } from "../../utils/messages/messages.js";
const userRoute = express.Router();

userRoute.post("/createuser", async (req, res) => {
  const userRes = await createUser(req.body);
  if (userRes?.error) {
    return res.status(403).json({
      message: userRes?.error,
      status: "failure",
    });
  } else {
    return res.status(200).json({
      message: messages.success.userCreate_msg,
      status: "success",
      data: userRes,
    });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const data = await loginUser(req?.body);

    if (data?.error) {
      return res.status(403).json({
        message: data?.error,
        status: "failure",
      });
    }
    return res.status(200).json({
      status: "success",
      ...data,
    });
  } catch (error) {
    return res.status(403).json({
      message: error?.message,
      status: "failure",
    });
  }
});

export { userRoute };

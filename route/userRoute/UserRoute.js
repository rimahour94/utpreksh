import express from "express";
import {
  createUser,
  loginUser,
} from "../../controller/usercontroller/usercontroller.js";
const userRoute = express.Router();

userRoute.post("/createuser", async (req, res) => {
  const userRes = await createUser(req.body);
  if (userRes?.error) {
    return res.status(403).json({
      message: "failed",
      status: "failure",
      error: userRes?.error,
    });
  } else {
    return res.status(200).json({
      message: "user created",
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
        message: "failed",
        status: "failure",
        error: data?.error,
      });
    }
    return res.status(200).json({
      status: "success",
      ...data,
    });
  } catch (error) {
    return res.status(403).json({
      message: "failed",
      status: "failure",
      error: error?.message,
    });
  }
});

export { userRoute };

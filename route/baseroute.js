import express from "express";
import { userRoute } from "./userRoute/UserRoute.js";
const route = express();

route.use("/user", userRoute);

export { route };

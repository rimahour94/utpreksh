import express from "express";
import dotenv from "dotenv";
import dbconnect from "./db/connection.js";
import { route } from "./route/baseroute.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());

server.use(route);

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

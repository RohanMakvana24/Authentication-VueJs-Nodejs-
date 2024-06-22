import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import DBconnect from "./database/connect.js";
import AuthRoutes from "./routes/AuthRoutres.js";
import Cookie from "cookie-parser";
//dotEnv
dotenv.config();

//databse
DBconnect();
//server setup
const port = process.env.PORT;
const server = express();

//middleware
server.use(cors());
server.use(Cookie());
server.use(express.json());

//routes
server.use("/api/v1/auth", AuthRoutes);

//server listing
server.listen(port, () => {
  console.log(`Server is Started on PORT : ${port}`);
});

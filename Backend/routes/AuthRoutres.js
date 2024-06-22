import express from "express";
import {
  login,
  logout,
  ragister,
  user,
} from "../controllers/AuthController.js";
import { is_Auth } from "../middleware/auth.js";
const AuthRoutes = express.Router();

//RAGISTER
AuthRoutes.post("/ragister", ragister);
//LOGIN
AuthRoutes.post("/login", login);
//LOGOUT
AuthRoutes.get("/logout", is_Auth, logout);
//get user
AuthRoutes.get("/user", is_Auth, user);

export default AuthRoutes;

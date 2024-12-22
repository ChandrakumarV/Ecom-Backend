import express, { Router } from "express";
import { login, logout, register } from "./controller";

const loginRouter: Router = express.Router();

loginRouter.post("/login", login);
loginRouter.post("/register", register);
loginRouter.post("/logout", logout);

export default loginRouter;

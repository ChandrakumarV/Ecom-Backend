import express, { Router } from "express";
import { login } from "./controller";

const loginRouter: Router = express.Router();

loginRouter.post("/", login);

export default loginRouter;

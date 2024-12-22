import { Router } from "express";
import { getUsers } from "./controller";

var userRouter = Router();

userRouter.get("/", getUsers);

export default userRouter;

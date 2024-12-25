import express, { Router } from "express";
import { getProfile, updateProfile } from "./controller";

const profileRouter: Router = express.Router();

profileRouter.get("/", getProfile);
profileRouter.post("/", updateProfile);

export default profileRouter;

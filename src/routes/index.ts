import express, { Router } from "express";
import authRouter from "./auth";
import cartRouter from "./cart";
import productsRouter from "./products";
import userRouter from "./user";
import { tokenValidation } from "../middleware/tokenValidation";

const router: Router = express.Router();

router.use("/", authRouter);
router.use("/products", tokenValidation, productsRouter);
router.use("/cart", tokenValidation, cartRouter);
router.use("/user", userRouter);

export default router;

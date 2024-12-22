import express, { Router } from "express";
import authRouter from "./auth";
import cartRouter from "./cart";
import productsRouter from "./products";

const router: Router = express.Router();

router.use("/", authRouter);
router.use("/products", productsRouter);
router.use("/cart", cartRouter);

export default router;

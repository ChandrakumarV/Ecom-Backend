import express, { NextFunction, Request, Response, Router } from "express";
import loginRouter from "./login";
import productsRouter from "./products";
import cartRouter from "./cart";

const router: Router = express.Router();

router.use("/login", loginRouter);
router.use("/products", productsRouter);
router.use("/cart", cartRouter);

export default router;

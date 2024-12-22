import { Router } from "express";
import { addCart, getCarts, removeCart, udpateCart } from "./controller";

var cartRouter = Router();

cartRouter.get("/", getCarts);
cartRouter.post("/", addCart);
cartRouter.put("/:id", udpateCart);
cartRouter.delete("/:id", removeCart);

export default cartRouter;

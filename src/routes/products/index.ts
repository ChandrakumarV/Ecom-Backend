import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  udpateProduct,
} from "./controller";

var productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", addProduct);
productRouter.put("/:id", udpateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;

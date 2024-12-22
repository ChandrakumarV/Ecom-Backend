import { Request, Response } from "express";

export const getProducts = (req: Request, res: Response) => {
  res.render("chat", {
    pageTitle: "Chat",
    pageID: "chat",
  });
};
export const getProduct = (req: Request, res: Response) => {
  console.log(req.params.id);
  res.status(200).json({ id: 1, name: "Watch" });
};
export const addProduct = (req: Request, res: Response) => {
  res.status(200).json({ id: 3, name: "Mask" });
};
export const udpateProduct = (req: Request, res: Response) => {
  console.log(req.params.id);
  res.send("udpated Product");
};
export const deleteProduct = (req: Request, res: Response) => {
  console.log(req.params.id);
  res.send("deleted");
};

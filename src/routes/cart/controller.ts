import { Request, Response } from "express";

export const getCarts = (req: Request, res: Response) => {
  res.status(200).json({ id: 3, name: "Mask", quatity: 3 });
};

export const addCart = (req: Request, res: Response) => {
  res.status(200).json({ id: 3, name: "Mask" });
};

export const udpateCart = (req: Request, res: Response) => {
  console.log(req.params.id);
  res.send("udpated Cart");
};

export const removeCart = (req: Request, res: Response) => {
  console.log(req.params.id);
  res.send("removed");
};

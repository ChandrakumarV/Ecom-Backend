import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getCarts = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    console.log(userId);
    const carts = await prisma.cart.findMany({
      where: { userId },
      select: { id: true, createdAt: true, quantity: true, product: true },
    });

    const structuredData = carts.map((cart) => {
      const { product, ...rest } = cart;
      return { ...product, ...rest, productId: product.id };
    });

    res.status(200).json(structuredData);
  } catch (err: any) {
    res.status(500).json({
      err: err.meta.cause || err.message || "Internal server error",
    });
  }
};

export const addCart = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const productId = req.body.productId;

    if (!productId) throw new Error("productId is missing");

    const carts = await prisma.cart.create({
      data: { quantity: 1, productId, userId },
    });

    res.status(201).json(carts);
  } catch (err: any) {
    res.status(500).json({
      // err: err,
      err: err.meta.cause || err.message || "Internal server error",
    });
  }
};

export const udpateCart = (req: Request, res: Response) => {
  console.log(req.params.id);
  res.send("udpated Cart");
};

export const removeCart = (req: Request, res: Response) => {
  console.log(req.params.id);
  res.send("removed");
};

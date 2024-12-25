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
  } catch (error: any) {
    res.status(500).json({
      error: errorfind(error),
    });
  }
};

export const addCart = async (req: Request, res: Response) => {
  try {
    const userId = +req.body.user.id;
    const productId = +req.body.productId;

    const carts = await prisma.cart.create({
      data: { quantity: 1, productId, userId },
    });

    res.status(201).json({ message: "Cart Added", carts });
  } catch (error: any) {
    res.status(500).json({
      error: errorfind(error),
    });
  }
};

export const udpateCart = async (req: Request, res: Response) => {
  try {
    const cartId = +req.params.id;
    const quantity = +req.body.quantity;

    if (!quantity) {
      throw new Error("Quantity is missing");
    }
    const carts = await prisma.cart.update({
      data: { quantity },
      where: { id: cartId },
    });
    res.status(200).json({ message: "Cart Updated" });
  } catch (error: any) {
    res.status(500).json({
      error: errorfind(error),
    });
  }
};

export const removeCart = async (req: Request, res: Response) => {
  try {
    const cartId = +req.params.id;
    const carts = await prisma.cart.delete({
      where: { id: cartId },
    });
    res.status(200).json({ message: "Cart removed", carts });
  } catch (error: any) {
    res.status(500).json({
      error: errorfind(error),
    });
  }
};

const errorfind = (err: any) => {
  console.log(err);
  return err?.message || err?.meta?.cause || "Internal server error";
};

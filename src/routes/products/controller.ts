import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  try {
    const products = await prisma.product.findMany({
      include: {
        cart: {
          where: {
            userId,
          },
        },
      },
    });

    const structuredData = products.map((product) => {
      const { cart, ...rest } = product;
      return { ...rest, isAddedToCart: cart.length > 0 };
    });

    res.status(200).json(structuredData);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err?.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const product_id = +req.params.id;

    const product = await prisma.product.findUnique({
      where: { id: product_id },

      include: {
        cart: {
          where: {
            userId,
          },
        },
      },
    });

    const { cart, ...rest } = product!;
    res.status(200).json({ ...rest, isAddedToCart: cart.length > 0 });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err?.message });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { detail, name, price, rating, sales } = req.body;

    if (!(detail && name && price && rating && sales)) {
      throw new Error(
        "All fields are required (detail, name, price, rating, sales)"
      );
    }
    const products = await prisma.product.create({
      data: { detail, name, price, rating, sales },
    });
    res.status(200).json(products);
  } catch (err: any) {
    res
      .status(500)
      .json({ error: "Internal server error", message: err?.message });
  }
};

export const udpateProduct = async (req: Request, res: Response) => {
  try {
    const product_id = +req.params.id;

    const body = req.body;
    delete body.user;
    console.log(body);
    if (!body) {
      throw new Error("Body cannot be empty");
    }
    const product = await prisma.product.update({
      data: { ...body },
      where: { id: product_id },
    });
    res.status(200).json(product);
  } catch (err: any) {
    res.status(500).json({
      error: err.meta.cause || err.message || "Internal server error",
    });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product_id = +req.params.id;

    const product = await prisma.product.delete({
      where: { id: product_id },
    });

    res.status(200).json(product);
  } catch (err: any) {
    res.status(500).json({
      error: err.meta.cause || err.message || "Internal server error",
    });
  }
};

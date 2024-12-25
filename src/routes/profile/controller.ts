import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.body.user;

  try {
    // check exiting user
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        _count: { select: { cart: true } },
      },
      where: { id },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { _count, ...userData } = user;
    const structuredData = { cartCount: _count.cart, ...userData };
    res.json(structuredData);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.body.user.id;

  delete body.user;
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const user = await prisma.user.update({
      data: { ...body },
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.send({ message: "profile updated" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", message: err });
  }
};

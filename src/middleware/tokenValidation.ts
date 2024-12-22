import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  const storedToken = await prisma.token.findUnique({
    where: { token },
  });

  if (!storedToken || new Date() > storedToken.expiresAt) {
    return res.status(401).json({ error: "Token expired or invalid" });
  }

  const user = await prisma.user.findUnique({
    where: { id: storedToken.userId },
  });

  req.body.user = user;
  next();
}

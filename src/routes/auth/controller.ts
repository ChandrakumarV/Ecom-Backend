import { NextFunction, Request, Response } from "express";
import { decodeToken, generateToken } from "../../utils/token";
import { PrismaClient } from "@prisma/client";
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log("req.body");
  console.log(req.body);

  if (!(email && password)) {
    res.status(400).json({ error: "Email or Password missing" });
    return;
  }

  try {
    // check exiting user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    //valid password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken({ userId: user.id, email });

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // Set expiration to 1 hour
    await prisma.token.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;

  if (!(first_name && last_name && email && password)) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await prisma.user.create({
      data: { first_name, last_name, email, password: hashedPassword },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    console.log("asdjfaksdjf");
    const { id, token } = req.body.user;
    // Delete the token
    await prisma.token.deleteMany({
      where: {
        userId: id,
        token,
      },
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

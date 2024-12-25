import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

const prisma = new PrismaClient()

export async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ error: "Token doesn't exist" })
    return
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]

  const storedToken = await prisma.token.findUnique({
    where: { token }
  })

  if (!storedToken || new Date() > storedToken?.expiresAt) {
    res.status(401).json({ error: 'Token expired or invalid' })
    return
  }

  const user = await prisma.user.findUnique({
    where: { id: storedToken.userId }
  })

  req.body.user = { ...user, token }
  next()
}

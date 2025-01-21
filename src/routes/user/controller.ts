import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getUsers = async (req: Request, res: Response) => {
  console.log('chandru')
  const users = await prisma.user.findMany({
    select: { id: true, firstName: true, lastName: true, email: true }
  })
  res.status(200).send(users)
}

import jwt, { JwtPayload } from 'jsonwebtoken'

interface Payload {
  userId: number
  email: string
}
type DecodedToken = JwtPayload & Payload

export function generateToken({ userId, email }: Payload): string {
  const token = jwt.sign({ userId, email }, process.env.SECRET_KEY as string, {
    expiresIn: '1h'
  })

  return token
}

export function decodeToken(token: string): DecodedToken {
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as DecodedToken
    return decoded
  } catch {
    throw new Error('Invalid or expired token')
  }
}

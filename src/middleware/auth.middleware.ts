import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../controllers/utils/auth.utils'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    const user = verifyToken(token) as { username: string, role: string }
    
    (req as any).user = user
    next()
  } else {
    res.status(401).send('NOT AUTHENTICATED')
  }
}
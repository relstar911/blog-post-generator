import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

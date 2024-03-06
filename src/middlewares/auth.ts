import { NextFunction, Request, Response } from 'express';
import { UserInstance } from '../models/User';
import { jwtService } from '../services/jwtServices';
import { userService } from '../services/userService';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: `Não autorizado: nenhum token encontrado` });
  }

  const token = authorizationHeader.replace(/Bearer /, '');

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      return res
        .status(401)
        .json({ message: `Não autorizado: token inválido` });
    }

    const user = await userService.findByEmail((decoded as JwtPayload).email);
    req.user = user;
    next();
  });
}

import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type IPayload = {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).end();

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, '0006f285cb0c01433032484f2b3281e5') as IPayload;

    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
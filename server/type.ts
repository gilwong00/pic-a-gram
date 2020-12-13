import { Request, Response } from 'express';

export type Context = {
  req: Request & { session: Express.Session; userId?: number };
  res: Response;
};

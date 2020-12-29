import { MiddlewareFn } from 'type-graphql';
import { Context } from '../type';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.req.session.userId) throw new Error('Not Authenticated');

  return next();
};

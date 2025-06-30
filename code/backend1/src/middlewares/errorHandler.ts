import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';

/**
 * Middleware to handle errors
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  logger.error(`${req.method} ${req.originalUrl} - ${req.ip} - ${err.message}`,)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack

  });
};

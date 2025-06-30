import { logger } from "../logger";
export const requestLogger = (req: any, res: any, next: any) => {
    logger.info(`${req.method} ${req.originalUrl} - ${req.ip}`);
    next();
};
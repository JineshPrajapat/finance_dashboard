import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ debug: false });

@Injectable()
export class AppTokenMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    const excludedPaths = [{ path: '/api/v1/', method: 'POST' }];
    const isExcluded = excludedPaths.some(
      (route) => route.path === req.path && route.method === req.method,
    );
    if (isExcluded) {
      return next();
    }

    Logger.log('Middleware(app-token): Checking app-token...');
    const appToken = req.headers['app-token'];
    const appTokenSecret = process.env.APP_TOKEN_SECRET!;
    if (!appToken) {
      Logger.log('Middleware(app-token): App token is missing!');
      return res.status(401).json({
        code: 401,
        status: 'error',
        message: 'App token is missing!',
      });
    }

    try {
      if (appToken !== appTokenSecret) {
        Logger.log('Middleware(app-token): Unauthorized, Invalid App token!');
        return res.status(401).json({
          code: 401,
          status: 'error',
          message: `Unauthorized, Invalid App token!`,
        });
      }

      Logger.log('Middleware(app-token): Verified App token!');
      next();
    } catch (error) {
      Logger.log('Middleware(app-token): Unauthorized, Invalid App token!');
      return res.status(401).json({
        code: 401,
        status: 'error',
        message: `Unauthorized, Invalid App token!`,
      });
    }
  }
}

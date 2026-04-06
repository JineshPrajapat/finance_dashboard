import {
  Injectable,
  Logger,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config({ debug: false });

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const excludedPaths = [
      { path: '/api/v1/user/auth/login', method: 'POST' },
      { path: '/api/v1/user/auth/refresh-token', method: 'POST' },
    ];
    const isExcluded = excludedPaths.some((route) => {
      if (route.method !== req.method) return false;

      if (route.path === req.path) return true;

      if (route.path.includes(':')) {
        const basePath = route.path.split('/:')[0];
        return req.path.startsWith(basePath);
      }

      return false;
    });
    if (isExcluded) {
      return next();
    }

    Logger.log('Middleware(access-token): Checking access-token...');
    const accessToken = req.headers['authorization'];
    const authJWTAccessTokenSecret = process.env.AUTH_JWT_ACCESS_TOKEN_SECRET;
    if (!accessToken) {
      Logger.log('Middleware(access-token): Access token is missing!');
      return res.status(401).json({
        code: 401,
        status: 'error',
        message: 'Access token is missing!',
      });
    }
    const token = accessToken.toString().split(' ')[1];
    if (!token) {
      Logger.log('Middleware(access-token): Access token is missing!');
      return res.status(401).json({
        code: 401,
        status: 'error',
        message: 'Access token is missing!',
      });
    }

    try {
      const verified = this.jwtService.verify(token, {
        secret: authJWTAccessTokenSecret,
      });

      if (!verified) {
        Logger.log(
          'Middleware(access-token): Unauthorized, Invalid Access token!',
        );
        throw new HttpException(
          `Unauthorized, Invalid Access token!`,
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = { id: verified.u_id, role: verified.role };
      req['user'] = user;

      Logger.log('Middleware(access-token): Verified Access token!');
      next();
    } catch (error) {
      Logger.log(
        'Middleware(access-token): Unauthorized, Invalid Access token!',
      );
      throw new HttpException(
        `Unauthorized, Invalid Access token!`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

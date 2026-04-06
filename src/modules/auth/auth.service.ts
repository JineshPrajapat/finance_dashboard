import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private verify(token: string, secret: string): any {
    try {
      return this.jwtService.verify(token, { secret });
    } catch (error) {
      return null;
    }
  }

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.accessTokenSecret,
      expiresIn: jwtConstants.accessTokenExpiresIn,
    });
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.refreshTokenSecret,
      expiresIn: jwtConstants.refreshTokenExpiresIn,
    });
  }

  generateUserToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: jwtConstants.userTokenSecret,
      expiresIn: jwtConstants.refreshTokenExpiresIn,
    });
  }

  verifyRefreshToken(token: string) {
    return this.verify(token, jwtConstants.refreshTokenSecret);
  }

  verifyUserToken(token: string) {
    return this.verify(token, jwtConstants.userTokenSecret);
  }
}

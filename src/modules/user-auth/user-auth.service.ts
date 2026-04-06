import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { UserSessionsService } from './user_sessions/user-sessions.service';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
    private readonly userSessionsService: UserSessionsService,
  ) {}

  private readonly saltRounds: number = 10;

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) {
      return {
        code: 404,
        status: 'error',
        message: 'User not found!',
      };
    }
    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if (user && isPasswordMatch) {
      return {
        code: 200,
        status: 'success',
        message: 'User valiated success',
        data: user,
      };
    }
    return {
      code: 401,
      status: 'error',
      message: 'Invalid credentials',
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (user.code !== 200 || !user.data) {
      return user;
    }

    const payload = {
      u_id: user.data.u_id,
      role: user.data.role.type,
    };

    console.log('payload', payload);

    const access_token = this.authService.generateAccessToken(payload);
    const refresh_token = this.authService.generateRefreshToken(payload);

    await this.userSessionsService.createSession(
      user.data.u_id,
      refresh_token,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return {
      code: 200,
      status: 'success',
      data: {
        access_token,
        refresh_token,
      },
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = this.authService.verifyRefreshToken(refreshToken);
      if (!decoded) {
        return {
          code: 401,
          status: 'error',
          message: 'Invalid refresh token',
        };
      }

      const userSession =
        await this.userSessionsService.validateSession(refreshToken);
      if (!userSession) {
        return {
          code: 401,
          status: 'error',
          message: 'Session not found or expired',
        };
      }

      // 3. Fetch user
      const user = await this.userRepository.findOne({
        where: { u_id: userSession.u_id, is_deleted: false },
        relations: ['role'],
      });

      if (!user) {
        return {
          code: 404,
          status: 'error',
          message: 'User not found',
        };
      }

      const payload = {
        u_id: user.u_id,
        role: user.role.type,
      };

      const newAccessToken = this.authService.generateAccessToken(payload);

      // 6. Return response
      return {
        code: 200,
        status: 'success',
        message: 'Token refreshed successfully',
        data: {
          access_token: newAccessToken,
        },
      };
    } catch (error) {
      return {
        code: 401,
        status: 'error',
        message: 'Invalid or expired refresh token',
      };
    }
  }

  async logout(refreshToken: string) {
    try {
      const session =
        await this.userSessionsService.validateSession(refreshToken);

      await this.userSessionsService.revokeSession(session.us_id);

      return {
        code: 200,
        status: 'success',
        message: 'Logged out successfully',
      };
    } catch (error) {
      return error;
    }
  }
}

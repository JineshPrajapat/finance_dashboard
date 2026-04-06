import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserSession } from './entities/user-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserSessionsService {
  constructor(
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {}

  async createSession(u_id: number, refresh_token: string, expires_at: Date) {
    let session = await this.userSessionRepository.findOne({
      where: { u_id },
    });

    if (session) {
      session.refresh_token = refresh_token;
      session.expires_at = expires_at;
    } else {
      session = this.userSessionRepository.create({
        u_id,
        refresh_token,
        expires_at,
      });
    }

    return this.userSessionRepository.save(session);
  }

  async findByToken(refresh_token: string): Promise<UserSession> {
    const session = await this.userSessionRepository.findOne({
      where: { refresh_token },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async validateSession(refresh_token: string): Promise<UserSession> {
    const session = await this.findByToken(refresh_token);

    // 🔥 auto delete expired session
    if (new Date() > session.expires_at) {
      await this.userSessionRepository.delete({ us_id: session.us_id });
      throw new UnauthorizedException('Session expired');
    }

    return session;
  }

  async revokeSession(us_id: number) {
    const session = await this.userSessionRepository.findOne({
      where: { us_id },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    await session.remove();
    return { message: 'Session revoked successfully' };
  }

  async revokeAllUserSessions(u_id: number): Promise<void> {
    await this.userSessionRepository.delete({ u_id });
  }
}

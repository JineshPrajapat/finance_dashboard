import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './use-auth.controller';
import { User } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserSessionsModule } from './user_sessions/user-sessions.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, UserSessionsModule],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}

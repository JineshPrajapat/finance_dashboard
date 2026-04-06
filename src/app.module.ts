import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppTokenMiddleware } from './middlewares/app_token.middleware';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './modules/roles/roles.module';
import { RoleHasPermissionsModule } from './modules/role-has-permissions/role-has-permissions.module';
import { UserModule } from './modules/users/users.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UserSessionsModule } from './modules/user-auth/user_sessions/user-sessions.module';
import { UserAuthModule } from './modules/user-auth/user-auth.module';
import { AuthModule } from './modules/auth/auth.module';
import { AccessTokenMiddleware } from './middlewares/access-token.middleware';
import { FinancialRecordsModule } from './modules/financial-records/financial-records.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RolesModule,
    RoleHasPermissionsModule,
    UserModule,
    AuthModule,
    UserAuthModule,
    PermissionsModule,
    UserSessionsModule,
    FinancialRecordsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

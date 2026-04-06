import * as dotenv from 'dotenv';
import type { StringValue } from 'ms';
dotenv.config();

export const jwtConstants = {
  accessTokenSecret: process.env.AUTH_JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env
    .AUTH_JWT_ACCESS_TOKEN_EXPIRES_IN! as StringValue,
  refreshTokenSecret: process.env.AUTH_JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env
    .AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN! as StringValue,
  userTokenSecret: process.env.AUTH_JWT_USER_TOKEN_SECRET,
};

export const dbConstants = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

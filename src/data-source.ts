import { DataSource } from 'typeorm';
import { dbConstants } from './constants';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: dbConstants.host,
  port: dbConstants.port,
  username: dbConstants.username,
  password: dbConstants.password,
  database: dbConstants.database,
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
});

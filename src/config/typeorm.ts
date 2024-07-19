import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'mysql',
  host: 'mysql-db',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: 'pvp',
  password: 'password',
  database: 'pvp',
  synchronize: true,
  entities: ['src/typeorm/entities/**/*.entity{.ts,.js}'],
  //migrations: ['src/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);

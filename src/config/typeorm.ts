import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

const config = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'mgxTWv1D',
  database: 'pvp',
  synchronize: true,
  entities: ["src/typeorm/entities/**/*.entity{.ts,.js}"],
  migrations: ["src/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);
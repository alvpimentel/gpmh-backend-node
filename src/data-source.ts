import { DataSource } from 'typeorm';
import { Pesquisa } from './pesquisas/pesquisa.entity';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

export const typeOrmConfig : any = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Pesquisa],
  synchronize: false,
  logging: true,
  migrations: [resolve(__dirname, 'database/migrations/*.ts')],
  migrationsTableName: "migrations",
  cli: {
    migrationsDir: "src/database/migrations"
  }
};

export const AppDataSource = new DataSource(typeOrmConfig);
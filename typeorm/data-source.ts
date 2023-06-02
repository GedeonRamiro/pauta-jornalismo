import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: process.env.ENV,
});

const dataSouce = new DataSource({
  type: 'sqlite',
  database: process.env.DB_DATABASE,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});

export default dataSouce;

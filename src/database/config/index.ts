import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.test.env' : '.env'
});

export const config = {
  development: {
    client: 'pg', 
    connection: {
      // used for testswhen using sqlite
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: 5432 || process.env.DB_PORT,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: 'src/database/migrations',
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './__tests__/database.sqlite',
    },
    migrations: {
      directory: 'src/database/migrations',
    },
    useNullAsDefault: true,
  }
};

const chosen = process.env.NODE_ENV === 'test' ? config.test : config.development;

export default knex(chosen);

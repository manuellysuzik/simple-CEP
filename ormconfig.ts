require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

export default {
  type: process.env.DB_DIALECT,
  host: 'localhost',
  port: 3306,
  username: 'postgres',
  password: 'acesso@415263',
  database: process.env.DB_NAME,
  entities: [
    './src/app/models/*.ts',
  ],
  migrations: [
    './src/database/migrations/*.ts',
  ],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

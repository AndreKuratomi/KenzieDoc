const devEnv = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  database: 'testes_capstone',
  username: 'keila',
  password: '1234',
  entities: ['./src/entities/**/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations'
  },
  logging: true,
  synchronize: false,
};

module.exports = devEnv;
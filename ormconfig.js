const devEnv = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: "5432",
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/migrations",
  },
  logging: true,
  synchronize: false,
};

module.exports = devEnv;

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/entities/**/*.js"]
      : ["src/entities/**/*.ts"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/database/migrations/**/*.js"]
      : ["src/database/migrations/**/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  synchronize: true,
  logging: false,
};

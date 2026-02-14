// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  migrations: { schema: "public", table: "__drizzle_migrations" },
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});

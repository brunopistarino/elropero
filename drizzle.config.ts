import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    // connectionString: process.env.POSTGRES_HOST + "?sslmode=require",
    host: process.env.POSTGRES_HOST || "",
    user: process.env.POSTGRES_USER || "",
    password: process.env.POSTGRES_PASSWORD || "",
    database: process.env.POSTGRES_DATABASE || "",
    ssl: true,
  },
  tablesFilter: ["elropero_*"], // Prefix to have multiple projects in the same database
} satisfies Config;

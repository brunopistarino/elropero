// // import "dotenv/config";
// // import { migrate } from "drizzle-orm/pg-core/migrate";
// // import { db, connection } from "./db";

// import { drizzle } from "drizzle-orm/node-postgres";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
// import { Pool } from "pg";

// const pool = new Pool({
//   //   connectionString: process.env.POSTGRES_URL,
//   //   connectionString:
//   // "postgres://default:7i3gwxOXaZRL@ep-misty-rain-93052885-pooler.us-east-1.postgres.vercel-storage.com/verceldb?sslmode=require",
//   //   ssl: {
//   // rejectUnauthorized: false,
//   //   },
//   host: process.env.POSTGRES_HOST || "",
//   user: process.env.POSTGRES_USER || "",
//   password: process.env.POSTGRES_PASSWORD || "",
//   database: process.env.POSTGRES_DATABASE || "",
//   //   ssl: true,
// });

// // // This will run migrations on the database, skipping the ones already applied
// // await migrate(db, { migrationsFolder: "./drizzle" });

// // // Don't forget to close the connection, otherwise the script will hang
// // await connection.end();

// const db = drizzle(pool);

// async function main() {
//   console.log("migrating...");
//   await migrate(db, { migrationsFolder: "./drizzle" });
//   //   await pool.end();
//   console.log("migrated");
//   process.exit(0);
// }

// main().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });

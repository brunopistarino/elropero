DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "categories_unique_idx" ON "elropero_Categories" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "suppliers_unique_idx" ON "elropero_Suppliers" ("name");
CREATE TABLE IF NOT EXISTS "project1_Categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project1_Products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"supplierId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project1_Suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"dni" text,
	"address" text,
	"phone" text,
	"email" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "project1_Categories" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "project1_Suppliers" ("name");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project1_Products" ADD CONSTRAINT "project1_Products_categoryId_project1_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "project1_Categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project1_Products" ADD CONSTRAINT "project1_Products_supplierId_project1_Suppliers_id_fk" FOREIGN KEY ("supplierId") REFERENCES "project1_Suppliers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

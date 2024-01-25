ALTER TABLE "elropero_Products" ADD COLUMN "profitPercentage" integer DEFAULT 50 NOT NULL;--> statement-breakpoint
ALTER TABLE "elropero_Products" ADD COLUMN "profit" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "elropero_Products" ADD COLUMN "cost" integer DEFAULT 0 NOT NULL;
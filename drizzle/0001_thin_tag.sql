ALTER TABLE "project1_Categories" RENAME TO "elropero_Categories";--> statement-breakpoint
ALTER TABLE "project1_Products" RENAME TO "elropero_Products";--> statement-breakpoint
ALTER TABLE "project1_Suppliers" RENAME TO "elropero_Suppliers";--> statement-breakpoint
ALTER TABLE "elropero_Products" DROP CONSTRAINT "project1_Products_categoryId_project1_Categories_id_fk";
--> statement-breakpoint
ALTER TABLE "elropero_Products" DROP CONSTRAINT "project1_Products_supplierId_project1_Suppliers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "elropero_Products" ADD CONSTRAINT "elropero_Products_categoryId_elropero_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "elropero_Categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "elropero_Products" ADD CONSTRAINT "elropero_Products_supplierId_elropero_Suppliers_id_fk" FOREIGN KEY ("supplierId") REFERENCES "elropero_Suppliers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

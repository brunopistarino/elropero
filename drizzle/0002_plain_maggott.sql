ALTER TABLE "elropero_Products" RENAME TO "elropero_Productsxxxxxx";--> statement-breakpoint
ALTER TABLE "elropero_Productsxxxxxx" DROP CONSTRAINT "elropero_Products_categoryId_elropero_Categories_id_fk";
--> statement-breakpoint
ALTER TABLE "elropero_Productsxxxxxx" DROP CONSTRAINT "elropero_Products_supplierId_elropero_Suppliers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "elropero_Productsxxxxxx" ADD CONSTRAINT "elropero_Productsxxxxxx_categoryId_elropero_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "elropero_Categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "elropero_Productsxxxxxx" ADD CONSTRAINT "elropero_Productsxxxxxx_supplierId_elropero_Suppliers_id_fk" FOREIGN KEY ("supplierId") REFERENCES "elropero_Suppliers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
